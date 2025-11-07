// app/providers.tsx
"use client";
import { useEffect } from "react";

import { authClient } from "@/lib/auth-client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      defaults: "2025-05-24",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

async function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user.id) {
      posthog.identify(session.user.id, {
        email: session.user.email,
        name: session.user.name,
      });
    }

    return () => {};
  }, []);
}
