"use client";
import { redirect, useRouter } from "next/navigation";

export async function handleDelete() {
  const router = useRouter(); 
  router.push("/");
}
