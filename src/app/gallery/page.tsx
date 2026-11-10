import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import { JoinBanner, PageIntro, SectionHeading } from "@/components/sections";
import { gallery } from "@/content/site";

export const metadata: Metadata = { title: "Photo Gallery" };

export default function GalleryPage() {
  return <>
    <PageIntro eyebrow="Lodge Life" title="Photo Gallery" intro="Ceremony, fellowship and community work in photographs." />
    <section className="section"><div className="container">
      <SectionHeading title="Inside the Lodge">Select a photograph to enlarge it. Use the arrow keys to browse and Escape to close.</SectionHeading>
      <Gallery items={gallery} />
    </div></section>
    <JoinBanner />
  </>;
}
