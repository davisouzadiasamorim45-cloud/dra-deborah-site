"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Passo = { titulo: string; texto: string; foto: string };

/**
 * "Sua primeira consulta": a seção fica presa na tela enquanto se rola, e os passos chegam um a um
 * pela direita, empilhando sobre o anterior (que fica embaixo, um pouco menor). O progresso vem da
 * posição da seção na rolagem; o CSS faz o resto a partir de --entrada e --profundidade de cada card.
 * Celular e movimento reduzido: lista simples (ver .consulta-pin no CSS).
 */
export default function ConsultaPassos({ passos, children }: { passos: Passo[]; children: React.ReactNode }) {
  const secao = useRef<HTMLElement>(null);
  const [progresso, setProgresso] = useState(0);
  const n = passos.length;

  useEffect(() => {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const el = secao.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const percurso = r.height - window.innerHeight;
      const p = percurso > 0 ? Math.min(Math.max(-r.top / percurso, 0), 1) : 0;
      setProgresso(p * (n - 1));
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, [n]);

  const limitar = (v: number, max: number) => Math.min(Math.max(v, 0), max);

  return (
    <section ref={secao} className="consulta-pin" style={{ "--passos": n } as CSSProperties}>
      <div className="consulta-fixa">
        <div className="container consulta-pin-grade">
          <div className="consulta-pin-cabeca">
            {children}
          </div>
          <ol className="consulta-baralho">
            {passos.map((p, i) => {
              // entrada: 0 = fora, à direita; 1 = no lugar. O primeiro já começa no lugar.
              const entrada = i === 0 ? 1 : limitar(progresso - (i - 1), 1);
              // profundidade: quantos cards já estão por cima deste
              const profundidade = limitar(progresso - i, n - 1 - i);
              return (
                <li
                  key={p.titulo}
                  className={`consulta-card consulta-card-${i + 1}`}
                  style={{ "--entrada": entrada, "--profundidade": profundidade, zIndex: i + 1 } as CSSProperties}
                >
                  <div className="consulta-card-conteudo">
                  <span className="consulta-card-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="consulta-card-corpo">
                    <h3>{p.titulo}</h3>
                    <p>{p.texto}</p>
                  </div>
                  <span className="consulta-card-progresso" aria-hidden="true">
                    {passos.map((_, j) => (
                      <span key={j} className={j <= i ? "cheio" : ""} />
                    ))}
                  </span>
                  </div>
                  <div className="consulta-card-foto">
                    <Image src={p.foto} alt="" fill sizes="(max-width: 860px) 90vw, 300px" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
