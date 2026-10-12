import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import CapaShader, { type FotoCapa } from "@/components/CapaShader";
import Seta from "@/components/Seta";
import { cursos, rotaCurso, mensagens } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cursos de Estética com a Dra. Déborah Carvalho",
  description:
    "Cursos de Limpeza de Pele Profissional, Drenagem Corporal e Hidrolipoclasia não invasiva com a Dra. Déborah Carvalho. Transforme seu interesse pela estética em conhecimento.",
  alternates: { canonical: "/cursos" },
};

// Foto da capa: para trocar, substitua o arquivo public/images/cursos/capa-cursos.webp (de preferência na vertical,
// com pelo menos 1200px de largura). Foco = ponto da foto que fica sempre à vista (0..1 a partir do canto superior esquerdo).
const FOTO_CAPA = "/images/cursos/capa-cursos.webp";
const fotosCapa: FotoCapa[] = [{ src: FOTO_CAPA, foco: [0.5, 0.55], focoCelular: [0.45, 0.5] }];

export default function Cursos() {
  return (
    <>
      <section className="capa-cursos hero-curva">
        {/* Foto estática: reserva sem WebGL ou com movimento reduzido */}
        <Image src={FOTO_CAPA} alt="" fill priority sizes="(max-width: 700px) 100vw, 60vw" className="capa-fundo" />
        <CapaShader fotos={fotosCapa} />
        <div className="container capa-cursos-conteudo">
          <h1>
            Cursos com a <em>Dra. Déborah Carvalho</em>
          </h1>
          <p>
            Transforme seu interesse pela estética em conhecimento para atuar com <strong>mais confiança e profissionalismo</strong>.
          </p>
          <div className="capa-cursos-acoes">
            <a href="#cursos" className="botao botao-claro">
              Conhecer os cursos
              <Seta />
            </a>
            <BotaoWhatsApp mensagem={mensagens.cursos} variante="contorno-claro">
              Falar no WhatsApp
            </BotaoWhatsApp>
          </div>
        </div>
      </section>

      <section id="cursos" className="secao cursos-lista">
        <div className="container">
          <h2 className="titulo-secao">Escolha seu curso</h2>
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
