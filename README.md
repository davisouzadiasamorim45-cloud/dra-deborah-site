# Site Dra. Déborah Carvalho

Reconstrução em Next.js do site https://www.dradeborahcarvalho.com/ (antes no criador de sites da Hostinger).
Esta versão é o **clone fiel**: mesmo conteúdo, mesmas URLs e mesma identidade visual, para servir de base às alterações.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Estrutura

| Caminho | O que é |
|---|---|
| `lib/site.ts` | Telefone, WhatsApp, endereço, horário, procedimentos e preços. Alterar aqui muda o site todo. |
| `app/page.tsx` | Home |
| `app/home-anterior/page.tsx` | Versão anterior da Home, mantida para comparação com a cliente (fora do Google). Apagar quando não for mais necessária. |
| `app/tratamentos-esteticos/page.tsx` | Serviços: carrossel + tratamentos por categoria (`categoria` em `lib/site.ts`) |
| `app/tratamentos-esteticos/[slug]/page.tsx` | Página de cada tratamento (gerada a partir de `procedimentos` em `lib/site.ts`) |
| `app/localizacao-clinica-facil-de-encontrar/page.tsx` | Localização |
| `app/globals.css` | Estilos e tokens de cor/fonte |
| `components/` | Cabeçalho, rodapé, logo, botão de WhatsApp (com seta), carrossel e banner de tratamento, arco de tratamentos (Serviços), preço |
| `public/images/` | Imagens otimizadas em WebP (`home`, `servicos`, `icones`, `resultados`) |
| `public/videos/atendimento.mp4` | Vídeo da seção Resultados |

## Correções já aplicadas em relação ao site antigo

- Link do WhatsApp com código do país (`wa.me/5599981613055`) e mensagem pronta por procedimento
- Textos: "Copyright", "Dra. Déborah" (com h), "a Dra. Déborah"
- Um único H1 por página e hierarquia de títulos correta
- Serviços: um botão por card, sem textos soltos
- Fontes hospedadas no próprio site: Playfair Display (títulos) e Urbanist (texto, menu e botões)
- `sitemap.xml`, `robots.txt`, metadados por página e dados estruturados do negócio
- Banners de Serviços com texto real em HTML (antes embutido na imagem); as fotos `servicos/foto-*.webp` foram recortadas dos banners originais

## Pendências

- **Nota "4.9/5" do hero:** confirmar a origem (Google?) ou remover.
- **Fotos de peeling:** confirmar com a doutora que são resultados reais de pacientes da clínica.
- **Preços:** decidir com a doutora se continuam no site. Para ocultar, mudar `exibirPrecos` para `false` em `lib/site.ts`.
- **Microagulhamento e Limpeza de Pele Profunda:** descrições escritas para o site novo; revisar com a doutora. Faltam fotos para as páginas e para a lista de Serviços.
- **Perguntas frequentes:** respostas montadas só com informações já publicadas no site. A doutora deve revisar antes de publicar.
- **Cursos (`/cursos` e `/cursos/<slug>`):** textos, conteúdo programático e "Para quem é" escritos para o site novo; revisar com a doutora. Carga horária, datas e valores ficam para o WhatsApp. Fotos do Pexels (licença livre, sem atribuição obrigatória): [limpeza de pele](https://www.pexels.com/photo/37229293/), [drenagem](https://www.pexels.com/photo/10893345/), [hidrolipoclasia](https://www.pexels.com/photo/33327683/). Trocar por fotos das turmas quando houver.
- **Depoimentos e fotos da clínica:** seções previstas, aguardando material real (avaliações do Google, fotos do espaço).

## Publicação (quando aprovado)

1. Subir o repositório no GitHub e importar na Vercel (preview em URL temporária).
2. Na Vercel, adicionar os domínios `dradeborahcarvalho.com` e `www.dradeborahcarvalho.com`.
3. No DNS da Hostinger, apontar os registros indicados pela Vercel. Não mexer nos registros MX (e-mail).
4. Só depois de conferir o site no ar, cancelar o plano do criador de sites.
