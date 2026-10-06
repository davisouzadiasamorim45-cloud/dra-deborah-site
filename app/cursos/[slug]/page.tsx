import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import Destaque, { semDestaque } from "@/components/Destaque";
import { site, cursos, buscarCurso, rotaCurso, mensagens } from "@/lib/site";

// Só existem as páginas dos cursos cadastrados em lib/site.ts; qualquer outro endereço dá 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return cursos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cursos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = buscarCurso(slug);
  if (!c) return {};
  return {
    title: `Curso de ${c.nome} em Caxias-MA`,
    description: semDestaque(`${c.resumo} ${c.texto}`),
    alternates: { canonical: rotaCurso(c.slug) },
    openGraph: { images: [c.foto.src] },
  };
}

export default async function PaginaCurso({ params }: PageProps<"/cursos/[slug]">) {
  const { slug } = await params;
  const c = buscarCurso(slug);
  if (!c) notFound();

  const outros = cursos.filter((o) => o.slug !== c.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Cursos", item: `${site.url}/cursos` },
      { "@type": "ListItem", position: 2, name: c.nome, item: `${site.url}${rotaCurso(c.slug)}` },
    ],
  };

  return (
    <>
      <nav className="trilha container" aria-label="Você está em">
        <Link href="/cursos">Cursos</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{c.nome}</span>
      </nav>

      <section className="secao curso-topo">
        <div className="container curso-grade">
          <div className="curso-foto">
            <Image src={c.foto.src} alt={c.foto.alt} width={c.foto.width} height={c.foto.height} sizes="(max-width: 800px) 90vw, 440px" priority />
          </div>
          <div className="curso-texto">
            <p className="sobretitulo">Curso</p>
            <h1 className="titulo-secao">{c.nome}</h1>
            <p className="curso-resumo">{c.resumo}</p>
            <p>
              <Destaque texto={c.texto} />
            </p>
            <BotaoWhatsApp mensagem={mensagens.curso(c.nome)}>Quero participar</BotaoWhatsApp>
          </div>
        </div>
      </section>

      <section className="secao curso-detalhes">
        <div className="container curso-detalhes-grade">
          <div>
            <h2 className="curso-detalhes-titulo">O que você vai aprender</h2>
            <ul className="atendimento2-pontos">
              {c.conteudo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="curso-detalhes-titulo">Para quem é</h2>
            <ul className="atendimento2-pontos">
              {c.paraQuem.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className="tratamento-ficha" aria-label={`Informações da turma de ${c.nome}`}>
            <p className="tratamento-ficha-nome">Informações da turma</p>
            <dl className="curso-ficha">
              <div>
                <dt>Formato</dt>
                <dd>Teoria e prática supervisionada</dd>
              </div>
              <div>
                <dt>Local</dt>
                <dd>
                  Clínica Déborah Carvalho, {site.endereco.cidade}-{site.endereco.uf}
                </dd>
              </div>
              <div>
                <dt>Datas, carga horária e valores</dt>
                <dd>Consulte pelo WhatsApp</dd>
              </div>
            </dl>
            <BotaoWhatsApp mensagem={mensagens.curso(c.nome)}>Consultar turmas</BotaoWhatsApp>
          </aside>
        </div>
      </section>

      <section className="chamada">
        <div className="container">
          <p className="sobretitulo">Próximas turmas</p>
          <h2>
            Garanta sua vaga no curso de <em>{c.nome}.</em>
          </h2>
          <BotaoWhatsApp mensagem={mensagens.curso(c.nome)} variante="claro">
            Falar no WhatsApp
          </BotaoWhatsApp>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <p className="sobretitulo">Conheça também</p>
          <h2 className="titulo-secao">Outros cursos</h2>
          <ul className="outros-tratamentos">
            {outros.map((o) => (
              <li key={o.slug}>
                <Link href={rotaCurso(o.slug)}>
                  <span className="outros-nome">{o.nome}</span>
                  <span className="outros-descricao">{o.resumo}</span>
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
