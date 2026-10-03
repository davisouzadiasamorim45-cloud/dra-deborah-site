import Image from "next/image";
import type { Procedimento } from "@/lib/site";

type Props = {
  procedimento: Procedimento;
  // Na página do tratamento o nome é o H1; no carrossel de Serviços o título vira H2.
  nivel?: "h1" | "h2";
  prioridade?: boolean;
  children?: React.ReactNode;
};

export default function BannerTratamento({ procedimento: p, nivel = "h2", prioridade = false, children }: Props) {
  const b = p.banner;
  const titulo = b ? b.titulo : [p.nome];
  const Rotulo = nivel === "h1" ? "h1" : "p";
  const Titulo = nivel === "h1" ? "p" : "h2";

  return (
    <div className={`banner ${b ? "" : "banner-sem-foto"}`}>
      <div className="banner-texto">
        <Rotulo className="sobretitulo">{b?.rotulo ?? p.nome}</Rotulo>
        <Titulo className="banner-titulo">
          {titulo.map((linha, i) => (
            <span key={linha}>
              {i > 0 && <br />}
              {i > 0 ? <em>{linha}</em> : linha}
            </span>
          ))}
        </Titulo>
        <p className="banner-subtitulo">{b?.subtitulo ?? p.descricao}</p>
        {b?.destaques && (
          <ul className="banner-destaques">
            {b.destaques.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}
        {children}
      </div>
      {b && (
        <div className="banner-foto">
          <Image
            src={`/images/servicos/foto-${p.slug}.webp`}
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 720px"
            priority={prioridade}
          />
        </div>
      )}
    </div>
  );
}
