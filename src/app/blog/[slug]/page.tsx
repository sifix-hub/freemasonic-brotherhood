import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/sections";
import { articles } from "@/content/pages";

type Props = { params: Promise<{ slug: string }> };

function articleFor(slug: string) {
  return articles.find((article) => article.slug === slug) ?? notFound();
}

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articleFor((await params).slug);
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({ params }: Props) {
  const article = articleFor((await params).slug);
  return <>
    <PageIntro eyebrow={article.category} title={article.title} intro={article.summary} />
    <article className="section container prose"><p>{article.body}</p><Link href="/blog/" className="text-link">Back to the Lodge Journal</Link></article>
  </>;
}
