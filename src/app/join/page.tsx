import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SectionHeading } from "@/components/sections";
import { steps } from "@/content/site";

export const metadata: Metadata = { title: "How to Join" };

export default function JoinPage() {
  return <>
    <PageIntro eyebrow="Membership" title="How to Join" intro="Learn how to start a conversation with a lodge and what the next steps involve." />
    <section className="section"><div className="container">
      <SectionHeading eyebrow="Membership Process" title="Four Steps to Get Started" />
      <ol className="steps">{steps.map(({ title, body }, index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
      <div className="actions"><Link className="button button-gold" href="/apply/">Fill Out the Membership Form</Link><Link className="button button-outline" href="/verify-status/">Check Application Status</Link></div>
    </div></section>
  </>;
}
