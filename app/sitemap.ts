import type { MetadataRoute } from "next";
import { site, procedimentos, rotaProcedimento } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = [
    "",
    "/tratamentos-esteticos",
    "/localizacao-clinica-facil-de-encontrar",
    ...procedimentos.map((p) => rotaProcedimento(p.slug)),
  ];
  return rotas.map((rota) => ({
    url: `${site.url}${rota}`,
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.8,
  }));
}
