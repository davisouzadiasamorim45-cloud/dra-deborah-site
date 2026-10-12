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
  curso: (curso: string) =>
    `Olá! Tenho interesse no curso de ${curso}. Pode me passar as próximas turmas e valores?`,
  cursos: "Olá! Gostaria de saber mais sobre os cursos da Dra. Déborah.",
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

// Cursos ministrados pela Dra. Déborah. Cards em /cursos e uma página por curso em /cursos/<slug>.
// Limpeza de Pele Profissional: texto oficial enviado pela doutora.
// Drenagem e Hidrolipoclasia: textos provisórios escritos para o site novo, aguardando o material da doutora.
// Modalidade, carga horária, certificado e valores ainda não foram informados: a página remete ao WhatsApp.
// Fotos de banco de imagens livre (Pexels); trocar por fotos das turmas quando houver.
export type Modulo = { titulo: string; itens: string[] };

export type Curso = {
  slug: string;
  nome: string;
  // Frase do card em /cursos e subtítulo do topo da página do curso
  resumo: string;
  intro: string[];
  // Frase de efeito que fecha o topo
  destaque?: string;
  sobre?: string[];
  // Etapas do procedimento, mostradas numeradas na seção "Sobre o curso"
  etapas?: string[];
  // Conteúdo em módulos; sem módulos, usa a lista simples `conteudo`
  modulos?: Modulo[];
  conteudo?: string[];
  paraQuem: string[];
  porQue?: string[];
  diferencial?: string[];
  requisitos?: string[];
  ficha: { rotulo: string; valor: string }[];
  final?: { titulo: string; textos: string[] };
  // Observação legal no fim da página
  aviso?: string;
  botoes?: { inscricao: string; vaga: string };
  foto: Foto;
};

const fotoCurso = (slug: string, alt: string, width: number, height: number): Foto => ({
  src: `/images/cursos/${slug}.webp`,
  alt,
  width,
  height,
});

