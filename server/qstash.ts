import { Client, Receiver } from "@upstash/qstash";
import { start } from "workflow/api";
import { agentTaskWorkflow } from "./agent-workflow";
import { createAgentTask, updateAgentTaskWorkflow } from "./db";

function getQStash() {
  const token = process.env.QSTASH_TOKEN;
  return token ? new Client({ token }) : null;
}

function getReceiver() {
  const currentSigningKey = process.env.QSTASH_CURRENT_SIGNING_KEY;
  const nextSigningKey = process.env.QSTASH_NEXT_SIGNING_KEY;
  return currentSigningKey && nextSigningKey ? new Receiver({ currentSigningKey, nextSigningKey }) : null;
}

function appOrigin(req: any) {
  return process.env.V0_RUNTIME_URL ?? `${req.protocol}://${req.get("host")}`;
}

export async function startQueuedAgentTask(req: any, instruction: string) {
  const task = await createAgentTask({ title: instruction.slice(0, 200), description: instruction, owner: "YouTube Agent", status: "Queued", priority: "Medium", area: "YouTube", approvalRequired: 1 });
  const qstash = getQStash();
  if (qstash) {
    const result = await qstash.publishJSON({ url: `${appOrigin(req)}/api/agent/tasks/${task.id}/run`, body: { taskId: task.id, instruction }, retries: 3 });
    await updateAgentTaskWorkflow(task.id, { workflowRunId: result.messageId });
    return { task, messageId: result.messageId };
  }
  const run = await start(agentTaskWorkflow, [task.id, instruction]);
  await updateAgentTaskWorkflow(task.id, { workflowRunId: run.runId });
  return { task, messageId: run.runId };
}

export async function runQueuedAgentTask(req: any, body: { taskId: number; instruction: string }) {
  const receiver = getReceiver();
  if (receiver) {
    const signature = req.get("Upstash-Signature") ?? "";
    const valid = await receiver.verify({ signature, body: JSON.stringify(body) });
    if (!valid) throw new Error("Invalid QStash signature");
  }
  return start(agentTaskWorkflow, [body.taskId, body.instruction]);
}
