import { getToken, startAuthorization } from "@vercel/connect";
import type { TrpcContext } from "./_core/context";

const CONNECTOR_UID = "google/profiledash-youtube";
const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/youtube.force-ssl"];

function requireUser(ctx: TrpcContext) {
  if (!ctx.user) throw new Error("You must be signed in to connect a YouTube account.");
  return ctx.user.openId;
}

async function tokenFor(ctx: TrpcContext) {
  const userId = requireUser(ctx);
  return getToken(CONNECTOR_UID, { subject: { type: "user", id: userId }, scopes: SCOPES });
}

async function youtubeRequest<T>(ctx: TrpcContext, path: string, params: Record<string, string>) {
  const token = await tokenFor(ctx);
  const url = new URL(`${YOUTUBE_API}/${path}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`YouTube API request failed (${response.status}): ${body.slice(0, 240)}`);
  }
  return response.json() as Promise<T>;
}

export async function authorizeYouTube(ctx: TrpcContext) {
  const userId = requireUser(ctx);
  const runtimeUrl = process.env.V0_RUNTIME_URL;
  const origin = runtimeUrl ? (runtimeUrl.startsWith("http") ? runtimeUrl : `https://${runtimeUrl}`) : `${ctx.req.protocol}://${ctx.req.get("host")}`;
  const authorization = await startAuthorization(CONNECTOR_UID, { subject: { type: "user", id: userId }, scopes: SCOPES }, { callbackUrl: `${origin}/api/youtube/callback` });
  return { url: authorization.url };
}

type ChannelResponse = { items?: Array<{ id: string; snippet: { title: string; description: string; thumbnails?: { default?: { url: string } } }; statistics: { viewCount: string; subscriberCount: string; videoCount: string }; contentDetails: { relatedPlaylists: { uploads: string } } }> };
type PlaylistResponse = { items?: Array<{ contentDetails: { videoId: string }; snippet: { title: string; description: string; publishedAt: string; thumbnails?: { medium?: { url: string } } } }> };
type CommentResponse = { items?: Array<{ id: string; snippet: { topLevelComment: { id: string; snippet: { authorDisplayName: string; authorProfileImageUrl?: string; textDisplay: string; publishedAt: string; likeCount: number } }; totalReplyCount: number } }> };

export async function getYouTubeSnapshot(ctx: TrpcContext) {
  const channel = await youtubeRequest<ChannelResponse>(ctx, "channels", { part: "snippet,statistics,contentDetails", mine: "true" });
  const current = channel.items?.[0];
  if (!current) throw new Error("No YouTube channel was found for this Google account.");
  const uploads = await youtubeRequest<PlaylistResponse>(ctx, "playlistItems", { part: "snippet,contentDetails", playlistId: current.contentDetails.relatedPlaylists.uploads, maxResults: "10" });
  const videoIds = (uploads.items ?? []).map((item) => item.contentDetails.videoId);
  const comments = await Promise.all(videoIds.slice(0, 5).map((videoId) => youtubeRequest<CommentResponse>(ctx, "commentThreads", { part: "snippet", videoId, maxResults: "10", order: "time", textFormat: "plainText" }).catch(() => ({ items: [] }))));
  return {
    channel: { id: current.id, title: current.snippet.title, description: current.snippet.description, thumbnail: current.snippet.thumbnails?.default?.url ?? null, views: Number(current.statistics.viewCount ?? 0), subscribers: Number(current.statistics.subscriberCount ?? 0), videos: Number(current.statistics.videoCount ?? 0) },
    videos: (uploads.items ?? []).map((item) => ({ id: item.contentDetails.videoId, title: item.snippet.title, description: item.snippet.description, publishedAt: item.snippet.publishedAt, thumbnail: item.snippet.thumbnails?.medium?.url ?? null })),
    comments: comments.flatMap((result) => (result.items ?? []).map((item) => ({ id: item.snippet.topLevelComment.id, author: item.snippet.topLevelComment.snippet.authorDisplayName, avatar: item.snippet.topLevelComment.snippet.authorProfileImageUrl ?? null, text: item.snippet.topLevelComment.snippet.textDisplay, publishedAt: item.snippet.topLevelComment.snippet.publishedAt, likes: item.snippet.topLevelComment.snippet.likeCount, replies: item.snippet.totalReplyCount }))),
    fetchedAt: new Date().toISOString(),
  };
}

export async function replyToYouTubeComment(ctx: TrpcContext, commentId: string, text: string) {
  if (text.trim().length < 1 || text.length > 10000) throw new Error("Reply must contain between 1 and 10,000 characters.");
  const token = await tokenFor(ctx);
  const response = await fetch(`${YOUTUBE_API}/comments?part=snippet`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ snippet: { parentId: commentId, textOriginal: text.trim() } }) });
  if (!response.ok) throw new Error(`YouTube reply failed (${response.status}).`);
  return { success: true };
}
