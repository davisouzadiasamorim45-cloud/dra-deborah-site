"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO = "/videos/atendimento.mp4";
const CAPA = "/images/servicos/video-capa.jpg";

/**
 * Vídeo da doutora em atendimento: toca sozinho, mudo e em loop (3:4). Atrás dele, uma cópia
 * desfocada do mesmo vídeo funciona como fundo vivo ("modo ambiente"). Com movimento reduzido,
 * os dois ficam pausados.
 */
export default function VideoAtendimento() {
  const principal = useRef<HTMLVideoElement>(null);
  const ambiente = useRef<HTMLVideoElement>(null);
  const [mudo, setMudo] = useState(true);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      principal.current?.pause();
      ambiente.current?.pause();
    }
  }, []);

  function alternarPausa() {
    const v = principal.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      ambiente.current?.play();
    } else {
      v.pause();
      ambiente.current?.pause();
    }
  }

  function alternarSom() {
    const v = principal.current;
    if (!v) return;
    v.muted = !v.muted;
    setMudo(v.muted);
  }

  return (
    <div className="video-atendimento">
      <video ref={ambiente} className="video-ambiente" src={VIDEO} poster={CAPA} autoPlay muted loop playsInline aria-hidden="true" tabIndex={-1} />
      <div className="video-moldura">
        <video
          ref={principal}
          src={VIDEO}
          poster={CAPA}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Vídeo da Dra. Déborah realizando um procedimento na clínica"
          onClick={alternarPausa}
          onPlay={() => setPausado(false)}
          onPause={() => setPausado(true)}
        />
        <div className="video-controles">
          <button type="button" onClick={alternarPausa} aria-label={pausado ? "Reproduzir vídeo" : "Pausar vídeo"}>
            {pausado ? <IconePlay /> : <IconePausa />}
          </button>
          <button type="button" onClick={alternarSom} aria-label={mudo ? "Ativar som" : "Desativar som"}>
            {mudo ? <IconeMudo /> : <IconeSom />}
          </button>
        </div>
      </div>
    </div>
  );
}

const svg = { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const IconePlay = () => (<svg {...svg}><path d="M7 5l12 7-12 7z" fill="currentColor" /></svg>);
const IconePausa = () => (<svg {...svg}><path d="M8 5v14M16 5v14" /></svg>);
const IconeMudo = () => (<svg {...svg}><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 9l4 6M21 9l-4 6" /></svg>);
const IconeSom = () => (<svg {...svg}><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 8a5 5 0 010 8M19.5 5.5a8.5 8.5 0 010 13" /></svg>);
