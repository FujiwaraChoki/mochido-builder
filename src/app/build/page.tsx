"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SquareDashedMousePointer } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  prompt: z.string().min(1),
});

export default function BuildPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    fetch("/api/builder/plan", {
      method: "POST",
      body: JSON.stringify({
        userRequest: data.prompt,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Project created", {
          description: "Mochido Builder is now working on your project",
        });
        router.push(`/project/${data.projectId}`);
      })
      .catch((err) => {
        toast.error("Failed to create project", {
          description: err.message,
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/10 p-8">
      <div className="w-full max-w-5xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">What do you wanna build today, {session?.user?.name}?</h1>
          <p className="text-muted-foreground">Enter a prompt describing your project idea</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Project Prompt</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. A todo app with authentication and dark mode..."
                      className="h-12 text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-fit">
              <SquareDashedMousePointer className="w-5 h-5" />
              Start new Project
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
