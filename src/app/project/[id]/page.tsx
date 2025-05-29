"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, CheckCircle, Clock, Users, Target, Database, Cpu, Globe, Shield, AlertCircle } from "lucide-react";

// Type definition based on the database schema
type Project = {
  id: string;
  name: string;
  description?: string;
  userRequest: string;
  targetUsers?: string;
  coreValueProposition?: string;
  technicalStack?: {
    frontend: string[];
    backend: string[];
    database: string;
    authentication: string;
    additionalTools: string[];
  };
  developmentPhases?: {
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
  };
  databaseSchema?: {
    entities: string[];
    relationships: string[];
    keyFields: string[];
    indexes: string[];
  };
  apiEndpoints?: Array<{
    route: string;
    purpose: string;
    request: string;
    response: string;
    authentication: boolean;
  }>;
  componentStructure?: {
    pages: string[];
    sharedComponents: string[];
    featureComponents: string[];
    hooks: string[];
    utils: string[];
  };
  priorityAssessment?: {
    mustHave: string[];
    shouldHave: string[];
    couldHave: string[];
    wontHave: string[];
  };
  riskAssessment?: {
    technicalRisks: string[];
    timelineRisks: string[];
    dependencyRisks: string[];
    mitigationStrategies: string[];
  };
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/project/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch project: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Error Loading Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">The project you&apos;re looking for doesn&apos;t exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "mustHave": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "shouldHave": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "couldHave": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "wontHave": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-xl text-muted-foreground mt-2">{project.description}</p>
          </div>
          <Badge variant={project.status === "planning" ? "secondary" : project.status === "in-progress" ? "default" : "outline"}>
            {project.status}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Updated: {new Date(project.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <Separator />

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Original Request</h4>
              <p className="text-sm text-muted-foreground">{project.userRequest}</p>
            </div>
            {project.targetUsers && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Target Users
                </h4>
                <p className="text-sm text-muted-foreground">{project.targetUsers}</p>
              </div>
            )}
            {project.coreValueProposition && (
              <div>
                <h4 className="font-semibold mb-2">Core Value Proposition</h4>
                <p className="text-sm text-muted-foreground">{project.coreValueProposition}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Technical Stack */}
        {project.technicalStack && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Technical Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Frontend</h4>
                <div className="flex flex-wrap gap-1">
                  {project.technicalStack.frontend.map((tech, idx) => (
                    <Badge key={idx} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Backend</h4>
                <div className="flex flex-wrap gap-1">
                  {project.technicalStack.backend.map((tech, idx) => (
                    <Badge key={idx} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Database</h4>
                <Badge variant="outline">{project.technicalStack.database}</Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Authentication</h4>
                <Badge variant="outline">{project.technicalStack.authentication}</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Development Phases */}
      {project.developmentPhases && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Development Phases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(project.developmentPhases).map(([phaseKey, phase]) => (
                <div key={phaseKey} className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold">{phase.name}</h3>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                  <div className="space-y-2">
                    {phase.tasks.map((task, idx) => (
                      <div key={idx} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{task.taskName}</h4>
                          <Badge className={getComplexityColor(task.complexity)}>
                            {task.complexity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">File/Action:</span> {task.fileOrAction}
                        </div>
                        {task.dependencies && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Dependencies:</span> {task.dependencies}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Database Schema */}
        {project.databaseSchema && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Schema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Entities</h4>
                <div className="space-y-1">
                  {project.databaseSchema.entities.map((entity, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground">{entity}</div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Key Fields</h4>
                <div className="space-y-1">
                  {project.databaseSchema.keyFields.map((field, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground">{field}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Endpoints */}
        {project.apiEndpoints && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                API Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.apiEndpoints.map((endpoint, idx) => (
                  <div key={idx} className="border rounded p-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono">{endpoint.route}</code>
                      {endpoint.authentication && (
                        <Shield className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{endpoint.purpose}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Priority Assessment */}
        {project.priorityAssessment && (
          <Card>
            <CardHeader>
              <CardTitle>Priority Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(project.priorityAssessment).map(([priority, items]) => (
                <div key={priority}>
                  <h4 className="font-semibold mb-2 capitalize">{priority.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <div className="space-y-1">
                    {items.map((item, idx) => (
                      <Badge key={idx} className={getPriorityColor(priority)} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Risk Assessment */}
      {project.riskAssessment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Technical Risks</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {project.riskAssessment.technicalRisks.map((risk, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">{risk}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Timeline Risks</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {project.riskAssessment.timelineRisks.map((risk, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">{risk}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Dependency Risks</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {project.riskAssessment.dependencyRisks.map((risk, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">{risk}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mitigation Strategies</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {project.riskAssessment.mitigationStrategies.map((strategy, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">{strategy}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
