"use client";

import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // Authentication

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getErrorMessage = (code: string) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Try logging in instead.";
      case "auth/invalid-email":
        return "That doesn’t look like a valid email.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userName,
      });

      toast("Account created!");

      setEmail("");
      setPassword("");
      setUserName("");

      router.push("/login");
    } catch (err: any) {
      const message = getErrorMessage(err.code);
      toast("Signup failed", {
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
        onSubmit={handleSignup}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to create your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Spongebob The Meme Lord"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
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
            {loading ? "Signing up..." : "Sign Up"}
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
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
