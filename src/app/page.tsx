"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/useAuth";
import { Treadmill } from "ldrs/react";
import DailyTasks from "@/components/daily-tasks";
import "ldrs/react/Treadmill.css";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Treadmill size="70" speed="1.25" color="white" />
      </div>
    );

  return <>{user && <DailyTasks />}</>; // only show tasks if logged in
}
