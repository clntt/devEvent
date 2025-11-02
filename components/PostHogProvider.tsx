// components/PostHogProvider.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { initPosthog } from "@/lib/posthog";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize once
  useEffect(() => {
    initPosthog();
  }, []);

  // Capture page views on route change
  useEffect(() => {
    if (!pathname) return;

    posthog.capture("$pageview", {
      path:
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
