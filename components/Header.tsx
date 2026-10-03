"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import BotaoWhatsApp from "./BotaoWhatsApp";
import { IconeInstagram, IconeWhatsApp } from "./Icones";
import { site, whatsappLink, mensagens } from "@/lib/site";

const links = [
  { href: "/", rotulo: "Início" },
  { href: "/tratamentos-esteticos", rotulo: "Serviços" },
  { href: "/localizacao-clinica-facil-de-encontrar", rotulo: "Localização" },
];

export default function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Nas páginas com hero (Home e prévia), o cabeçalho fica transparente sobre a foto até a página rolar.
  const sobreHero = ["/", "/previa-home"].includes(pathname) && !rolou && !aberto;

  return (
    <header className={`cabecalho ${sobreHero ? "cabecalho-sobre" : ""}`}>
      <div className="container cabecalho-conteudo">
        <Link href="/" className="cabecalho-logo" aria-label="Déborah Carvalho, página inicial">
          <Logo prioridade />
          <Logo cor="branco" />
        </Link>

        <button
          type="button"
          className="menu-botao"
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto((v) => !v)}
        >
          <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
          <span className="menu-barras" aria-hidden="true" />
        </button>

        <nav id="menu-principal" className={`menu ${aberto ? "menu-aberto" : ""}`} aria-label="Principal">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  onClick={() => setAberto(false)}
                >
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-social">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <IconeInstagram />
            </a>
            <a href={whatsappLink(mensagens.agendar)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <IconeWhatsApp />
            </a>
          </div>
          <BotaoWhatsApp mensagem={mensagens.agendar} seta={false} className="botao-cabecalho">
            Agendar avaliação
          </BotaoWhatsApp>
        </nav>
      </div>
    </header>
  );
}
