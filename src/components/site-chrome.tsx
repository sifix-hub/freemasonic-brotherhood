import Image from "next/image";
import Link from "next/link";
import { imageSource, navigation, site } from "@/content/site";
import { Icon } from "./icon";
import { MobileNavigation } from "./mobile-navigation";

function Brand() {
  return <Link href="/" className="brand" aria-label={site.name + " home"}>
    <Image src={imageSource("emblem.png")} alt="" width={46} height={46} />
    <span>Join Freemasonic <strong>Brotherhood</strong></span>
  </Link>;
}

export function SiteHeader() {
  return <header className="header">
    <div className="container header-inner">
      <Brand />
      <div className="desktop-navigation">
        <nav aria-label="Main navigation">
          {navigation.map(([title, href]) => <Link key={href} href={href}>{title}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="button button-gold" href="/apply/">Join Now</Link>
          <Link className="button button-outline" href="/sign-in/">Sign in</Link>
        </div>
      </div>
      <MobileNavigation />
    </div>
  </header>;
}

const footerGroups = [
  { title: "Navigate", paths: ["/about/", "/join/", "/apply/", "/gallery/", "/members/", "/blog/"] },
  { title: "Get Involved", paths: ["/get-involved/", "/donate/", "/where-we-work/", "/what-we-do/", "/benefits/"] },
];

export function SiteFooter() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-intro">
        <Brand />
        <p>{site.description}</p>
        <form className="search" action="/blog/" method="get" role="search">
          <label htmlFor="footer-search">Search the Lodge Journal</label>
          <div><input id="footer-search" name="q" type="search" placeholder="Search articles" /><button aria-label="Search"><Icon name="search" /></button></div>
        </form>
      </div>
      {footerGroups.map(({ title, paths }) => <nav key={title} aria-label={title}><h2>{title}</h2><ul>
        {navigation.filter(([, href]) => paths.some((path) => path === href)).map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
      </ul></nav>)}
      <nav aria-label="Site information"><h2>Reach the Lodge</h2><ul>
        <li><Link href="/contact/">Contact Us</Link></li>
        <li><Link href="/verify-status/">Verify Status</Link></li>
        <li><Link href="/privacy/">Privacy</Link></li>
        <li><Link href="/sitemap/">Sitemap</Link></li>
      </ul></nav>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>Charity · Service · Fellowship</span></div>
  </footer>;
}
