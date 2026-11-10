"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { articles } from "@/content/pages";
import { imageSource } from "@/content/site";
import { Icon } from "./icon";

export function Journal() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    function sync() {
      setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    }

    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const term = query.trim().toLowerCase();
  const matches = articles.filter(({ title, summary, category, body }) => [title, summary, category, body].join(" ").toLowerCase().includes(term));

  return <>
    <form className="search journal-search" role="search" action="/blog/" method="get">
      <label htmlFor="journal-search">Search articles</label>
      <div><input id="journal-search" name="q" type="search" value={query} onChange={(event) => setQuery(event.target.value)} /><button aria-label="Search"><Icon name="search" /></button></div>
    </form>
    {matches.length ? <ul className="article-grid">{matches.map((article) => <li key={article.slug}>
      <Link href={"/blog/" + article.slug + "/"} className="article-card">
        <span className="gallery-picture"><Image src={imageSource(article.image)} alt="" fill sizes="(max-width: 760px) 95vw, 34vw" /></span>
        <span className="eyebrow">{article.category}</span><h2>{article.title}</h2><p>{article.summary}</p>
      </Link>
    </li>)}</ul> : <p className="notice" role="status">No articles match your search.</p>}
  </>;
}
