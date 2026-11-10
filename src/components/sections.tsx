import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { imageSource } from "@/content/site";
import { Icon } from "./icon";

export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="section-heading">
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </div>;
}

export function PageIntro({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="page-intro">
    <Image src={imageSource("hero-temple.jpg")} alt="" fill sizes="100vw" />
    <div className="container page-intro-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div>
  </section>;
}

export function JoinBanner() {
  return <section className="join-banner">
    <div className="container">
      <SectionHeading eyebrow="Your Next Step" title="The door is open">Start with a conversation and find out what it means to be part of a lodge.</SectionHeading>
      <div className="actions">
        <Link className="button button-gold" href="/join/">How to Join <Icon name="arrow" /></Link>
        <Link className="button button-outline" href="/contact/">Contact Us</Link>
      </div>
    </div>
  </section>;
}
