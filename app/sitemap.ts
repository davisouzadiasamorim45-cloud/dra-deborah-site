import type { MetadataRoute } from "next";
import { site, procedimentos, rotaProcedimento, cursos, rotaCurso } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = [
    "",
    "/tratamentos-esteticos",
    "/cursos",
    "/localizacao-clinica-facil-de-encontrar",
    ...procedimentos.map((p) => rotaProcedimento(p.slug)),
    ...cursos.map((c) => rotaCurso(c.slug)),
  ];
  return rotas.map((rota) => ({
    url: `${site.url}${rota}`,
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.8,
  }));
}
