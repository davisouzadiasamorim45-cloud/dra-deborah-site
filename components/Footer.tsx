import Link from "next/link";
import Logo from "./Logo";
import { IconeInstagram, IconeWhatsApp } from "./Icones";
import { site, whatsappLink, mensagens } from "@/lib/site";

const navegacao = [
  { href: "/", rotulo: "Início" },
  { href: "/tratamentos-esteticos", rotulo: "Serviços" },
  { href: "/cursos", rotulo: "Cursos" },
  { href: "/localizacao-clinica-facil-de-encontrar", rotulo: "Localização" },
];

// @usuario a partir do link do Instagram
const instagram = "@" + site.instagram.replace(/\/$/, "").split("/").pop();

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape-grade">
        <div className="rodape-marca">
          <Link href="/" className="rodape-marca-link" aria-label="Déborah Carvalho, página inicial">
            <Logo cor="branco" />
            <span className="rodape-marca-nome">Déborah Carvalho</span>
          </Link>
          <p>Estamos prontos para atender você com carinho</p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="rodape-titulo">Navegação</h2>
          <ul className="rodape-links">
            {navegacao.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.rotulo}</Link>
              </li>
            ))}
            <li>
              <a href={whatsappLink(mensagens.agendar)} target="_blank" rel="noopener noreferrer">
                Agendar avaliação
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="rodape-titulo">Contato</h2>
          <ul className="rodape-links">
            <li>
              <address>
                {site.endereco.rua}
                <br />
                {site.endereco.cidade} - {site.endereco.uf}, {site.endereco.cep}
              </address>
            </li>
            <li>
              <a href={whatsappLink(mensagens.agendar)} target="_blank" rel="noopener noreferrer">
                WhatsApp {site.telefone}
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                Instagram {instagram}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="rodape-titulo">Horário</h2>
          <ul className="rodape-links">
            <li>Segunda a sexta</li>
            <li>{site.horario[0].horas}</li>
          </ul>
        </div>
      </div>

      <div className="container rodape-base">
        <p>Copyright © {new Date().getFullYear()} Déborah Carvalho. Todos os direitos reservados.</p>
        <div className="rodape-social">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <IconeInstagram />
          </a>
          <a href={whatsappLink(mensagens.agendar)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <IconeWhatsApp />
          </a>
        </div>
      </div>
    </footer>
  );
}
