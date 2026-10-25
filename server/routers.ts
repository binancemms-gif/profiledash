import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createAgentTask, listAgentTasks, updateAgentTask } from "./db";
import { authorizeYouTube, getYouTubeSnapshot, replyToYouTubeComment } from "./youtube";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  agent: router({
    tasks: publicProcedure.query(() => listAgentTasks()),
    createTask: publicProcedure.input(z.object({ title: z.string().min(1).max(200), description: z.string().max(1000).optional(), owner: z.string().max(80).optional(), priority: z.enum(["Low", "Medium", "High"]).optional(), area: z.string().max(64).optional(), approvalRequired: z.boolean().optional() })).mutation(({ input }) => createAgentTask({ ...input, approvalRequired: input.approvalRequired ? 1 : 0 })),
    updateTask: publicProcedure.input(z.object({ id: z.number().int().positive(), status: z.string().max(32), retryCount: z.number().int().min(0).optional() })).mutation(({ input }) => updateAgentTask(input.id, input.status, input.retryCount)),
  }),
  youtube: router({
    authorize: publicProcedure.mutation(({ ctx }) => authorizeYouTube(ctx)),
    snapshot: publicProcedure.query(({ ctx }) => getYouTubeSnapshot(ctx)),
    reply: publicProcedure.input(z.object({ commentId: z.string().min(1), text: z.string().min(1).max(10000) })).mutation(({ ctx, input }) => replyToYouTubeComment(ctx, input.commentId, input.text)),
  }),
});

export type AppRouter = typeof appRouter;
