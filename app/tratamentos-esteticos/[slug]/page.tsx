import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BannerTratamento from "@/components/BannerTratamento";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import PrecoProcedimento from "@/components/PrecoProcedimento";
import Destaque, { semDestaque } from "@/components/Destaque";
import { site, procedimentos, buscarProcedimento, rotaProcedimento, mensagens } from "@/lib/site";

// Só existem as páginas dos procedimentos cadastrados em lib/site.ts; qualquer outro endereço dá 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return procedimentos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tratamentos-esteticos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = buscarProcedimento(slug);
  if (!p) return {};
  const rota = rotaProcedimento(p.slug);
  return {
    title: `${p.nome} em Caxias-MA`,
    description: semDestaque([p.banner?.subtitulo, p.descricao, p.texto].filter(Boolean).join(" ")),
    alternates: { canonical: rota },
    openGraph: p.banner ? { images: [`/images/servicos/foto-${p.slug}.webp`] } : undefined,
  };
}

export default async function PaginaTratamento({ params }: PageProps<"/tratamentos-esteticos/[slug]">) {
  const { slug } = await params;
  const p = buscarProcedimento(slug);
  if (!p) notFound();

  const outros = procedimentos.filter((o) => o.slug !== p.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Serviços", item: `${site.url}/tratamentos-esteticos` },
      { "@type": "ListItem", position: 2, name: p.nome, item: `${site.url}${rotaProcedimento(p.slug)}` },
    ],
  };

  return (
    <>
      <nav className="trilha container" aria-label="Você está em">
        <Link href="/tratamentos-esteticos">Serviços</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{p.nome}</span>
      </nav>

      <BannerTratamento procedimento={p} nivel="h1" prioridade>
        <BotaoWhatsApp mensagem={mensagens.sobre(p.nome)} className="banner-botao">
          Agendar avaliação
        </BotaoWhatsApp>
      </BannerTratamento>

      <section className="secao tratamento-sobre">
        <div className="container tratamento-grade">
          <div className="tratamento-texto">
            <p className="sobretitulo">O tratamento</p>
            <h2 className="titulo-secao">{p.descricao}</h2>
            {p.texto && (
              <p>
                <Destaque texto={p.texto} />
              </p>
            )}
          </div>
          <aside className="tratamento-ficha" aria-label={`Valor e agendamento de ${p.nome}`}>
            <p className="tratamento-ficha-nome">{p.nome}</p>
            <PrecoProcedimento procedimento={p} />
            <BotaoWhatsApp mensagem={mensagens.sobre(p.nome)}>Agendar avaliação</BotaoWhatsApp>
            <p className="tratamento-ficha-nota">
              Avaliação presencial em Caxias-MA, realizada exclusivamente pela Dra. Déborah Carvalho.
            </p>
          </aside>
        </div>
      </section>

      {p.resultados && (
        <section className="secao tratamento-resultados">
          <div className="container">
            <p className="sobretitulo">Na prática</p>
            <h2 className="titulo-secao">Resultados</h2>
            <ul className="tratamento-galeria">
              {p.resultados.map((f) => (
                <li key={f.src} className={f.rotulo ? "galeria-rotulo" : undefined} data-rotulo={f.rotulo}>
                  <Image src={f.src} alt={f.alt} width={f.width} height={f.height} sizes="(max-width: 700px) 100vw, 380px" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="chamada">
        <div className="container">
          <h2>
            Sua beleza com <em>naturalidade</em>, segurança e sofisticação.
          </h2>
          <BotaoWhatsApp mensagem={mensagens.sobre(p.nome)} variante="claro">
            Falar no WhatsApp
          </BotaoWhatsApp>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <p className="sobretitulo">Conheça também</p>
          <h2 className="titulo-secao">Outros tratamentos</h2>
          <ul className="outros-tratamentos">
            {outros.map((o) => (
              <li key={o.slug}>
                <Link href={rotaProcedimento(o.slug)}>
                  <span className="outros-nome">{o.nome}</span>
                  <span className="outros-descricao">{o.descricao}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
