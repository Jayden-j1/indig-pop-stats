// src/app/providers.tsx
//
// Purpose
// -------
// Central place to mount React Query (TanStack Query).
// Improves performance (caching, deduping) and keeps data fetching consistent.

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Good defaults for public dashboards.
        staleTime: 60_000, // 1 minute
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Create once per browser session.
  const [client] = React.useState(() => makeQueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
