import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import Seta from "@/components/Seta";
import Destaque, { semDestaque } from "@/components/Destaque";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import VideoAtendimento from "@/components/VideoAtendimento";
import ProcedimentosHome from "@/components/ProcedimentosHome";
import ConsultaPassos from "@/components/ConsultaPassos";
import {
  mensagens,
  credenciais,
  perguntas,
  procedimentos,
  rotaProcedimento,
} from "@/lib/site";

const passos = [
  { titulo: "Avaliação Pessoal", texto: "Momento em que a Dra. Déborah irá lhe analisar de perto, ver sua pele e ouvir suas queixas.", foto: "/images/servicos/foto-bioestimuladores.webp" },
  { titulo: "Cuidados e Rotina", texto: "É feita a indicação dos melhores tratamentos e rotinas para manter a melhor saúde da pele e bem-estar.", foto: "/images/home/hero.webp" },
  { titulo: "Protocolos de tratamento", texto: "Aqui a Dra. Déborah recomenda o tratamento ideal e personalizado a depender do seu caso.", foto: "/images/servicos/foto-skinbooster.webp" },
  { titulo: "Realização", texto: "Após a avaliação e atendimento, os procedimentos são realizados na Clínica e acompanhados por especialistas de cada área.", foto: "/images/servicos/video-capa.jpg" },
];

// Galeria única de antes e depois: cada foto leva à página do tratamento
const resultados = [
  { src: "botox-1", tratamento: "botox", alt: "Antes e depois de toxina botulínica na testa", w: 660, h: 845 },
  { src: "labial-1", tratamento: "preenchimento-labial", alt: "Antes e depois de preenchimento labial, de frente", w: 562, h: 665 },
  { src: "peeling-3", tratamento: "peelings", alt: "Antes e depois de peeling: lateral do rosto", w: 960, h: 992 },
  { src: "labial-2", tratamento: "preenchimento-labial", alt: "Antes e depois de preenchimento labial, de perfil", w: 703, h: 520 },
  { src: "botox-2", tratamento: "botox", alt: "Antes e depois de botox: linhas da testa", w: 1080, h: 1292 },
  { src: "peeling-2", tratamento: "peelings", alt: "Antes e depois de peeling: testa", w: 960, h: 1280 },
  { src: "labial-3", tratamento: "preenchimento-labial", alt: "Antes e depois de preenchimento labial, de perfil deitado", w: 1080, h: 1440 },
];

// Perguntas frequentes como dados estruturados para o Google
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: perguntas.map((p) => ({
    "@type": "Question",
    name: p.pergunta,
    acceptedAnswer: { "@type": "Answer", text: semDestaque(p.resposta) },
  })),
};

