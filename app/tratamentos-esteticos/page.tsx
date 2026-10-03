import type { Metadata } from "next";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import CarrosselBanners from "@/components/CarrosselBanners";
import ArcoTratamentos from "@/components/ArcoTratamentos";
import GradeTratamentos from "@/components/GradeTratamentos";
import { procedimentos, categorias, mensagens } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tratamentos Estéticos na Clínica Déborah Carvalho",
  description:
    "Botox, skinbooster, bioestimuladores, peelings, fios PDO, preenchimento labial, microagulhamento e limpeza de pele profunda em Caxias-MA. Procedimentos personalizados para realçar sua beleza natural.",
  alternates: { canonical: "/tratamentos-esteticos" },
};

export default function Servicos() {
  return (
    <>
      {/* A página abre direto no carrossel; o H1 fica só para o Google e leitores de tela */}
      <h1 className="sr-only">Tratamentos Estéticos com naturalidade e sofisticação</h1>

      <CarrosselBanners />

      {categorias.map((c, ci) => {
        const itens = procedimentos.filter((p) => p.categoria === c.id);
        return (
          <section key={c.id} className={`secao menu-categoria ${ci % 2 ? "menu-categoria-areia" : ""}`}>
            <div className="container">
              <div className="menu-cabeca">
                <h2 className="titulo-secao">{c.titulo}</h2>
                <span className="menu-contagem">{String(itens.length).padStart(2, "0")} tratamentos</span>
              </div>
              {/* Até 3 tratamentos: cards simples lado a lado; acima disso, o arco */}
              {itens.length <= 3 ? <GradeTratamentos itens={itens} /> : <ArcoTratamentos itens={itens} rotulo={c.titulo} />}
            </div>
          </section>
        );
      })}


      <section className="secao resultados">
        <div className="container resultados-grade">
          <div>
            <p className="sobretitulo">Na prática</p>
            <h2 className="titulo-secao">Resultados</h2>
            <p>Resultados naturais e sofisticados que realçam sua beleza com harmonia e segurança.</p>
          </div>
          <div className="resultados-midia">
            <video
              controls
              muted
              playsInline
              preload="none"
              poster="/images/servicos/video-capa.jpg"
              aria-label="Vídeo da Dra. Déborah realizando um procedimento na clínica"
            >
              <source src="/videos/atendimento.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="chamada">
        <div className="container">
          <p className="sobretitulo">Avaliação personalizada</p>
          <h2>
            Não sabe qual tratamento é o ideal para você? <em>A Dra. Déborah indica na avaliação.</em>
          </h2>
          <BotaoWhatsApp mensagem={mensagens.agendar} variante="claro">
            Agendar avaliação
          </BotaoWhatsApp>
        </div>
      </section>
    </>
  );
}
