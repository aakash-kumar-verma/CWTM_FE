"use client";

import { createLDReactProvider } from "@launchdarkly/react-sdk";

const clientSideId = process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_ID;

if (!clientSideId) {
  throw new Error("Missing NEXT_PUBLIC_LD_CLIENT_SIDE_ID");
}

const LaunchDarklyProvider = createLDReactProvider(clientSideId, {
  kind: "user",
  key: "workhub-anonymous",
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LaunchDarklyProvider>{children}</LaunchDarklyProvider>;
}
