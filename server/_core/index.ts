import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { runQueuedAgentTask, startQueuedAgentTask } from "../qstash";
import { runGroqAgent, type AgentChatMessage } from "../groq";

export function createApp() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.post("/api/agent/tasks/start", async (req, res) => {
    try {
      const instruction = typeof req.body?.instruction === "string" ? req.body.instruction : "";
      if (!instruction.trim()) return res.status(400).json({ error: "instruction is required" });
      res.status(202).json(await startQueuedAgentTask(req, instruction));
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unable to start task" });
    }
  });
  app.post("/api/agent/tasks/:taskId/run", async (req, res) => {
    try {
      const taskId = Number(req.params.taskId);
      const run = await runQueuedAgentTask(req, { taskId, instruction: req.body?.instruction ?? "" });
      res.status(202).json({ runId: run.runId });
    } catch (error) {
      res.status(401).json({ error: error instanceof Error ? error.message : "Unable to run task" });
    }
  });
  app.post("/api/agent/chat", async (req, res) => {
    try {
      const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
      const validMessages = messages.filter((message: AgentChatMessage) => ["user", "assistant"].includes(message?.role) && typeof message?.content === "string").slice(-16);
      if (!validMessages.length) return res.status(400).json({ error: "messages are required" });
      const result = await runGroqAgent(validMessages);
      res.json(result);
    } catch (error) {
      res.status(502).json({ error: error instanceof Error ? error.message : "Agent unavailable" });
    }
  });
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  return app;
}

async function startServer() {
  const app = createApp();
  const server = createServer(app);

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", (error) => {
    console.error("Server failed:", error.message);
    process.exit(1);
  });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

if (process.env.NODE_ENV !== "test") {
  startServer().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
