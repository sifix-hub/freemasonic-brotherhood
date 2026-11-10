import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/sections";
import { information } from "@/content/pages";
import { imageSource, site } from "@/content/site";

type Props = { params: Promise<{ section: string }> };
type Info = { eyebrow: string; title: string; intro: string; sections: string[][]; image?: string };

function pageFor(section: string): Info {
  if (!Object.hasOwn(information, section)) notFound();
  return information[section as keyof typeof information];
}

export function generateStaticParams() {
  return Object.keys(information).map((section) => ({ section }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = pageFor((await params).section);
  return { title: page.title, description: page.intro };
}

export default async function InformationPage({ params }: Props) {
  const { section } = await params;
  const page = pageFor(section);

  return <>
    <PageIntro {...page} />
    <div className="section container">
      <div className={page.image ? "split" : undefined}>
        <div className="prose">
          {page.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
          {section === "contact" ? (
            site.contactEmail
              ? <a className="button button-gold" href={"mailto:" + site.contactEmail}>Email the Lodge</a>
              : <p className="notice">The organisation’s contact email has yet to be configured for this website.</p>
          ) : <Link className="button button-gold" href={["about", "benefits", "what-we-do"].includes(section) ? "/join/" : "/contact/"}>{["about", "benefits", "what-we-do"].includes(section) ? "How to Join" : "Contact Us"}</Link>}
        </div>
        {page.image && <div className="split-image"><Image src={imageSource(page.image)} alt={page.image === "charity-work.jpg" ? "Lodge members helping with a community project" : "Lodge members gathered in a candlelit library"} fill sizes="(max-width: 760px) 95vw, 50vw" /></div>}
      </div>
    </div>
  </>;
}
