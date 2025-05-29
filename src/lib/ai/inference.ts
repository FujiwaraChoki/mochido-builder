import { google } from "@ai-sdk/google";
import { CoreMessage, generateText, generateObject } from "ai";
import { PLAN_PROMPT } from "../prompts";
import { z } from "zod";

// Zod schema for structured plan output
const PlanSchema = z.object({
  projectOverview: z.object({
    projectName: z.string(),
    description: z.string(),
    targetUsers: z.string(),
    coreValueProposition: z.string(),
  }),
  technicalStack: z.object({
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    database: z.string(),
    authentication: z.string(),
    additionalTools: z.array(z.string()),
  }),
  developmentPhases: z.object({
    phase1: z.object({
      name: z.string(),
      description: z.string(),
      tasks: z.array(z.object({
        taskName: z.string(),
        fileOrAction: z.string(),
        description: z.string(),
        purpose: z.string(),
        dependencies: z.string(),
        complexity: z.enum(["Low", "Medium", "High"]),
        technicalNotes: z.string(),
      })),
    }),
    phase2: z.object({
      name: z.string(),
      description: z.string(),
      tasks: z.array(z.object({
        taskName: z.string(),
        fileOrAction: z.string(),
        description: z.string(),
        purpose: z.string(),
        dependencies: z.string(),
        complexity: z.enum(["Low", "Medium", "High"]),
        technicalNotes: z.string(),
      })),
    }),
    phase3: z.object({
      name: z.string(),
      description: z.string(),
      tasks: z.array(z.object({
        taskName: z.string(),
        fileOrAction: z.string(),
        description: z.string(),
        purpose: z.string(),
        dependencies: z.string(),
        complexity: z.enum(["Low", "Medium", "High"]),
        technicalNotes: z.string(),
      })),
    }),
    phase4: z.object({
      name: z.string(),
      description: z.string(),
      tasks: z.array(z.object({
        taskName: z.string(),
        fileOrAction: z.string(),
        description: z.string(),
        purpose: z.string(),
        dependencies: z.string(),
        complexity: z.enum(["Low", "Medium", "High"]),
        technicalNotes: z.string(),
      })),
    }),
  }),
  databaseSchema: z.object({
    entities: z.array(z.string()),
    relationships: z.array(z.string()),
    keyFields: z.array(z.string()),
    indexes: z.array(z.string()),
  }),
  apiEndpoints: z.array(z.object({
    route: z.string(),
    purpose: z.string(),
    request: z.string(),
    response: z.string(),
    authentication: z.boolean(),
  })),
  componentStructure: z.object({
    pages: z.array(z.string()),
    sharedComponents: z.array(z.string()),
    featureComponents: z.array(z.string()),
    hooks: z.array(z.string()),
    utils: z.array(z.string()),
  }),
  priorityAssessment: z.object({
    mustHave: z.array(z.string()),
    shouldHave: z.array(z.string()),
    couldHave: z.array(z.string()),
    wontHave: z.array(z.string()),
  }),
  riskAssessment: z.object({
    technicalRisks: z.array(z.string()),
    timelineRisks: z.array(z.string()),
    dependencyRisks: z.array(z.string()),
    mitigationStrategies: z.array(z.string()),
  }),
});

export const inference = async (messages: CoreMessage[], systemPrompt: string) => {
  const model = google("gemini-2.0-flash-thinking-exp-01-21");
  const response = await generateText({
    model,
    messages,
    system: systemPrompt,
    maxSteps: 5,
  })

  return response;
};

export const makePlan = async (userRequest: string) => {
  const model = google("gemini-2.0-flash-thinking-exp-01-21");

  const { object } = await generateObject({
    model,
    schema: PlanSchema,
    schemaName: "WebAppDevelopmentPlan",
    schemaDescription: "A comprehensive development plan for building a web application",
    system: PLAN_PROMPT,
    prompt: `Create a detailed development plan for the following user request: ${userRequest}`,
    mode: "auto",
  });

  return object;
};
