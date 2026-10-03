// Renderiza textos de lib/site.ts marcando em negrito o que estiver entre **asteriscos duplos**.
export default function Destaque({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/\*\*(.+?)\*\*/g).map((parte, i) => (i % 2 === 1 ? <strong key={i}>{parte}</strong> : parte))}
    </>
  );
}

// Versão sem marcação, para metadados e dados estruturados
export const semDestaque = (texto: string) => texto.replace(/\*\*/g, "");
