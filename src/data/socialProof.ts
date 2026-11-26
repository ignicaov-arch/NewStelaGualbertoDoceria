export interface HowItWorksStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface TestimonialItem {
  readonly author: string;
  readonly context: string;
  readonly quote: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    number: '01',
    title: 'Escolha a linha ideal',
    description:
      'Veja se a sua ocasião pede pronta entrega da vitrine do dia, bolo inteiro, mesa de doces ou caixa presenteável.',
  },
  {
    number: '02',
    title: 'Fale com a doceria',
    description:
      'Envie a data e o número de convidados pelo WhatsApp para alinhar sabores, porções e disponibilidade na agenda.',
  },
  {
    number: '03',
    title: 'Confirme os detalhes',
    description:
      'Defina recheios, acabamento e horário de retirada ou entrega em Divinópolis com atendimento humano e direto.',
  },
  {
    number: '04',
    title: 'Retire ou receba fresco',
    description:
      'Seu pedido é preparado em produção própria na Av. Divino Espírito Santo e embalado pronto para servir ou presentear.',
  },
];

export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    author: 'Marina Oliveira',
    context: 'Encomenda de aniversário · Divinópolis',
    quote:
      'Os bolos têm um equilíbrio raro: massa leve, recheio cremoso e doçura na medida certa. Todos os convidados elogiaram e perguntaram de onde era.',
  },
  {
    author: 'Rafael Mendes',
    context: 'Vitrine no Centro · Av. Divino Espírito Santo',
    quote:
      'O atendimento na loja da Av. Divino Espírito Santo é sempre acolhedor e rápido. Quando preciso de uma sobremesa especial de última hora, a vitrine nunca decepciona.',
  },
  {
    author: 'Camila Ferreira',
    context: 'Presentes corporativos e familiares',
    quote:
      'As caixas e latas com a frase Minha doçura, pra você! encantam antes mesmo de abrir. Os brigadeiros e bombons chegam impecáveis e com sabor verdadeiro.',
  },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'Com quanta antecedência devo fazer minha encomenda na Stela Gualberto Doceria?',
    answer:
      'Recomendamos solicitar bolos inteiros e doces finos com 3 a 5 dias de antecedência para garantir agenda e seleção completa de sabores. Para eventos acima de 60 convidados ou caixas personalizadas em volume, o ideal é reservar com 10 a 15 dias pelo WhatsApp.',
  },
  {
    question: 'Existe vitrine de pronta entrega todos os dias na loja do Centro?',
    answer:
      'Sim, de terça a sexta das 11h às 19h e aos sábados e domingos das 10h às 17h mantemos vitrine fresca na Av. Divino Espírito Santo, 826. Você encontra fatias de bolos, tortas, brigadeiros e opções para presentear sem precisar agendar.',
  },
  {
    question: 'Posso personalizar os sabores ou solicitar opções com menor teor de açúcar?',
    answer:
      'Nossas receitas já são desenvolvidas com dulçor equilibrado e ingredientes selecionados sem pré-misturas. Ao conversar com a equipe no WhatsApp, você escolhe combinações de massas e recheios disponíveis e pode consultar previamente sobre ingredientes e possíveis alergênicos de cada preparo.',
  },
  {
    question: 'Como funciona a retirada na loja ou a entrega em Divinópolis?',
    answer:
      'Você pode retirar seu pedido diretamente no balcão da Av. Divino Espírito Santo, 826, no Centro de Divinópolis, dentro do horário combinado. Também realizamos entregas na cidade mediante consulta prévia de taxa e disponibilidade de janela de horário para sua região.',
  },
  {
    question: 'Vocês montam latas e caixas presenteáveis personalizadas?',
    answer:
      'Sim, preparamos latas colecionáveis e caixas cartonadas com acabamento artesanal e o selo Minha doçura, pra você!. Você escolhe a composição de brigadeiros, bombons ou brownies e pode incluir cartão dedicatória para presentes individuais, datas comemorativas ou ações corporativas.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas na loja e nas encomendas?',
    answer:
      'Aceitamos Pix, cartões de crédito e débito na loja e no atendimento via WhatsApp. Para encomendas sob medida de bolos, tortas inteiras e mesas de doces, a reserva da data na produção é confirmada mediante sinal combinado no fechamento do pedido.',
  },
];
