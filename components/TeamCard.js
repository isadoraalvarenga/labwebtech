import Image from "next/image";

export default function TeamCard({ name, position, image, alt, children }) {
  return (
    <article className="au-person">
      {image && (
        <div className="au-media au-media--square">
          <Image src={image} alt={alt ?? ""} fill sizes="160px" />
        </div>
      )}
      <div>
        <h3>{name}</h3>
        <p className="eyebrow">{position}</p>
        {children}
      </div>
    </article>
  );
}