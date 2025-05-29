import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Mochido Builder</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          An open-source alternative to AI Website Builders. Build your next project faster with automated backend generation.
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => redirect("/auth/login")}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Login
          </Button>
          <Button
            onClick={() => redirect("/auth/register")}
            variant="outline"
            size="lg"
            className="hover:bg-gray-100"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}
