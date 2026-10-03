"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import BotaoWhatsApp from "./BotaoWhatsApp";
import Destaque from "./Destaque";
import Seta from "./Seta";
import { mensagens, rotaProcedimento, type Procedimento } from "@/lib/site";

// Cards além dessa distância do centro ficam invisíveis: o arco mostra só o miolo
const VISIVEIS = 2;
const LIMIAR_ARRASTO = 48;

/**
 * Tratamentos num semicírculo (adaptado da galeria em arco do site da Noxi): o ativo no centro,
 * maior e escuro; os vizinhos descem pela curva, girando para os lados. A geometria fica no CSS
 * (sin/cos sobre --d, a distância até o ativo); aqui só se decide qual é o ativo.
 */
export default function ArcoTratamentos({ itens, rotulo }: { itens: Procedimento[]; rotulo: string }) {
  const n = itens.length;
  const router = useRouter();
  const [ativo, setAtivo] = useState(0);
  const arrasto = useRef<{ x: number; moveu: boolean } | null>(null);

  // Entrada: os cards nascem juntos embaixo e abrem em leque para a posição no arco
  const [posicionado, setPosicionado] = useState(false);
  const [entrada, setEntrada] = useState(true);
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPosicionado(true));
    });
    const fim = setTimeout(() => setEntrada(false), 1500);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(fim);
    };
  }, []);

  const ir = (delta: number) => setAtivo((a) => (a + delta + n) % n);

  // Menor distância circular até o ativo, entre -n/2 e n/2
  const distancia = (i: number) => {
    let d = i - ativo;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const atual = itens[ativo];
  const frase = (p: Procedimento) => (p.banner ? p.banner.titulo.join(" ") : p.descricao);

  return (
    <div className="arco">
      <div
        className="arco-palco"
        data-entrada={entrada || undefined}
        tabIndex={0}
        role="group"
        aria-roledescription="galeria em arco"
        aria-label={rotulo}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") ir(1);
          if (e.key === "ArrowLeft") ir(-1);
        }}
        onPointerDown={(e) => {
          arrasto.current = { x: e.clientX, moveu: false };
        }}
        onPointerMove={(e) => {
          const a = arrasto.current;
          if (a && !a.moveu && Math.abs(e.clientX - a.x) > LIMIAR_ARRASTO) {
            a.moveu = true;
            ir(e.clientX < a.x ? 1 : -1);
          }
        }}
        onPointerUp={() => {
          // Solta depois do clique, para o clique do card saber que foi arrasto
          setTimeout(() => (arrasto.current = null), 0);
        }}
        onPointerLeave={() => (arrasto.current = null)}
      >
        {itens.map((p, i) => {
          const d = distancia(i);
          const ad = Math.abs(d);
          const estilo = { "--d": d, "--ad": ad, zIndex: 20 - ad } as CSSProperties;
          return (
            <button
              type="button"
              key={p.slug}
              className={`arco-card ${p.banner ? "arco-card-com-foto" : "arco-card-sem-foto"}`}
              data-ativo={d === 0 || undefined}
              data-oculto={ad > VISIVEIS || undefined}
              data-inicio={!posicionado || undefined}
              style={estilo}
              tabIndex={d === 0 ? 0 : -1}
              aria-hidden={ad > VISIVEIS || undefined}
              aria-label={d === 0 ? `Conhecer o tratamento ${p.nome}` : `Ir para ${p.nome}`}
              onClick={() => {
                if (arrasto.current?.moveu) return;
                if (d === 0) router.push(rotaProcedimento(p.slug));
                else setAtivo(i);
              }}
            >
              {p.banner ? (
                <Image src={`/images/servicos/foto-${p.slug}.webp`} alt="" fill sizes="300px" className="arco-card-foto" draggable={false} />
              ) : (
                <Image src="/images/logo/logo-dourado.png" alt="" width={732} height={760} className="arco-card-marca" draggable={false} />
              )}
              <span className="arco-card-texto">
                <span className="arco-card-nome">{p.nome}</span>
                <span className="arco-card-frase">{frase(p)}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Setas nas laterais do arco, na altura dos cards */}
      <button type="button" className="arco-seta arco-seta-anterior" onClick={() => ir(-1)} aria-label="Tratamento anterior">
        <Chevron />
      </button>
      <button type="button" className="arco-seta arco-seta-proxima" onClick={() => ir(1)} aria-label="Próximo tratamento">
        <Chevron />
      </button>

      {/* Informações do tratamento em destaque (o nome já aparece no card; o valor fica só na página do tratamento) */}
      <div className="arco-linha">
        <div className="arco-info" key={atual.slug} aria-live="polite">
          <h3 className="sr-only">{atual.nome}</h3>
          {(atual.texto ?? atual.descricao) && (
            <p className="arco-info-texto">
              <Destaque texto={atual.texto ?? atual.descricao ?? ""} />
            </p>
          )}
          <div className="arco-info-acoes">
            <Link href={rotaProcedimento(atual.slug)} className="botao botao-contorno">
              Conhecer o tratamento
              <Seta />
            </Link>
            <BotaoWhatsApp mensagem={mensagens.sobre(atual.nome)}>Agendar avaliação</BotaoWhatsApp>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
