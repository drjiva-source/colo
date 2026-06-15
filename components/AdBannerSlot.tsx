// components/AdBannerSlot.tsx
import { getAdBannerByPosition } from "@/lib/sanity/queries";
import { AdBanner } from "./AdBanner";

interface AdBannerSlotProps {
  position: "header" | "sidebar-rect" | "sidebar-sky" | "in-article";
}

export async function AdBannerSlot({ position }: AdBannerSlotProps) {
  const banner = await getAdBannerByPosition(position);

  if (!banner) return null;

  const variant = 
    position === "header" ? "leaderboard" : 
    position === "sidebar-sky" ? "skyscraper" : 
    "rectangle";

  return (
    <AdBanner
      variant={variant}
      label={banner.label}
      imageSrc={banner.image}
      mobileImageSrc={banner.mobileImage}
      href={banner.url}
    />
  );
}