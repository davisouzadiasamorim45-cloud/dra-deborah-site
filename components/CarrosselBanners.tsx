"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import BannerTratamento from "./BannerTratamento";
import Seta from "./Seta";
import { procedimentos, rotaProcedimento } from "@/lib/site";

const banners = procedimentos.filter((p) => p.banner);

export default function CarrosselBanners() {
  const trilho = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);

  function irPara(indice: number) {
    const el = trilho.current;
    if (!el) return;
    const alvo = (indice + banners.length) % banners.length;
    el.scrollTo({ left: el.clientWidth * alvo, behavior: "smooth" });
  }

  function aoRolar() {
    const el = trilho.current;
    if (!el) return;
    setAtual(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <section className="carrossel" aria-roledescription="carrossel" aria-label="Destaques dos procedimentos">
      <div className="carrossel-trilho" ref={trilho} onScroll={aoRolar}>
        {banners.map((p, i) => (
          <div className="carrossel-slide" key={p.slug} aria-roledescription="slide" aria-label={`${i + 1} de ${banners.length}`}>
            <BannerTratamento procedimento={p} prioridade={i === 0}>
              <Link href={rotaProcedimento(p.slug)} className="botao botao-contorno banner-botao">
                Conhecer o tratamento
                <Seta />
              </Link>
            </BannerTratamento>
          </div>
        ))}
      </div>

      {/* Setas laterais: só o traço, sem círculo */}
      <button type="button" className="carrossel-seta carrossel-anterior" onClick={() => irPara(atual - 1)} aria-label="Banner anterior">
        <Chevron />
      </button>
      <button type="button" className="carrossel-seta carrossel-proximo" onClick={() => irPara(atual + 1)} aria-label="Próximo banner">
        <Chevron />
      </button>

      {/* Linha do tempo de ponta a ponta abaixo do carrossel: trechos já vistos ficam cheios, o atual se
          preenche e, ao terminar, avança. Pausa com o mouse em cima; com movimento reduzido não há troca automática. */}
      <div className="carrossel-linha">
        {banners.map((p, i) => (
          <button
            type="button"
            key={p.slug}
            className={i === atual ? "ativo" : i < atual ? "visto" : ""}
            onClick={() => irPara(i)}
            aria-label={`Ir para o banner ${i + 1}: ${p.nome}`}
            aria-current={i === atual ? "true" : undefined}
          >
            {i === atual && <span key={atual} className="carrossel-progresso" onAnimationEnd={() => irPara(atual + 1)} />}
          </button>
        ))}
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
