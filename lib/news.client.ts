"use client";

import { getMetrics } from "@/lib/metrics";

export function getViews(slug: string) {
  const metrics = getMetrics();
  return metrics[slug]?.views ?? 0;
}