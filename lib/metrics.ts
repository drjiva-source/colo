const STORAGE_KEY = "news-metrics";

type Metrics = {
  [slug: string]: {
    views: number;
  };
};

export function getMetrics(): Metrics {
  if (typeof window === "undefined") return {};

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

export function saveMetrics(metrics: Metrics) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
}

export function incrementViews(slug: string) {
  const metrics = getMetrics();

  if (!metrics[slug]) {
    metrics[slug] = { views: 0 };
  }

  metrics[slug].views += 1;

  saveMetrics(metrics);

  return metrics;
}