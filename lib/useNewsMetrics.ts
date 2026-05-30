"use client";

import { useEffect, useState } from "react";
import { incrementViews, getMetrics } from "@/lib/metrics";

export function useNewsMetrics(slug: string) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const metrics = incrementViews(slug);
    setViews(metrics[slug]?.views ?? 0);
  }, [slug]);

  return { views };
}