"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";

const schema = z.object({
  employeeId: z.string().min(1, "Employee ID diperlukan"),
  password: z.string().min(1, "Password diperlukan"),
});

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const raw = {
      employeeId: formData.get("employeeId") as string,
      password: formData.get("password") as string,
    };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Validasi gagal");
      return;
    }

    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        employeeId: parsed.data.employeeId,
        password: parsed.data.password,
        redirect: false,
      });
      if (result?.error) {
        setError("Employee ID atau password salah");
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setError("Employee ID atau password salah");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-12">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Masuk</CardTitle>
        <CardDescription>
          Silakan masuk dengan Employee ID dan password Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Gagal masuk</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              name="employeeId"
              placeholder="Misal: KRY-0001"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm">
        Lupa password?{" "}
        <a href="/forgot-password" className="underline">
          Atur ulang password
        </a>
      </CardFooter>
    </Card>
  );
}
