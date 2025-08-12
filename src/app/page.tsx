
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
import { SignupStep2, SignupStep2Input, signupStep2Schema } from "@/components/SignupStep2";
import { Separator } from "@/components/ui/separator";

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

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.92H12V14.49H18.05C17.76 16.03 16.91 17.37 15.61 18.23V21.09H19.5C21.56 19.23 22.56 16.05 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12 23C14.97 23 17.45 22.02 19.5 20.4L15.6 17.54C14.54 18.23 13.37 18.67 12 18.67C9.28 18.67 7.03 16.89 6.24 14.45H2.18V17.41C4.16 20.89 7.77 23 12 23Z" fill="#34A853"/>
        <path d="M6.24 14.45C6 13.78 5.86 13.08 5.86 12.33C5.86 11.58 6 10.88 6.24 10.21V7.25H2.18C1.43 8.7 1 10.45 1 12.33C1 14.21 1.43 15.96 2.18 17.41L6.24 14.45Z" fill="#FBBC05"/>
        <path d="M12 5.99C13.44 5.99 14.67 6.48 15.64 7.38L18.61 4.41C16.64 2.61 14.21 1.67 12 1.67C7.77 1.67 4.16 4.11 2.18 7.25L6.24 10.21C7.03 7.77 9.28 5.99 12 5.99Z" fill="#EA4335"/>
    </svg>
);


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [signupStep, setSignupStep] = useState(1);
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
  
  const {
    control: controlStep2,
    handleSubmit: handleStep2Submit,
    formState: { errors: step2Errors, isSubmitting: isStep2Submitting },
  } = useForm<SignupStep2Input>({ resolver: zodResolver(signupStep2Schema) });

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
  
  const onGoogleLogin = () => {
     // Dummy Google login logic
     toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push("/dashboard");
  }

  const onSignup: SubmitHandler<SignupInput> = async (data) => {
    // Dummy signup logic
    if (data.email && data.password && data.name) {
       toast({
        title: "Account Created",
        description: "Please provide your business details.",
      });
      setSignupStep(2);
    } else {
       toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Please fill all fields correctly.",
      });
    }
  };

  const onStep2Submit: SubmitHandler<SignupStep2Input> = async (data) => {
    // Dummy Step 2 logic
    console.log(data);
     toast({
        title: "Registration Complete",
        description: "Your account has been fully set up. Please log in.",
      });
      setIsLogin(true);
      setSignupStep(1);
  };

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin);
    setSignupStep(1);
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
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome Back!" : (signupStep === 1 ? "Create an Account" : "Business Details")}
            </CardTitle>
            <CardDescription>
              {isLogin ? "Enter your credentials to access your account." : (signupStep === 1 ? "Fill in the details to join us." : "Tell us more about your business.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <div className="space-y-4">
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
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <Button variant="outline" className="w-full" onClick={onGoogleLogin}>
                    <GoogleIcon /> Login with Google
                </Button>
              </div>
            ) : signupStep === 1 ? (
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
                  {isSignupSubmitting ? "Creating Account..." : "Continue"}
                </Button>
              </form>
            ) : (
                <form onSubmit={handleStep2Submit(onStep2Submit)} className="space-y-4">
                    <SignupStep2 control={controlStep2} errors={step2Errors} />
                    <Button type="submit" className="w-full" disabled={isStep2Submitting}>
                        {isStep2Submitting ? "Saving..." : "Complete Registration"}
                    </Button>
                </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" onClick={handleToggleAuthMode}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

    