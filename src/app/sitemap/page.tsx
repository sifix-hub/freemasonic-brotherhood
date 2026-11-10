import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/sections";
import { navigation } from "@/content/site";

export const metadata: Metadata = { title: "Sitemap" };

export default function SitemapPage() {
  return <>
    <PageIntro eyebrow="Site Information" title="Sitemap" intro="Browse the main sections of the website." />
    <div className="section container"><ul className="sitemap">
      {navigation.map(([title, href]) => <li key={href}><Link href={href}>{title}</Link></li>)}
      <li><Link href="/privacy/">Privacy</Link></li>
    </ul></div>
  </>;
}
