"use client";

import { auth } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // Authentication

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getErrorMessage = (code: string) => {
    switch (code) {
      case "auth/invalid-credential":
        return "Invalid email or password.";
      case "auth/invalid-email":
        return "That doesn’t look like a valid email.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Wrong password. Try again.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      toast("Logged in!");

      setEmail("");
      setPassword("");
    } catch (err: any) {
      const message = getErrorMessage(err.code);
      toast("Login failed", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast(`Welcome ${user.displayName || "User"}!`);

      router.push("/");
    } catch (error: any) {
      toast("Google login failed", {
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className={cn(
          "flex flex-col gap-6 border-2 px-8 py-4 rounded-xl",
          className
        )}
        {...props}
        onSubmit={handleSignin}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="spongebob@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgotpass"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full cursor-pointer flex items-center justify-center gap-2"
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            {loading ? (
              "Continuing with Google"
            ) : (
              <>
                <FcGoogle /> Continue with Google
              </>
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
