// Seta dentro de um círculo, usada nos botões arredondados. Gira levemente no hover (ver .botao-seta).
export default function Seta() {
  return (
    <span className="botao-seta" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}
