import { users, repositories, churnAnalysis, type User, type InsertUser, type Repository, type InsertRepository, type ChurnAnalysis, type InsertChurnAnalysis } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Repository methods
  getRepository(fullName: string): Promise<Repository | undefined>;
  createRepository(repository: InsertRepository): Promise<Repository>;
  updateRepository(fullName: string, updates: Partial<InsertRepository>): Promise<Repository | undefined>;
  
  // Churn analysis methods
  createChurnAnalysis(churnData: InsertChurnAnalysis): Promise<ChurnAnalysis>;
  getLatestChurnAnalysis(repositoryId: number): Promise<ChurnAnalysis | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getRepository(fullName: string): Promise<Repository | undefined> {
    const [repo] = await db.select().from(repositories).where(eq(repositories.fullName, fullName));
    return repo || undefined;
  }

  async createRepository(repository: InsertRepository): Promise<Repository> {
    const [repo] = await db
      .insert(repositories)
      .values({
        owner: repository.owner,
        name: repository.name,
        fullName: repository.fullName,
        totalCommits: repository.totalCommits,
        busFactor: repository.busFactor,
        topContributors: repository.topContributors as any
      })
      .returning();
    return repo;
  }

  async updateRepository(fullName: string, updates: Partial<InsertRepository>): Promise<Repository | undefined> {
    const [repo] = await db
      .update(repositories)
      .set({
        ...updates,
        topContributors: updates.topContributors as any,
        lastAnalyzed: new Date()
      })
      .where(eq(repositories.fullName, fullName))
      .returning();
    return repo || undefined;
  }

  async createChurnAnalysis(churnData: InsertChurnAnalysis): Promise<ChurnAnalysis> {
    const [analysis] = await db
      .insert(churnAnalysis)
      .values(churnData)
      .returning();
    return analysis;
  }

  async getLatestChurnAnalysis(repositoryId: number): Promise<ChurnAnalysis | undefined> {
    const [analysis] = await db
      .select()
      .from(churnAnalysis)
      .where(eq(churnAnalysis.repositoryId, repositoryId))
      .orderBy(desc(churnAnalysis.analysisDate))
      .limit(1);
    return analysis || undefined;
  }
}

export const storage = new DatabaseStorage();
