"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DailyTasks from "@/components/daily-tasks";
import { useAuth } from "@/components/useAuth";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>; // show loading while checking auth

  return <>{user && <DailyTasks />}</>; // only show tasks if logged in
}
