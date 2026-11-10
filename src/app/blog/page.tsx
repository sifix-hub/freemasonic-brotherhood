import type { Metadata } from "next";
import { Journal } from "@/components/journal";
import { PageIntro } from "@/components/sections";

export const metadata: Metadata = { title: "Lodge Journal" };

export default function BlogPage() {
  return <>
    <PageIntro eyebrow="From the Lodge" title="Lodge Journal" intro="Read about fellowship, charitable service and taking the first step towards membership." />
    <section className="section"><div className="container"><Journal /></div></section>
  </>;
}
