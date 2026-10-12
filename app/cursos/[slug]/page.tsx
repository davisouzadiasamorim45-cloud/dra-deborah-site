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
    title: `Curso de ${c.nome}`,
    description: semDestaque(`${c.resumo} ${c.intro[0]}`),
    alternates: { canonical: rotaCurso(c.slug) },
    openGraph: { images: [c.foto.src] },
  };
}

const doisDigitos = (n: number) => String(n).padStart(2, "0");

export default async function PaginaCurso({ params }: PageProps<"/cursos/[slug]">) {
  const { slug } = await params;
  const c = buscarCurso(slug);
  if (!c) notFound();

  const mensagem = mensagens.curso(c.nome);
  const botaoInscricao = c.botoes?.inscricao ?? "Quero participar";
  const botaoVaga = c.botoes?.vaga ?? "Falar no WhatsApp";
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

      {/* Topo: foto, título e apresentação */}
      <section className="secao curso-topo">
        <div className="container curso-grade">
          <div className="curso-foto">
            <Image src={c.foto.src} alt={c.foto.alt} width={c.foto.width} height={c.foto.height} sizes="(max-width: 800px) 90vw, 440px" priority />
          </div>
          <div className="curso-texto">
            <p className="sobretitulo">Curso</p>
            <h1 className="titulo-secao">{c.nome}</h1>
            <p className="curso-resumo">{c.resumo}</p>
            {c.intro.map((t) => (
              <p key={t}>
                <Destaque texto={t} />
              </p>
            ))}
            {c.destaque && <p className="curso-destaque">{c.destaque}</p>}
            <BotaoWhatsApp mensagem={mensagem}>{botaoInscricao}</BotaoWhatsApp>
          </div>
        </div>
      </section>

      {c.sobre && (
        <section className="secao curso-faixa-areia">
          <div className="container">
            <div className="curso-duas-colunas">
              <h2 className="titulo-secao">Sobre o curso</h2>
              <div className="curso-paragrafos">
                <p className="curso-abertura">
                  <Destaque texto={c.sobre[0]} />
                </p>
                {c.sobre.slice(1).map((t) => (
                  <p key={t}>
                    <Destaque texto={t} />
                  </p>
                ))}
              </div>
            </div>
            {c.etapas && (
              <ol className="curso-etapas" aria-label="Etapas do procedimento">
                {c.etapas.map((e, i) => (
                  <li key={e}>
                    <span className="curso-etapa-numero">{doisDigitos(i + 1)}</span>
                    <span className="curso-etapa-nome">{e}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      )}

      {/* Conteúdo: módulos em sanfona (o primeiro aberto) ou lista simples */}
      <section className="secao">
        <div className="container curso-duas-colunas">
          <div className="curso-conteudo-cabeca">
            <p className="sobretitulo">Conteúdo</p>
            <h2 className="titulo-secao">O que você vai aprender</h2>
            {c.modulos && <p className="curso-contagem">{c.modulos.length} módulos</p>}
          </div>
          {c.modulos ? (
            <div className="modulos">
              {c.modulos.map((m, i) => (
                <details key={m.titulo} open={i === 0}>
                  <summary>
                    <span className="modulo-numero">Módulo {doisDigitos(i + 1)}</span>
                    <span className="modulo-titulo">{m.titulo}</span>
                  </summary>
                  <ul>
                    {m.itens.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          ) : (
            <ul className="atendimento2-pontos">
              {c.conteudo?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="secao curso-faixa-areia">
        <div className={`container ${c.porQue ? "curso-publico" : ""}`}>
          <div className="curso-paragrafos">
            <h2 className="curso-subtitulo">Para quem é este curso?</h2>
            {c.paraQuem.map((t) => (
              <p key={t}>
                <Destaque texto={t} />
              </p>
            ))}
          </div>
          {c.porQue && (
            <div>
              <h2 className="curso-subtitulo">Por que fazer este curso?</h2>
              <ul className="atendimento2-pontos curso-motivos">
                {c.porQue.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {c.diferencial && (
        <section className="secao curso-diferencial">
          <div className="container">
            <p className="sobretitulo">O diferencial do aprendizado</p>
            <p className="curso-diferencial-frase">
              <Destaque texto={c.diferencial[0]} />
            </p>
            {c.diferencial.slice(1).map((t) => (
              <p key={t} className="curso-diferencial-texto">
                <Destaque texto={t} />
              </p>
            ))}
          </div>
        </section>
      )}

      <section className="secao curso-faixa-areia">
        <div className={`container ${c.requisitos ? "curso-info" : "curso-info-unica"}`}>
          {c.requisitos && (
            <div className="curso-paragrafos">
              <h2 className="curso-subtitulo">O que você precisa para começar?</h2>
              {c.requisitos.map((t) => (
                <p key={t}>
                  <Destaque texto={t} />
                </p>
              ))}
            </div>
          )}
          <aside className="tratamento-ficha" aria-label={`Informações do curso de ${c.nome}`}>
            <p className="tratamento-ficha-nome">Informações do curso</p>
            <dl className="curso-ficha">
              {c.ficha.map((f) => (
                <div key={f.rotulo}>
                  <dt>{f.rotulo}</dt>
                  <dd>{f.valor}</dd>
                </div>
              ))}
              <div>
                <dt>Modalidade, carga horária, certificado e investimento</dt>
                <dd>Informados pelo WhatsApp</dd>
              </div>
            </dl>
            <BotaoWhatsApp mensagem={mensagem}>{botaoInscricao}</BotaoWhatsApp>
          </aside>
        </div>
      </section>

      <section className="chamada">
        <div className="container">
          <p className="sobretitulo">Próximas turmas</p>
          {c.final ? (
            <>
              <h2>{c.final.titulo}</h2>
              {c.final.textos.map((t) => (
                <p key={t} className="chamada-texto">
                  {t}
                </p>
              ))}
            </>
          ) : (
            <h2>
              Garanta sua vaga no curso de <em>{c.nome}.</em>
            </h2>
          )}
          <BotaoWhatsApp mensagem={mensagem} variante="claro">
            {botaoVaga}
          </BotaoWhatsApp>
        </div>
        {c.aviso && <p className="curso-aviso">{c.aviso}</p>}
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
