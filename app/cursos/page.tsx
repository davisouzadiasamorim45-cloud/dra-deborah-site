import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import { cursos, rotaCurso, mensagens } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cursos de Estética com a Dra. Déborah Carvalho",
  description:
    "Cursos de Limpeza de Pele Profunda, Drenagem Corporal e Hidrolipoclasia não invasiva em Caxias-MA, com teoria e prática conduzidas pela Dra. Déborah Carvalho.",
  alternates: { canonical: "/cursos" },
};

export default function Cursos() {
  return (
    <>
      <section className="secao cursos-intro">
        <div className="container">
          <h1 className="titulo-secao">
            Cursos com a <em>Dra. Déborah</em>
          </h1>
          <p>
            Aprenda na prática, dentro da clínica, com quem atende todos os dias. <strong>Teoria e prática supervisionada</strong>{" "}
            para você sair pronta para atender.
          </p>

          <ul className="cursos-cards">
            {cursos.map((c) => (
              <li key={c.slug}>
                <Link href={rotaCurso(c.slug)} className="curso-card">
                  <span className="curso-card-foto">
                    <Image src={c.foto.src} alt={c.foto.alt} width={c.foto.width} height={c.foto.height} sizes="(max-width: 800px) 90vw, 380px" />
                  </span>
                  <span className="curso-card-texto">
                    <span className="curso-card-nome">{c.nome}</span>
                    <span className="curso-card-resumo">{c.resumo}</span>
                    <span className="grade-card-link">
                      Ver detalhes do curso <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chamada">
        <div className="container">
          <p className="sobretitulo">Próximas turmas</p>
          <h2>
            Datas, carga horária e valores <em>pelo WhatsApp.</em>
          </h2>
          <BotaoWhatsApp mensagem={mensagens.cursos} variante="claro">
            Falar sobre os cursos
          </BotaoWhatsApp>
        </div>
      </section>
    </>
  );
}
