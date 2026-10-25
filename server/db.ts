import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { InsertAgentTask, InsertUser, agentTasks, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    throw new Error("Database is not available");
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: { ...updateSet, updatedAt: new Date() },
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listAgentTasks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(agentTasks).orderBy(desc(agentTasks.createdAt));
}

export async function createAgentTask(input: InsertAgentTask) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const [task] = await db.insert(agentTasks).values(input).returning();
  return task;
}

export async function updateAgentTask(id: number, status: string, retryCount?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const [task] = await db.update(agentTasks).set({ status, retryCount, updatedAt: new Date() }).where(eq(agentTasks.id, id)).returning();
  return task;
}

export async function updateAgentTaskWorkflow(id: number, values: Partial<{ status: string; workflowRunId: string; currentStep: string; result: string; error: string; retryCount: number }>) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const [task] = await db.update(agentTasks).set({ ...values, updatedAt: new Date() }).where(eq(agentTasks.id, id)).returning();
  return task;
}
