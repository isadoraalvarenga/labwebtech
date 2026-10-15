import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ slug, name, category, description, image, alt }) {
  return (
    <article className="au-card">
      {image && (
        <div className="au-media au-media--wide">
          <Image src={image} alt={alt ?? ""} fill sizes="(min-width: 900px) 33vw, 100vw" />
        </div>
      )}
      <div className="au-card__body">
        <p className="eyebrow">{category}</p>
        <h3>
          <Link href={`/produtos/${slug}`}>{name}</Link>
        </h3>
        <p>{description}</p>
      </div>
    </article>
  );
}