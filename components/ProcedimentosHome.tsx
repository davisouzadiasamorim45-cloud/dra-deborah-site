"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categorias, procedimentos, rotaProcedimento } from "@/lib/site";

/**
 * Seção "Procedimentos" da Home: texto à esquerda com uma moldura que mostra a foto do tratamento
 * sob o mouse (ou em foco) na lista da direita. Sem foto, a moldura mostra o monograma e o nome.
 * Em telas de toque (sem mouse), as fotos se alternam sozinhas.
 */
export default function ProcedimentosHome({ children }: { children: React.ReactNode }) {
  const [ativo, setAtivo] = useState(procedimentos[0].slug);
  const atual = procedimentos.find((p) => p.slug === ativo) ?? procedimentos[0];

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const comFoto = procedimentos.filter((p) => p.banner).map((p) => p.slug);
    const timer = setInterval(() => {
      setAtivo((a) => comFoto[(comFoto.indexOf(a) + 1) % comFoto.length]);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container procedimentos-home">
      <div className="procedimentos-home-intro">
        {children}
        <div className="procedimentos-home-moldura" aria-hidden="true">
          {procedimentos.map((p) =>
            p.banner ? (
              <Image
                key={p.slug}
                src={`/images/servicos/foto-${p.slug}.webp`}
                alt=""
                fill
                sizes="(max-width: 800px) 100vw, 520px"
                className={p.slug === atual.slug ? "visivel" : ""}
              />
            ) : (
              <div key={p.slug} className={`procedimentos-home-sem-foto ${p.slug === atual.slug ? "visivel" : ""}`}>
                <Image src="/images/logo/logo-branco.png" alt="" width={732} height={760} />
              </div>
            ),
          )}
          <span className="procedimentos-home-legenda">
            <span>{atual.nome}</span>
            <em>{atual.banner ? atual.banner.titulo.join(" ") : atual.descricao}</em>
          </span>
        </div>
      </div>

      <div className="procedimentos-home-lista">
        {categorias.map((c) => (
          <div key={c.id}>
            <h3>{c.titulo}</h3>
            <ul>
              {procedimentos
                .filter((p) => p.categoria === c.id)
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={rotaProcedimento(p.slug)}
                      className={p.slug === atual.slug ? "ativo" : ""}
                      onMouseEnter={() => setAtivo(p.slug)}
                      onFocus={() => setAtivo(p.slug)}
                    >
                      <span className="procedimentos-home-nome">{p.nome}</span>
                      <span className="procedimentos-home-trilho">
                        <SetaSimples />
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Só a ponta da seta (>): fica colada ao nome e, ao selecionar, corre até a borda direita
function SetaSimples() {
  return (
    <svg className="seta-simples" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
