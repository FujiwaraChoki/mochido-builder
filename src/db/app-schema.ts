import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  userRequest: text("user_request").notNull(), // Original user request that generated this plan

  // Project Overview (extracted for easier querying)
  targetUsers: text("target_users"),
  coreValueProposition: text("core_value_proposition"),

  // Technical Stack (JSONB for structured data)
  technicalStack: jsonb("technical_stack").$type<{
    frontend: string[];
    backend: string[];
    database: string;
    authentication: string;
    additionalTools: string[];
  }>(),

  // Development Phases (JSONB for complex nested structure)
  developmentPhases: jsonb("development_phases").$type<{
    phase1: {
      name: string;
      description: string;
      tasks: Array<{
        taskName: string;
        fileOrAction: string;
        description: string;
        purpose: string;
        dependencies: string;
        complexity: "Low" | "Medium" | "High";
        technicalNotes: string;
      }>;
    };
    phase2: {
      name: string;
      description: string;
      tasks: Array<{
        taskName: string;
        fileOrAction: string;
        description: string;
        purpose: string;
        dependencies: string;
        complexity: "Low" | "Medium" | "High";
        technicalNotes: string;
      }>;
    };
    phase3: {
      name: string;
      description: string;
      tasks: Array<{
        taskName: string;
        fileOrAction: string;
        description: string;
        purpose: string;
        dependencies: string;
        complexity: "Low" | "Medium" | "High";
        technicalNotes: string;
      }>;
    };
    phase4: {
      name: string;
      description: string;
      tasks: Array<{
        taskName: string;
        fileOrAction: string;
        description: string;
        purpose: string;
        dependencies: string;
        complexity: "Low" | "Medium" | "High";
        technicalNotes: string;
      }>;
    };
  }>(),

  // Database Schema Design
  databaseSchema: jsonb("database_schema").$type<{
    entities: string[];
    relationships: string[];
    keyFields: string[];
    indexes: string[];
  }>(),

  // API Endpoints
  apiEndpoints: jsonb("api_endpoints").$type<Array<{
    route: string;
    purpose: string;
    request: string;
    response: string;
    authentication: boolean;
  }>>(),

  // Component Structure
  componentStructure: jsonb("component_structure").$type<{
    pages: string[];
    sharedComponents: string[];
    featureComponents: string[];
    hooks: string[];
    utils: string[];
  }>(),

  // Priority Assessment
  priorityAssessment: jsonb("priority_assessment").$type<{
    mustHave: string[];
    shouldHave: string[];
    couldHave: string[];
    wontHave: string[];
  }>(),

  // Risk Assessment
  riskAssessment: jsonb("risk_assessment").$type<{
    technicalRisks: string[];
    timelineRisks: string[];
    dependencyRisks: string[];
    mitigationStrategies: string[];
  }>(),

  // Project Status and Metadata
  status: varchar("status", { length: 50 }).notNull().default("planning"), // planning, in-progress, completed, paused

  // Timestamps
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});
