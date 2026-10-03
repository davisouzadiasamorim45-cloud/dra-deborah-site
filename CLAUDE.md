@AGENTS.md

## Contexto do projeto

Site institucional da Dra. Déborah Carvalho (clínica de estética em Caxias-MA), reconstruído a partir do site antigo feito no criador da Hostinger. Ver `README.md` para estrutura, correções aplicadas e pendências.

- Conteúdo e contatos ficam em `lib/site.ts`; não duplicar telefone, endereço ou preços nas páginas.
- Estilos em CSS puro (`app/globals.css`) com tokens em `:root`; classes em português.
- Todos os CTAs levam ao WhatsApp via `components/BotaoWhatsApp.tsx`. Não há formulários nem backend.
- Manter as URLs `/tratamentos-esteticos` e `/localizacao-clinica-facil-de-encontrar` (SEO do site antigo).
