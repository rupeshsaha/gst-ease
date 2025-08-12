"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Gem } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginInput = z.infer<typeof loginSchema>;
type SignupInput = z.infer<typeof signupSchema>;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
  } = useForm<SignupInput>({ resolver: zodResolver(signupSchema) });

  const onLogin: SubmitHandler<LoginInput> = async (data) => {
    // Dummy login logic
    if (data.email && data.password) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your credentials.",
      });
    }
  };

  const onSignup: SubmitHandler<SignupInput> = async (data) => {
    // Dummy signup logic
    if (data.email && data.password && data.name) {
       toast({
        title: "Signup Successful",
        description: "Your account has been created. Please log in.",
      });
      setIsLogin(true);
    } else {
       toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Please fill all fields correctly.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
         <div className="flex justify-center items-center gap-2 mb-6">
            <Gem className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">GSTEase</h1>
          </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{isLogin ? "Welcome Back!" : "Create an Account"}</CardTitle>
            <CardDescription>
              {isLogin ? "Enter your credentials to access your account." : "Fill in the details to join us."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="user@example.com" {...registerLogin("email")} />
                  {loginErrors.email && <p className="text-sm text-destructive">{loginErrors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" {...registerLogin("password")} />
                  {loginErrors.password && <p className="text-sm text-destructive">{loginErrors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoginSubmitting}>
                  {isLoginSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" {...registerSignup("name")} />
                  {signupErrors.name && <p className="text-sm text-destructive">{signupErrors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="user@example.com" {...registerSignup("email")} />
                  {signupErrors.email && <p className="text-sm text-destructive">{signupErrors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" placeholder="••••••••" {...registerSignup("password")} />
                  {signupErrors.password && <p className="text-sm text-destructive">{signupErrors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSignupSubmitting}>
                  {isSignupSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
