import Image from "next/image";
import Link from "next/link";
import { rotaProcedimento, type Procedimento } from "@/lib/site";

// Cards simples lado a lado, sem efeito: usados nas categorias pequenas (o arco fica para as maiores)
export default function GradeTratamentos({ itens }: { itens: Procedimento[] }) {
  return (
    <ul className="grade-tratamentos">
      {itens.map((p) => (
        <li key={p.slug}>
          <Link href={rotaProcedimento(p.slug)} className="grade-card">
            <Image src="/images/logo/logo-dourado.png" alt="" width={732} height={760} className="grade-card-marca" />
            <span className="grade-card-nome">{p.nome}</span>
            <span className="grade-card-frase">{p.descricao}</span>
            <span className="grade-card-link">
              Conhecer o tratamento <span aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
