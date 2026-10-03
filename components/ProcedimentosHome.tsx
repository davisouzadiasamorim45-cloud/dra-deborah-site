"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Seta from "./Seta";
import { categorias, procedimentos, rotaProcedimento } from "@/lib/site";

/**
 * Seção "Procedimentos" da Home: texto à esquerda com uma moldura que mostra a foto do tratamento
 * sob o mouse (ou em foco) na lista da direita. Sem foto, a moldura mostra o monograma e o nome.
 */
export default function ProcedimentosHome({ children }: { children: React.ReactNode }) {
  const [ativo, setAtivo] = useState(procedimentos[0].slug);
  const atual = procedimentos.find((p) => p.slug === ativo) ?? procedimentos[0];

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
                      <span>{p.nome}</span>
                      <Seta />
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