export const cursos: Curso[] = [
  {
    slug: "limpeza-de-pele-profissional",
    nome: "Limpeza de Pele Profissional",
    resumo: "Aprenda a realizar procedimentos faciais com técnica, segurança e conhecimento!",
    intro: [
      "Transforme seu interesse pela estética em conhecimento para atuar com **mais confiança e profissionalismo**.",
      "Aprenda os fundamentos da limpeza de pele profissional, desde a avaliação inicial até a finalização do procedimento, conhecendo as técnicas, os cosméticos e os equipamentos utilizados na rotina estética.",
      "Um curso desenvolvido para quem deseja aprimorar suas habilidades, compreender cada etapa do atendimento e oferecer uma experiência mais cuidadosa e profissional aos clientes.",
    ],
    destaque: "Sua evolução na estética começa com conhecimento!",
    sobre: [
      "A limpeza de pele é um dos procedimentos mais conhecidos na área da estética facial. Para realizá-la de maneira responsável e individualizada, é importante conhecer a pele, identificar suas necessidades, selecionar os produtos adequados e respeitar as particularidades de cada cliente.",
      "Neste curso, você terá contato com os principais fundamentos da limpeza de pele profissional e aprenderá a compreender o procedimento como um todo: **avaliação, preparação da pele, emoliência, extração quando indicada, utilização de recursos eletroestéticos e cuidados finais**.",
      "O objetivo é ajudar você a desenvolver uma visão mais técnica, organizada e consciente do atendimento facial.",
    ],
    etapas: [
      "Avaliação",
      "Preparação da pele",
      "Emoliência",
      "Extração, quando indicada",
      "Recursos eletroestéticos",
      "Cuidados finais",
    ],
    modulos: [
      {
        titulo: "Fundamentos da pele",
        itens: [
          "Anatomia e fisiologia básica da pele.",
          "Tipos e condições de pele.",
          "Características da pele oleosa, seca, mista e sensível.",
          "Comedões, poros obstruídos e alterações comuns.",
          "Importância da avaliação individualizada.",
        ],
      },
      {
        titulo: "Avaliação facial e anamnese",
        itens: [
          "Como realizar a avaliação inicial.",
          "Identificação das necessidades da pele.",
          "Preenchimento da ficha de anamnese.",
          "Reconhecimento de contraindicações e sinais de alerta.",
          "Quando adaptar, adiar ou não realizar o procedimento.",
        ],
      },
      {
        titulo: "Cosméticos utilizados na limpeza de pele",
        itens: [
          "Higienizantes e demaquilantes.",
          "Esfoliantes e produtos emolientes.",
          "Máscaras faciais.",
          "Cosméticos calmantes e hidratantes.",
          "Como selecionar os produtos conforme as características da pele.",
        ],
      },
      {
        titulo: "Vapor de ozônio",
        itens: [
          "Princípios básicos de funcionamento do equipamento.",
          "Finalidade do vapor na preparação da pele.",
          "Utilização conforme indicação e protocolo.",
          "Cuidados com distância, tempo e exposição.",
          "Contraindicações e precauções de segurança.",
        ],
      },
      {
        titulo: "Técnica de extração",
        itens: [
          "Preparação da pele para a extração.",
          "Técnicas cuidadosas e controle da pressão.",
          "Quando a extração é indicada e quando deve ser evitada.",
          "Como reduzir o risco de irritação e lesões.",
          "Higiene dos materiais e cuidados durante o procedimento.",
        ],
      },
      {
        titulo: "Alta frequência",
        itens: [
          "Princípios de funcionamento do equipamento.",
          "Finalidade e utilização como recurso complementar.",
          "Cuidados com eletrodo, contato e aplicação.",
          "Contraindicações e precauções.",
          "Uso conforme as orientações do fabricante e o protocolo adotado.",
        ],
      },
      {
        titulo: "Passo a passo da limpeza de pele",
        itens: [
          "Organização do ambiente e dos materiais.",
          "Higienização inicial.",
          "Avaliação e preparação da pele.",
          "Esfoliação, quando indicada.",
          "Emoliência e extração, quando apropriadas.",
          "Utilização criteriosa dos equipamentos.",
          "Aplicação de máscara e finalização.",
          "Orientações de cuidados domiciliares.",
        ],
      },
      {
        titulo: "Biossegurança e atendimento profissional",
        itens: [
          "Higienização das mãos e dos materiais.",
          "Organização da cabine de atendimento.",
          "Cuidados com materiais reutilizáveis e descartáveis.",
          "Registro das informações do cliente.",
          "Orientações pós-procedimento.",
          "Ética, responsabilidade e limites de atuação profissional.",
        ],
      },
    ],
    paraQuem: [
      "Este curso é destinado a **profissionais e estudantes da área da estética** que desejam aprender ou aperfeiçoar seus conhecimentos em limpeza de pele, respeitando os requisitos de formação e os limites legais de sua atuação.",
      "É uma oportunidade para quem busca aprimorar a técnica, compreender melhor os equipamentos e desenvolver um atendimento mais cuidadoso e organizado.",
    ],
    porQue: [
      "Aprenda a organizar as etapas da limpeza de pele.",
      "Amplie seus conhecimentos sobre avaliação facial.",
      "Entenda a finalidade do vapor de ozônio e da alta frequência.",
      "Conheça cuidados importantes para um procedimento responsável.",
      "Aprimore sua seleção de cosméticos e protocolos.",
      "Desenvolva mais segurança na tomada de decisões dentro da sua área de atuação.",
    ],
    diferencial: [
      "Mais do que conhecer uma sequência de etapas, é importante compreender **por que cada etapa é realizada** e quando ela realmente é indicada.",
      "A proposta do curso é unir conhecimento técnico, atenção às necessidades individuais da pele e responsabilidade profissional, valorizando a qualidade do atendimento e o cuidado com cada cliente.",
    ],
    requisitos: [
      "Você precisará de **interesse em aprender, disposição para estudar e atenção aos princípios de biossegurança**.",
      "Os equipamentos e materiais necessários dependerão da modalidade do curso. Caso haja prática presencial, serão apresentados os materiais utilizados nas demonstrações, conforme a estrutura disponível.",
    ],
    ficha: [
      { rotulo: "Curso", valor: "Limpeza de Pele Profissional" },
      { rotulo: "Professora", valor: "Dra. Déborah Carvalho" },
      { rotulo: "Área", valor: "Saúde e Estética Avançada" },
    ],
    final: {
      titulo: "Dê o próximo passo na sua jornada na estética!",
      textos: [
        "Invista no seu conhecimento, aperfeiçoe sua técnica e amplie sua compreensão sobre os cuidados com a pele.",
        "Aprender com responsabilidade é o primeiro passo para evoluir profissionalmente.",
      ],
    },
    aviso:
      "Os resultados profissionais dependem da formação prévia, da prática, do cumprimento das normas de biossegurança e da atuação dentro dos limites legais da profissão. O curso não substitui habilitação profissional quando exigida.",
    botoes: { inscricao: "Quero me inscrever no curso", vaga: "Quero garantir minha vaga" },
    foto: fotoCurso("limpeza-de-pele-profissional", "Profissional fazendo limpeza de pele em cliente deitada na maca", 1200, 1800),
  },
  {
    slug: "drenagem-corporal",
    nome: "Drenagem Corporal",
    resumo: "Manobras manuais que reduzem o inchaço, melhoram a circulação e trazem leveza ao corpo.",
    intro: [
      "A drenagem linfática estimula o sistema linfático a eliminar o excesso de líquidos e toxinas, **reduzindo o inchaço e a sensação de pernas pesadas**. No curso, você conhece as **manobras, a sequência correta e a pressão adequada** para atender com segurança.",
    ],
    conteudo: [
      "Sistema linfático: como funciona",
      "Indicações e contraindicações",
      "Manobras e sequência da drenagem",
      "Pressão, ritmo e direção corretos",
    ],
    paraQuem: ["Profissionais e estudantes da área da estética que desejam aprender ou aperfeiçoar a técnica de drenagem corporal."],
    ficha: [
      { rotulo: "Curso", valor: "Drenagem Corporal" },
      { rotulo: "Professora", valor: "Dra. Déborah Carvalho" },
    ],
    foto: fotoCurso("drenagem-corporal", "Mãos de profissional fazendo drenagem linfática na perna de uma cliente", 1200, 2133),
  },
  {
    slug: "hidrolipoclasia-nao-invasiva",
    nome: "Hidrolipoclasia não invasiva",
    resumo: "Tecnologia de ultrassom para gordura localizada, sem agulhas e sem cirurgia.",
    intro: [
      "A hidrolipoclasia não invasiva usa **ultrassom focado** para agir sobre a gordura localizada, **sem agulhas e sem cortes**. No curso, você aprende a indicar o tratamento, montar os protocolos e utilizar o equipamento com segurança.",
    ],
    conteudo: [
      "Fisiologia do tecido adiposo",
      "Como o ultrassom age na gordura localizada",
      "Avaliação corporal e indicação do tratamento",
      "Montagem de protocolos e número de sessões",
      "Contraindicações e segurança",
    ],
    paraQuem: ["Profissionais e estudantes da área da estética que desejam trabalhar com tecnologia no tratamento da gordura localizada."],
    ficha: [
      { rotulo: "Curso", valor: "Hidrolipoclasia não invasiva" },
      { rotulo: "Professora", valor: "Dra. Déborah Carvalho" },
    ],
    foto: fotoCurso("hidrolipoclasia-nao-invasiva", "Aparelho de ultrassom sendo aplicado no abdômen durante tratamento corporal", 1200, 1800),
  },
];

export function buscarCurso(slug: string) {
  return cursos.find((c) => c.slug === slug);
}

export const rotaCurso = (slug: string) => `/cursos/${slug}`;
