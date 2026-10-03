import Image from "next/image";

// "monograma": só o símbolo, em dourado (fundos claros) ou branco (fundos escuros).
// "completo": símbolo branco + nome, para o hero.
type Props = {
  variante?: "monograma" | "completo";
  cor?: "dourado" | "branco";
  className?: string;
  prioridade?: boolean;
};

export default function Logo({ variante = "monograma", cor = "dourado", className = "", prioridade = false }: Props) {
  if (variante === "monograma") {
    return (
      <Image
        src={`/images/logo/logo-${cor}.png`}
        alt=""
        width={732}
        height={760}
        className={`logo-monograma logo-${cor} ${className}`}
        priority={prioridade}
      />
    );
  }
  return (
    <span className={`logo-completo ${className}`}>
      <Image
        src="/images/logo/logo-branco.png"
        alt=""
        width={732}
        height={760}
        className="logo-monograma"
        priority
      />
      <span className="logo-divisor" aria-hidden="true" />
      <span className="logo-nome">
        Déborah
        <br />
        Carvalho
      </span>
    </span>
  );
}
