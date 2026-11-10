"use client";

import Link from "next/link";
import { useRef } from "react";
import { navigation } from "@/content/site";
import { Icon } from "./icon";

export function MobileNavigation() {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLElement>(null);

  function close() {
    if (disclosure.current) disclosure.current.open = false;
  }

  return <div className="mobile-navigation">
    <Link className="button button-gold" href="/apply/">Join</Link>
    <details ref={disclosure} onKeyDown={(event) => {
      if (event.key === "Escape" && disclosure.current?.open) {
        close();
        toggle.current?.focus();
      }
    }}>
      <summary ref={toggle} aria-label="Main menu"><Icon name="menu" className="menu-open" /><Icon name="close" className="menu-close" /></summary>
      <nav aria-label="Mobile navigation">
        {navigation.map(([title, href]) => <Link key={href} href={href} onClick={close}>{title}</Link>)}
        <Link href="/sign-in/" onClick={close}>Sign in</Link>
      </nav>
    </details>
  </div>;
}
