import type { Metadata } from "next";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import { site, enderecoCompleto, mensagens } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clínica Déborah Carvalho: Clínica Fácil de Encontrar para melhor lhe atender",
  description:
    "A Clínica Déborah Carvalho fica na R. Benedito Leite, 663, Centro de Caxias-MA. Veja o mapa e o horário de atendimento.",
  alternates: { canonical: "/localizacao-clinica-facil-de-encontrar" },
};

const mapa = `https://www.google.com/maps?q=${encodeURIComponent(enderecoCompleto)}&output=embed`;

export default function Localizacao() {
  return (
    <section className="secao localizacao">
      <div className="container">
        <p className="sobretitulo">Como chegar</p>
        <h1 className="titulo-secao">Localização</h1>
        <p className="localizacao-intro">
          Estamos <strong>no coração da cidade</strong>, com fácil acesso e estacionamento próximo para sua comodidade.
        </p>

        <div className="mapa">
          <iframe src={mapa} title="Mapa da Clínica Déborah Carvalho" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>

        <div className="localizacao-grade">
          <div>
            <h2>Endereço</h2>
            <address>{enderecoCompleto}</address>
            <BotaoWhatsApp mensagem={mensagens.agendar}>Agendar Avaliação</BotaoWhatsApp>
          </div>
          <div>
            <h2>Horário</h2>
            <dl className="horario">
              {site.horario.map((h) => (
                <div key={h.dia}>
                  <dt>{h.dia}</dt>
                  <dd>{h.horas}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
