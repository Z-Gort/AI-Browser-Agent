import { useState } from "react";
import { useSignUp, useSignIn } from "@clerk/chrome-extension";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const DEFAULT_PASSWORD = "simple-auth-password-123"; // Auto-filled password for all users

export default function SimpleAuthForm() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const { signIn, setActive: setActiveSignIn } = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      // First try to sign in (user already exists)
      try {
        const signInAttempt = await signIn?.create({
          identifier: name.trim(),
          password: DEFAULT_PASSWORD,
        });

        if (signInAttempt?.status === "complete") {
          await setActiveSignIn?.({ session: signInAttempt.createdSessionId });
          return;
        }
      } catch (signInError: any) {
        // If sign in fails, try to sign up (new user)
        if (signInError.errors?.[0]?.code === "form_identifier_not_found") {
          const signUpAttempt = await signUp?.create({
            username: name.trim(),
            password: DEFAULT_PASSWORD,
          });

          if (signUpAttempt?.status === "complete") {
            await setActiveSignUp?.({
              session: signUpAttempt.createdSessionId,
            });
            return;
          }
        } else {
          throw signInError;
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">Welcome!</CardTitle>
          <CardDescription>
            If you've signed in before, use the same name as last time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              disabled={isLoading}
            />

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !name.trim()}
            >
              Get Started
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
