// Dados centrais do site. Alterar aqui reflete em todas as páginas.
export const site = {
  nome: "Déborah Carvalho",
  url: "https://www.dradeborahcarvalho.com",
  telefone: "(99) 98161-3055",
  // Número no formato internacional exigido pelo wa.me: 55 + DDD + número
  whatsapp: "5599981613055",
  instagram: "https://www.instagram.com/deborahcarvalhohof/",
  endereco: {
    rua: "R. Benedito Leite, 663 - Centro",
    cidade: "Caxias",
    uf: "MA",
    cep: "65604-020",
  },
  // false = os cards de Serviços deixam de mostrar valores e passam a dizer
  // "Valor apresentado na avaliação". Decisão da doutora.
  exibirPrecos: true,
  horario: [
    { dia: "Segunda-feira", horas: "08h–12h · 14h–18h" },
    { dia: "Terça-feira", horas: "08h–12h · 14h–18h" },
    { dia: "Quarta-feira", horas: "08h–12h · 14h–18h" },
    { dia: "Quinta-feira", horas: "08h–12h · 14h–18h" },
    { dia: "Sexta-feira", horas: "08h–12h · 14h–18h" },
  ],
};

export const enderecoCompleto = `${site.endereco.rua}, ${site.endereco.cidade} - ${site.endereco.uf}, ${site.endereco.cep}`;

