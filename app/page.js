import { getContent, listContent } from "@/lib/content.mjs";
import EditorialContent from "@/components/EditorialContent";
import ProductCard from "@/components/ProductCard";
import TeamCard from "@/components/TeamCard";

export default async function Home() {
  const [empresa, produtos, equipe] = await Promise.all([
    getContent("paginas", "empresa"),
    listContent("produtos"),
    listContent("equipe"),
  ]);

  return (
    <>
      <section id="empresa">
        {empresa ? (
          <>
            <h1>{empresa.frontmatter.title}</h1>
            <p className="lead">{empresa.frontmatter.lead}</p>
            <EditorialContent source={empresa.content} />
          </>
        ) : (
          <>
            <h1>Aurora Studio</h1>
            <p className="au-empty">
              A apresentação da empresa ainda não foi cadastrada
              (arquivo content/paginas/empresa.mdx).
            </p>
          </>
        )}
      </section>

      <section id="produtos" aria-labelledby="titulo-produtos">
        <h2 id="titulo-produtos">Produtos</h2>
        {produtos.length === 0 ? (
          <p className="au-empty">Nenhum produto cadastrado por enquanto.</p>
        ) : (
          <div className="au-grid">
            {produtos.map(({ slug, frontmatter }) => (
              <ProductCard key={slug} slug={slug} {...frontmatter} />
            ))}
          </div>
        )}
      </section>

      <section id="equipe" aria-labelledby="titulo-equipe">
        <h2 id="titulo-equipe">Equipe</h2>
        {equipe.length === 0 ? (
          <p className="au-empty">Nenhuma pessoa cadastrada por enquanto.</p>
        ) : (
          <div className="au-people">
            {equipe.map(({ slug, frontmatter, content }) => (
              <TeamCard key={slug} {...frontmatter}>
                <EditorialContent source={content} />
              </TeamCard>
            ))}
          </div>
        )}
      </section>
    </>
  );
}