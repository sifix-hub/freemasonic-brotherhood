import Image from "next/image";
import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { Icon } from "@/components/icon";
import { JoinBanner, SectionHeading } from "@/components/sections";
import { gallery, imageSource, pillars } from "@/content/site";

export default function HomePage() {
  return <>
    <section className="hero" aria-labelledby="home-title">
      <Image src={imageSource("hero-temple.jpg")} alt="Candlelit Masonic temple hall with stone columns" fill sizes="100vw" preload />
      <div className="container hero-content">
        <p className="eyebrow">Est. in Brotherhood</p>
        <h1 id="home-title">Join Freemasonic <span>Brotherhood</span></h1>
        <p className="hero-intro">A lodge community built on fellowship, charitable service and a commitment to helping one another.</p>
        <div className="actions">
          <Link className="button button-gold" href="/join/">Begin Your Registration</Link>
          <Link className="button button-dark" href="/about/">Learn About Us</Link>
        </div>
      </div>
    </section>

    <section className="section pillars">
      <div className="container">
        <SectionHeading eyebrow="What We Offer" title="Six Pillars of the Brotherhood" />
        <ul className="pillar-grid">{pillars.map(({ icon, title, body }) => <li key={title}>
          <Icon name={icon} /><h3>{title}</h3><p>{body}</p>
        </li>)}</ul>
      </div>
    </section>

    <section className="section purpose">
      <div className="container split">
        <div className="split-image"><Image src={imageSource("brotherhood.jpg")} alt="Lodge members gathered in a candlelit library" fill sizes="(max-width: 760px) 95vw, 50vw" /></div>
        <div className="purpose-content">
          <SectionHeading eyebrow="Our Purpose" title="Built on fellowship and relief" />
          <p>We bring people together to support fellow members, give time to local causes and build lasting friendships through lodge life.</p>
          <p>Start by learning about membership and what to expect when you meet a local lodge.</p>
          <Link className="text-link" href="/join/">How to Join <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>

    <section className="section"><div className="container">
      <SectionHeading eyebrow="Lodge Life" title="Inside the Lodge">Explore scenes of ceremony, fellowship and charitable work.</SectionHeading>
      <Gallery items={gallery.slice(0, 4)} />
      <div className="actions gallery-action"><Link className="button button-outline" href="/gallery/">See the full gallery <Icon name="arrow" /></Link></div>
    </div></section>
    <JoinBanner />
  </>;
}
