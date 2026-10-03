import Logo from "./Logo";
import { IconeInstagram, IconeWhatsApp } from "./Icones";
import { site, enderecoCompleto, whatsappLink, mensagens } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape-grade">
        <div className="rodape-marca">
          <Logo cor="branco" />
          <p className="rodape-marca-nome">
            Déborah
            <br />
            Carvalho
          </p>
        </div>

        <div className="rodape-contato">
          <h2 className="rodape-titulo">Endereço</h2>
          <address>{enderecoCompleto}</address>
          <a className="rodape-telefone" href={whatsappLink(mensagens.agendar)} target="_blank" rel="noopener noreferrer">
            {site.telefone}
          </a>
          <p>Estamos prontos para atender você com carinho</p>
          <div className="rodape-social">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <IconeInstagram />
            </a>
            <a href={whatsappLink(mensagens.agendar)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <IconeWhatsApp />
            </a>
          </div>
          <p className="rodape-copy">
            Copyright © {new Date().getFullYear()} Déborah Carvalho. Todos os direitos reservados.
          </p>
        </div>

        <div>
          <h2 className="rodape-titulo">Suporte</h2>
          <ul className="rodape-links">
            <li>
              <a href={whatsappLink(mensagens.agendar)} target="_blank" rel="noopener noreferrer">
                Atendimento ao Cliente
              </a>
            </li>
            <li>
              <a href={whatsappLink(mensagens.agendar)} target="_blank" rel="noopener noreferrer">
                Contato WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
