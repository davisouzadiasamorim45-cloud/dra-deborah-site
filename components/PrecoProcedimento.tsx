import { site, type Procedimento } from "@/lib/site";

// Valor do procedimento, respeitando a chave `exibirPrecos` de lib/site.ts
export default function PrecoProcedimento({ procedimento: p }: { procedimento: Procedimento }) {
  return (
    <div className="card-preco">
      {!site.exibirPrecos ? (
        <span className="card-observacao">Valor apresentado na avaliação</span>
      ) : p.preco ? (
        <>
          {p.prefixoPreco && <span className="card-prefixo">{p.prefixoPreco}:</span>}
          <strong>
            {p.preco}
            {p.unidade && <small>{p.unidade}</small>}
          </strong>
        </>
      ) : (
        <span className="card-observacao">{p.observacao}</span>
      )}
    </div>
  );
}
