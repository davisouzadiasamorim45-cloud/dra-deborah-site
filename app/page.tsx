import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import Seta from "@/components/Seta";
import Destaque, { semDestaque } from "@/components/Destaque";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import { mensagens, credenciais, perguntas, buscarProcedimento, rotaProcedimento } from "@/lib/site";

const texto = (slug: string) => <Destaque texto={buscarProcedimento(slug)?.texto ?? ""} />;

const passos = [
  { titulo: "Avaliação Pessoal", texto: "Momento em que a Dra. Déborah irá lhe analisar de perto, ver sua pele e ouvir suas queixas." },
  { titulo: "Cuidados e Rotina", texto: "É feita a indicação dos melhores tratamentos e rotinas para manter a melhor saúde da pele e bem-estar." },
  { titulo: "Protocolos de tratamento", texto: "Aqui a Dra. Déborah recomenda o tratamento ideal e personalizado a depender do seu caso." },
  { titulo: "Realização", texto: "Após a avaliação e atendimento, os procedimentos são realizados na Clínica e acompanhados por especialistas de cada área." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: perguntas.map((p) => ({
    "@type": "Question",
    name: p.pergunta,
    acceptedAnswer: { "@type": "Answer", text: semDestaque(p.resposta) },
  })),
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
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
        <div className="container quem-somos-grade">
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
          <div className="quem-somos-foto">
            <Image
              src="/images/home/quem-somos.webp"
              alt="Dra. Déborah Carvalho com uniforme da clínica, segurando uma seringa"
              width={1200}
              height={864}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* PROCEDIMENTOS */}
      <section className="faixa-procedimentos">
        <div className="container faixa-conteudo">
          <p className="sobretitulo">Tratamentos</p>
          <h2>
            <em>Procedimentos</em>
          </h2>
          <span className="filete" aria-hidden="true" />
          <p>
            Tratamentos estéticos completos para combater os sinais do envelhecimento da pele, como flacidez, manchas e
            perda de firmeza, com foco em <strong>resultados naturais e duradouros</strong>. Cada procedimento é realizado de forma
            personalizada, unindo tecnologia e conhecimento para valorizar sua beleza natural e elevar sua autoestima.
          </p>
        </div>
      </section>

      <section className="secao procedimento">
        <div className="container container-estreito">
          <h2 className="procedimento-titulo">Peeling</h2>
          <p className="procedimento-texto">{texto("peelings")}</p>
          <div className="galeria galeria-2">
            <Image src="/images/resultados/peeling-3.webp" alt="Antes e depois de peeling: lateral do rosto" width={960} height={992} sizes="(max-width: 700px) 100vw, 400px" />
            <Image src="/images/resultados/peeling-2.webp" alt="Antes e depois de peeling: testa" width={960} height={1280} sizes="(max-width: 700px) 100vw, 400px" />
          </div>
          <BotaoWhatsApp mensagem={mensagens.sobre("o Peeling")} variante="contorno">
            Quero saber mais sobre o Peeling
          </BotaoWhatsApp>
          <Link href={rotaProcedimento("peelings")} className="link-sublinhado">
            Conhecer o tratamento
          </Link>
        </div>
      </section>

      <section className="secao procedimento">
        <div className="container container-estreito">
          <h2 className="procedimento-titulo">Botox</h2>
          <p className="procedimento-texto">{texto("botox")}</p>
          <div className="galeria galeria-2">
            <div className="galeria-pilha">
              <div className="galeria-rotulo" data-rotulo="Antes">
                <Image src="/images/resultados/botox-antes.webp" alt="Testa antes da aplicação de toxina botulínica" width={660} height={433} sizes="(max-width: 700px) 100vw, 400px" />
              </div>
              <div className="galeria-rotulo" data-rotulo="Depois">
                <Image src="/images/resultados/botox-depois.webp" alt="Testa depois da aplicação de toxina botulínica" width={660} height={317} sizes="(max-width: 700px) 100vw, 400px" />
              </div>
            </div>
            <Image src="/images/resultados/botox-2.webp" alt="Antes e depois de botox: linhas da testa" width={1080} height={1292} sizes="(max-width: 700px) 100vw, 400px" />
          </div>
          <BotaoWhatsApp mensagem={mensagens.sobre("o Botox")} variante="contorno">
            Quero saber mais sobre o Botox
          </BotaoWhatsApp>
          <Link href={rotaProcedimento("botox")} className="link-sublinhado">
            Conhecer o tratamento
          </Link>
        </div>
      </section>

      <section className="secao procedimento procedimento-ultimo">
        <div className="container container-estreito">
          <h2 className="procedimento-titulo">Preenchimento Labial</h2>
          <p className="procedimento-texto">{texto("preenchimento-labial")}</p>
          <div className="galeria galeria-3">
            <Image src="/images/resultados/labial-1.webp" alt="Antes e depois de preenchimento labial, de frente" width={562} height={665} sizes="(max-width: 700px) 100vw, 430px" />
            <Image src="/images/resultados/labial-3.webp" alt="Antes e depois de preenchimento labial, de perfil deitado" width={1080} height={1440} sizes="(max-width: 700px) 100vw, 430px" />
            <Image src="/images/resultados/labial-2.webp" alt="Antes e depois de preenchimento labial, de perfil" width={703} height={520} sizes="(max-width: 700px) 100vw, 430px" />
          </div>
          <BotaoWhatsApp mensagem={mensagens.sobre("o Preenchimento Labial")} variante="contorno">
            Quero saber mais sobre o Preenchimento
          </BotaoWhatsApp>
          <Link href={rotaProcedimento("preenchimento-labial")} className="link-sublinhado">
            Conhecer o tratamento
          </Link>
        </div>
      </section>

      {/* AVALIAÇÃO */}
      <section className="secao avaliacao">
        <div className="container">
          <p className="sobretitulo">Sua primeira consulta</p>
          <h2 className="titulo-secao avaliacao-titulo">
            Como funciona a <em>avaliação</em> na Clínica Déborah Carvalho?
          </h2>
          <p className="avaliacao-intro">
            Todas as avaliações ocorrem de forma presencial em Caxias-MA,{" "}
            <strong>exclusivamente realizadas pela Dra. Déborah Carvalho</strong>.
          </p>
          <ol className="passos">
            {passos.map((p, i) => (
              <li key={p.titulo}>
                <span className="passo-numero" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PERGUNTAS FREQUENTES */}
      <section className="secao perguntas">
        <div className="container perguntas-grade">
          <div>
            <p className="sobretitulo">Dúvidas</p>
            <h2 className="titulo-secao">
              Perguntas <em>frequentes</em>
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

      {/* CONVITE */}
      <section className="secao convite-secao">
        <div className="container">
          <div className="convite">
            <Image
              src="/images/home/dra-deborah.webp"
              alt="Dra. Déborah Carvalho sorrindo, de braços cruzados"
              width={1000}
              height={1230}
              sizes="(max-width: 800px) 45vw, 280px"
              className="convite-foto"
            />
            <div className="convite-texto">
              <p className="sobretitulo">Atendimento exclusivo</p>
              <h2>
                Agendar <em>Avaliação</em>
              </h2>
              <p>
                Agende agora sua avaliação personalizada e descubra como nossos tratamentos de estética e bem-estar
                podem realçar sua beleza de forma natural, sem exageros e sem procedimentos invasivos.
              </p>
              <p>
                Aqui, cada detalhe é pensado para valorizar sua identidade, com <strong>resultados reais, sutis e harmônicos</strong> —
                sempre com segurança e cuidado profissional.
              </p>
              <BotaoWhatsApp mensagem={mensagens.agendar} variante="claro">
                Agendar Avaliação
              </BotaoWhatsApp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
