// lib/posthog.ts
import posthog from "posthog-js";

export const initPosthog = () => {
  if (typeof window === "undefined") return;

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.warn("PostHog key is missing");
    return;
  }

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    capture_pageview: false, // we’ll handle page views manually
  });
};

export default posthog;
