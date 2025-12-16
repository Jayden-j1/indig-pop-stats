// src/app/layout.tsx
//
// Purpose
// -------
// Root layout for the app. Applies global styles and mounts Providers.
// Accessibility: includes skip link target, sensible structure.

import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Indigenous Population Dashboard (Demo)",
  description:
    "A simple, accessible dashboard for Aboriginal and Torres Strait Islander population indicators (Australia only).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Providers>
          {/* Skip link target for accessibility */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:p-3 focus:shadow"
          >
            Skip to content
          </a>

          {children}
        </Providers>
      </body>
    </html>
  );
}
