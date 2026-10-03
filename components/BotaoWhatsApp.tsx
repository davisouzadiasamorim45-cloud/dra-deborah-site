import Seta from "./Seta";
import { whatsappLink } from "@/lib/site";

type Props = {
  mensagem: string;
  children: React.ReactNode;
  variante?: "padrao" | "claro" | "contorno" | "contorno-claro";
  // Sem seta no botão compacto do cabeçalho
  seta?: boolean;
  className?: string;
};

export default function BotaoWhatsApp({ mensagem, children, variante = "padrao", seta = true, className = "" }: Props) {
  return (
    <a
      className={`botao botao-${variante} ${className}`}
      href={whatsappLink(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      {seta && <Seta />}
    </a>
  );
}
