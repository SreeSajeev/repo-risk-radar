import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const repositories = pgTable("repositories", {
  id: serial("id").primaryKey(),
  owner: text("owner").notNull(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull().unique(),
  totalCommits: integer("total_commits").notNull(),
  busFactor: integer("bus_factor").notNull(),
  lastAnalyzed: timestamp("last_analyzed").defaultNow().notNull(),
  topContributors: jsonb("top_contributors").$type<Array<{ name: string; commits: number }>>().notNull(),
});

export const churnAnalysis = pgTable("churn_analysis", {
  id: serial("id").primaryKey(),
  repositoryId: integer("repository_id").references(() => repositories.id).notNull(),
  analysisDate: timestamp("analysis_date").defaultNow().notNull(),
  churnData: jsonb("churn_data").$type<Record<string, Record<string, number>>>().notNull(),
});

export const repositoryRelations = relations(repositories, ({ many }) => ({
  churnAnalyses: many(churnAnalysis),
}));

export const churnAnalysisRelations = relations(churnAnalysis, ({ one }) => ({
  repository: one(repositories, {
    fields: [churnAnalysis.repositoryId],
    references: [repositories.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRepositorySchema = createInsertSchema(repositories).pick({
  owner: true,
  name: true,
  fullName: true,
  totalCommits: true,
  busFactor: true,
  topContributors: true,
});

export const insertChurnAnalysisSchema = createInsertSchema(churnAnalysis).pick({
  repositoryId: true,
  churnData: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Repository = typeof repositories.$inferSelect;
export type InsertRepository = z.infer<typeof insertRepositorySchema>;
export type ChurnAnalysis = typeof churnAnalysis.$inferSelect;
export type InsertChurnAnalysis = z.infer<typeof insertChurnAnalysisSchema>;
