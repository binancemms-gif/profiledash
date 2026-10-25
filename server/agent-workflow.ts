import { FatalError, RetryableError } from "workflow";
import { updateAgentTaskWorkflow } from "./db";

async function executeAgentTask(taskId: number, instruction: string) {
  "use step";
  await updateAgentTaskWorkflow(taskId, { status: "Running", currentStep: "Interpret instruction" });
  if (!instruction.trim()) throw new FatalError("Instruction is required");
  await updateAgentTaskWorkflow(taskId, { status: "Completed", currentStep: "Complete", result: JSON.stringify({ instruction, message: "Task plan prepared. YouTube actions remain approval-gated." }) });
  return { taskId, status: "Completed" };
}

export async function agentTaskWorkflow(taskId: number, instruction: string) {
  "use workflow";
  try {
    return await executeAgentTask(taskId, instruction);
  } catch (error) {
    if (error instanceof FatalError) {
      await updateAgentTaskWorkflow(taskId, { status: "Failed", error: error.message });
      throw error;
    }
    throw new RetryableError(error instanceof Error ? error.message : "Task execution failed");
  }
}
