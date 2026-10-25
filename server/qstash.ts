import { Client, Receiver } from "@upstash/qstash";
import { start } from "workflow/api";
import { agentTaskWorkflow } from "./agent-workflow";
import { createAgentTask, updateAgentTaskWorkflow } from "./db";

const qstash = new Client({ token: process.env.QSTASH_TOKEN ?? "" });
const receiver = new Receiver({ currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY ?? "", nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY ?? "" });

function appOrigin(req: any) {
  return process.env.V0_RUNTIME_URL ?? `${req.protocol}://${req.get("host")}`;
}

export async function startQueuedAgentTask(req: any, instruction: string) {
  const task = await createAgentTask({ title: instruction.slice(0, 200), description: instruction, owner: "YouTube Agent", status: "Queued", priority: "Medium", area: "YouTube", approvalRequired: 1 });
  if (process.env.QSTASH_TOKEN) {
    const result = await qstash.publishJSON({ url: `${appOrigin(req)}/api/agent/tasks/${task.id}/run`, body: { taskId: task.id, instruction }, retries: 3 });
    await updateAgentTaskWorkflow(task.id, { workflowRunId: result.messageId });
    return { task, messageId: result.messageId };
  }
  const run = await start(agentTaskWorkflow, [task.id, instruction]);
  await updateAgentTaskWorkflow(task.id, { workflowRunId: run.runId });
  return { task, messageId: run.runId };
}

export async function runQueuedAgentTask(req: any, body: { taskId: number; instruction: string }) {
  if (process.env.QSTASH_TOKEN) {
    const signature = req.get("Upstash-Signature") ?? "";
    const valid = await receiver.verify({ signature, body: JSON.stringify(body) });
    if (!valid) throw new Error("Invalid QStash signature");
  }
  return start(agentTaskWorkflow, [body.taskId, body.instruction]);
}
