import { NextRequest } from "next/server";
import { makePlan } from "@/lib/ai/inference";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/app-schema";

export async function POST(req: NextRequest) {
  const { userRequest } = await req.json();

  const plan = await makePlan(userRequest);

  const projectName = plan.projectOverview.projectName;

  const result = await db.insert(projects).values({
    name: projectName,
    description: plan.projectOverview.description,
    userRequest,
    targetUsers: plan.projectOverview.targetUsers,
    coreValueProposition: plan.projectOverview.coreValueProposition,
    technicalStack: plan.technicalStack,
    developmentPhases: plan.developmentPhases,
    priorityAssessment: plan.priorityAssessment,
    riskAssessment: plan.riskAssessment,
  }).returning({ id: projects.id });

  return NextResponse.json({
    projectId: result[0].id,
    projectName,
    projectDescription: plan.projectOverview.description,
    projectUserRequest: userRequest,
    projectTargetUsers: plan.projectOverview.targetUsers,
    projectCoreValueProposition: plan.projectOverview.coreValueProposition,
    projectTechnicalStack: plan.technicalStack,
    projectDevelopmentPhases: plan.developmentPhases,
    projectPriorityAssessment: plan.priorityAssessment,
    projectRiskAssessment: plan.riskAssessment,
  });
}
