// src/lib/cn.ts
//
// Purpose
// -------
// Tailwind-friendly className merging.
// Improves readability without adding complexity.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
