import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialContent from "@/components/EditorialContent";
import { getContent, listContent } from "@/lib/content.mjs";

export async function generateStaticParams() {
  return (await listContent("produtos")).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = await getContent("produtos", slug);
  return doc
    ? { title: doc.frontmatter.name, description: doc.frontmatter.description }
    : { title: "Produto não encontrado" };
}

export default async function ProdutoPage({ params }) {
  const { slug } = await params;
  const doc = await getContent("produtos", slug);
  if (!doc) notFound();

  const { name, category, description, image, alt } = doc.frontmatter;

  return (
    <article>
      <Link href="/#produtos">← Voltar</Link>
      <p className="eyebrow">{category}</p>
      <h1>{name}</h1>
      <p className="lead">{description}</p>
      {image && (
        <div className="au-media au-media--wide au-detail-media">
          <Image src={image} alt={alt ?? ""} fill sizes="(min-width: 900px) 800px, 100vw" priority />
        </div>
      )}
      <EditorialContent source={doc.content} />
    </article>
  );
}