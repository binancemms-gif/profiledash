const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "qwen/qwen3.8-27b";

export type AgentChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function runGroqAgent(messages: AgentChatMessage[]) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not configured");

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.35,
      max_tokens: 900,
      messages: [
        { role: "system", content: "You are Summer, a YouTube channel operations agent. Be concise and practical. Research, analyze, plan, and draft, but never claim to have published, replied, or changed a channel unless an approved tool action actually completed. Explain the next approval-gated step when an action is requested." },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Groq request failed (${response.status}): ${detail.slice(0, 240)}`);
  }

  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Groq returned an empty response");
  return { content, model: MODEL };
}