export function whatsappLink(mensagem?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export const mensagens = {
  agendar: "Olá! Gostaria de agendar uma avaliação com a Dra. Déborah.",
  sobre: (procedimento: string) =>
    `Olá! Gostaria de saber mais sobre ${procedimento}.`,
};

export type Foto = { src: string; alt: string; width: number; height: number; rotulo?: string };

export type Categoria = "harmonizacao" | "pele";

export const categorias: { id: Categoria; titulo: string }[] = [
  { id: "harmonizacao", titulo: "Harmonização facial" },
  { id: "pele", titulo: "Tratamentos de pele" },
];

export type Procedimento = {
  slug: string;
  nome: string;
  categoria: Categoria;
  descricao?: string;
  // Texto mais longo, usado na Home e na página do tratamento
  texto?: string;
  prefixoPreco?: string;
  preco?: string;
  unidade?: string;
  observacao?: string;
  // Textos dos banners originais (antes embutidos na imagem). A foto fica em /images/servicos/foto-<slug>.webp
  banner?: { rotulo: string; titulo: string[]; subtitulo: string; destaques?: string[] };
  resultados?: Foto[];
};

const r = (arquivo: string, alt: string, width: number, height: number, rotulo?: string): Foto => ({
  src: `/images/resultados/${arquivo}.webp`,
  alt,
  width,
  height,
  rotulo,
});

// Mesma ordem e valores do site atual. Cada item gera uma página em /tratamentos-esteticos/<slug>
export const procedimentos: Procedimento[] = [
  {
    slug: "botox",
    categoria: "harmonizacao",
    nome: "Botox",
    descricao: "Suaviza rugas e linhas de expressão.",
    texto:
      "Procedimento estético para suavizar rugas e linhas de expressão, com resultados visíveis em poucos dias e **duração média de 4 a 6 meses**, **sem tempo de recuperação**.",
    preco: "R$ 1.300,00",
    banner: {
      rotulo: "Botox",
      titulo: ["Naturalidade", "em cada expressão."],
      subtitulo: "Suavize linhas de expressão sem perder sua essência.",
      destaques: ["Resultado natural", "Procedimento rápido", "Prevenção do envelhecimento"],
    },
    resultados: [
      r("botox-antes", "Testa antes da aplicação de toxina botulínica", 660, 433, "Antes"),
      r("botox-depois", "Testa depois da aplicação de toxina botulínica", 660, 317, "Depois"),
      r("botox-2", "Antes e depois de botox: linhas da testa", 1080, 1292),
    ],
  },
  {
    slug: "skinbooster",
    categoria: "harmonizacao",
    nome: "Skinbooster",
    descricao: "Hidratação profunda e revitalização da pele.",
    prefixoPreco: "a partir de",
    preco: "R$ 800,00",
    banner: {
      rotulo: "Skinbooster",
      titulo: ["Hidratação profunda", "que transforma."],
      subtitulo: "Mais viço, elasticidade e luminosidade para sua pele.",
    },
  },
  {
    slug: "bioestimuladores",
    categoria: "harmonizacao",
    nome: "Bioestimuladores",
    descricao: "Estimula o colágeno e melhora a firmeza da pele.",
    observacao: "Deve ser feita a avaliação inicialmente",
    banner: {
      rotulo: "Bioestimulador",
      titulo: ["Colágeno que renova.", "Beleza que se constrói."],
      subtitulo: "Estimula a produção natural de colágeno para uma pele mais firme e jovem.",
    },
  },
  {
    slug: "peelings",
    categoria: "pele",
    nome: "Peelings",
    descricao: "Renovação da pele e melhora visível da textura.",
    texto:
      "Procedimento avançado indicado para tratar rugas estáticas, atuando nas camadas mais profundas da pele. Promove **renovação intensa e melhora visível da textura**, com tempo de recuperação em média de 7 a 10 dias.",
    prefixoPreco: "a partir de",
    preco: "R$ 90,00",
    resultados: [
      r("peeling-3", "Antes e depois de peeling: lateral do rosto", 960, 992),
      r("peeling-2", "Antes e depois de peeling: testa", 960, 1280),
    ],
  },
  {
    slug: "fios-pdo",
    categoria: "harmonizacao",
    nome: "Fios PDO",
    descricao: "Efeito lifting natural e sustentação facial.",
    observacao: "Deve ser feita a avaliação inicialmente",
    banner: {
      rotulo: "Fios PDO",
      titulo: ["Firmeza e sustentação", "sem cirurgia."],
      subtitulo: "Efeito lifting natural que redefine seu contorno facial.",
    },
  },
  {
    slug: "preenchimento-labial",
    categoria: "harmonizacao",
    nome: "Preenchimento Labial",
    descricao: "Volume, contorno e hidratação com naturalidade.",
    texto:
      "Procedimento estético para dar volume e contorno aos lábios, com **resultados imediatos** e recuperação rápida.",
    prefixoPreco: "a partir de",
    preco: "R$ 800,00",
    unidade: "/ml",
    banner: {
      rotulo: "Preenchimento Labial",
      titulo: ["Lábios mais", "harmônicos.", "Beleza sem exageros."],
      subtitulo: "Volume, contorno e hidratação com naturalidade.",
    },
    resultados: [
      r("labial-1", "Antes e depois de preenchimento labial, de frente", 562, 665),
      r("labial-3", "Antes e depois de preenchimento labial, de perfil deitado", 1080, 1440),
      r("labial-2", "Antes e depois de preenchimento labial, de perfil", 703, 520),
    ],
  },
  // Descrições escritas para o site novo: revisar com a doutora
  {
    slug: "microagulhamento",
    categoria: "pele",
    nome: "Microagulhamento",
    descricao: "Estimula o colágeno e melhora a textura da pele.",
    observacao: "Deve ser feita a avaliação inicialmente",
  },
  {
    slug: "limpeza-de-pele-profunda",
    categoria: "pele",
    nome: "Limpeza de Pele Profunda",
    descricao: "Remove impurezas e deixa a pele renovada e saudável.",
    observacao: "Deve ser feita a avaliação inicialmente",
  },
];

export function buscarProcedimento(slug: string) {
  return procedimentos.find((p) => p.slug === slug);
}

export const rotaProcedimento = (slug: string) => `/tratamentos-esteticos/${slug}`;

// Destaques da seção "Quem somos", tirados da própria apresentação da Dra. Déborah
export const credenciais = [
  { valor: "+6 anos", rotulo: "à frente de sua clínica em Caxias" },
  { valor: "Residência", rotulo: "em Harmonização Facial" },
  { valor: "Formação", rotulo: "em Dermato Funcional e Cosmetologia" },
];

// Perguntas frequentes da Home. As respostas usam apenas informações já publicadas no site.
export const perguntas = [
  {
    pergunta: "Como funciona a primeira avaliação?",
    resposta:
      "A avaliação é presencial, na clínica em Caxias-MA. A Dra. Déborah analisa sua pele de perto, ouve suas queixas e indica o tratamento ideal e personalizado para o seu caso.",
  },
  {
    pergunta: "Quem realiza a avaliação?",
    resposta: "Todas as avaliações são realizadas **exclusivamente pela Dra. Déborah Carvalho**.",
  },
  {
    pergunta: "Quanto tempo dura o efeito do Botox?",
    resposta:
      "Os resultados aparecem em poucos dias e **duram em média de 4 a 6 meses**, sem tempo de recuperação.",
  },
  {
    pergunta: "Qual é o tempo de recuperação do Peeling?",
    resposta:
      "No peeling indicado para rugas estáticas, que atua nas camadas mais profundas da pele, a recuperação leva **em média de 7 a 10 dias**.",
  },
  {
    pergunta: "O resultado do Preenchimento Labial é imediato?",
    resposta: "Sim. O preenchimento dá volume e contorno aos lábios com **resultados imediatos** e recuperação rápida.",
  },
  {
    pergunta: "Como faço para agendar?",
    resposta: `O agendamento é feito pelo **WhatsApp ${site.telefone}**. O atendimento é de segunda a sexta, das 8h às 12h e das 14h às 18h.`,
  },
];
