import AnnouncementBanner from "@/components/blocks/announcement-banners/announcement-banners";
import Features from "@/components/blocks/features/Features";
import HeroSection from "@/components/blocks/hero/default";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnnouncementBanner/>
      <Features/>
    </>
  );
}