const nomeDe = (slug: string) => procedimentos.find((p) => p.slug === slug)?.nome ?? "";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero hero-curva">
        <Image src="/images/home/hero.webp" alt="" fill priority sizes="100vw" className="hero-fundo" />
        <div className="hero-conteudo">
          <Logo variante="completo" className="hero-logo" />
          <h1 className="hero-titulo">
            Atendimento especializado em <em>estética facial e corporal</em>
          </h1>
          <div className="hero-acoes">
            <BotaoWhatsApp mensagem={mensagens.agendar} variante="claro">
              Agendar avaliação
            </BotaoWhatsApp>
            <Link href="/tratamentos-esteticos" className="botao botao-contorno-claro">
              Conhecer tratamentos
              <Seta />
            </Link>
          </div>
          <p className="hero-avaliacao">
            <span aria-hidden="true">★★★★★</span>
            <span>Avaliação 4.9/5</span>
          </p>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="secao quem-somos">
        <div className="container quem-somos-grade quem-somos-grade2">
          <div className="quem-somos-texto">
            <p className="sobretitulo">Quem somos</p>
            <h2 className="titulo-nome">
              Dra. <strong>Déborah</strong> Carvalho
            </h2>
            <p>
              Déborah Carvalho é <strong>fisioterapeuta especializada em saúde, estética e bem-estar</strong>, com formação em
              Traumato-Ortopedia, Dermato Funcional e Cosmetologia. Com <strong>residência em Harmonização Facial</strong>, alia
              conhecimento técnico a um olhar estético para oferecer <strong>resultados naturais e personalizados</strong>. Há mais de 6
              anos à frente de sua clínica em Caxias, se destaca pelo atendimento acolhedor e pelos resultados que
              promovem autoestima e qualidade de vida.
            </p>
            <dl className="credenciais">
              {credenciais.map((c) => (
                <div key={c.rotulo}>
                  <dt>{c.valor}</dt>
                  <dd>{c.rotulo}</dd>
                </div>
              ))}
            </dl>
            <BotaoWhatsApp mensagem={mensagens.agendar}>Agendar Atendimento</BotaoWhatsApp>
          </div>
          <div className="quem-somos-foto quem-somos-foto2">
            <Image
              src="/images/home/quem-somos-reforcada.webp"
              alt="Dra. Déborah Carvalho com uniforme da clínica, segurando uma seringa"
              width={1200}
              height={864}
              sizes="(max-width: 900px) 100vw, 60vw"
            />
          </div>
        </div>
      </section>

      {/* A DOUTORA EM ATENDIMENTO (vídeo em 3:4 com fundo vivo) */}
      <section className="secao atendimento2">
        <div className="container atendimento2-grade">
          <VideoAtendimento />
          <div className="atendimento2-texto">
            <p className="sobretitulo">Por dentro da clínica</p>
            <h2 className="titulo-secao">
              A Dra. Déborah em atendimento
            </h2>
            <p>Resultados naturais e sofisticados que realçam sua beleza com harmonia e segurança.</p>
            <ul className="atendimento2-pontos">
              <li>Avaliação feita exclusivamente pela Dra. Déborah</li>
              <li>Atendimento presencial em Caxias-MA</li>
              <li>Tratamento ideal e personalizado para o seu caso</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAIXA PROCEDIMENTOS: recriação da arte do site atual (fotos reais + degradê), com texto real */}
      <section className="faixa-arte">
        <div className="faixa-arte-fotos" aria-hidden="true">
          <div>
            <Image src="/images/home/atendimento-1.webp" alt="" fill sizes="(max-width: 800px) 50vw, 32vw" />
          </div>
          <div>
            <Image src="/images/home/atendimento-2.webp" alt="" fill sizes="(max-width: 800px) 50vw, 32vw" />
          </div>
        </div>
        <div className="container faixa-arte-texto">
          <p className="sobretitulo">Tratamentos</p>
          <h2>Procedimentos</h2>
          <p>
            Tratamentos estéticos completos para combater os sinais do envelhecimento da pele, como flacidez, manchas e
            perda de firmeza, com foco em <strong>resultados naturais e duradouros</strong>. Cada procedimento é realizado de forma
            personalizada, unindo tecnologia e conhecimento para valorizar sua beleza natural e elevar sua autoestima.
          </p>
        </div>
      </section>

      {/* LISTA DE TRATAMENTOS (prévia da foto ao passar o mouse) */}
      <section className="secao">
        <ProcedimentosHome>
          <Link href="/tratamentos-esteticos" className="botao botao-contorno">
            Ver todos os tratamentos
            <Seta />
          </Link>
        </ProcedimentosHome>
      </section>

      {/* RESULTADOS (galeria única de antes e depois) */}
      <section className="secao resultados-home">
        <div className="container">
          <div className="resultados-home-cabeca">
            <div>
              <p className="sobretitulo">Antes e depois</p>
              <h2 className="titulo-secao">
                Resultados reais
              </h2>
            </div>
          </div>
          <ul className="resultados-home-galeria">
            {resultados.map((r) => (
              <li key={r.src}>
                <Link href={rotaProcedimento(r.tratamento)}>
                  <Image src={`/images/resultados/${r.src}.webp`} alt={r.alt} width={r.w} height={r.h} sizes="(max-width: 700px) 100vw, 380px" />
                  <span className="resultados-home-etiqueta">{nomeDe(r.tratamento)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AVALIAÇÃO: seção presa na tela, passos chegando pela direita */}
      <ConsultaPassos passos={passos}>
        <p className="sobretitulo">Sua primeira consulta</p>
        <h2 className="titulo-secao">
          Como funciona a avaliação na Clínica Déborah Carvalho?
        </h2>
        <p>
          Todas as avaliações ocorrem de forma presencial em Caxias-MA,{" "}
          <strong>exclusivamente realizadas pela Dra. Déborah Carvalho</strong>.
        </p>
        <BotaoWhatsApp mensagem={mensagens.agendar}>Agendar avaliação</BotaoWhatsApp>
      </ConsultaPassos>

      {/* PERGUNTAS FREQUENTES */}
      <section className="secao perguntas">
        <div className="container perguntas-grade">
          <div>
            <p className="sobretitulo">Dúvidas</p>
            <h2 className="titulo-secao">
              Perguntas frequentes
            </h2>
          </div>
          <div className="perguntas-lista">
            {perguntas.map((p) => (
              <details key={p.pergunta}>
                <summary>{p.pergunta}</summary>
                <p>
                  <Destaque texto={p.resposta} />
                </p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      {/* CONVITE: card claro com a foto sobre um arco e os contatos */}
      <section className="secao convite2-secao">
        <div className="container">
          <div className="convite2">
            <div className="convite2-foto">
              <Image
                src="/images/home/dra-deborah.webp"
                alt="Dra. Déborah Carvalho sorrindo, de braços cruzados"
                width={1000}
                height={1230}
                sizes="(max-width: 800px) 80vw, 420px"
              />
            </div>
            <div className="convite2-texto">
              <p className="sobretitulo">Atendimento exclusivo</p>
              <h2 className="titulo-secao">
                Agendar Avaliação
              </h2>
              <p>
                Agende agora sua avaliação personalizada e descubra como nossos tratamentos de estética e bem-estar
                podem realçar sua beleza de forma natural, sem exageros e sem procedimentos invasivos.
              </p>
              <p>
                Aqui, cada detalhe é pensado para valorizar sua identidade, com <strong>resultados reais, sutis e harmônicos</strong> —
                sempre com segurança e cuidado profissional.
              </p>
              <div className="convite2-acoes">
                <BotaoWhatsApp mensagem={mensagens.agendar}>Agendar Avaliação</BotaoWhatsApp>
                <Link href="/localizacao-clinica-facil-de-encontrar" className="link-sublinhado">
                  Como chegar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
