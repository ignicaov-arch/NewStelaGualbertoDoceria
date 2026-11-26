export interface BentoCategory {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly tag: string;
  readonly image: string;
  readonly image800: string;
  readonly alt: string;
  readonly href: string;
}

export interface AtelierNumber { readonly value: string; readonly label: string }
export interface PortionTier { readonly guests: string; readonly cakeWeight: string; readonly sweetsCount: string; readonly idealFor: string }
export interface GiftStep { readonly step: string; readonly title: string; readonly description: string }

export interface MenuCard {
  readonly id: string;
  readonly title: string;
  readonly badge: string;
  readonly description: string;
  readonly items: readonly string[];
  readonly ctaLabel: string;
  readonly whatsappTopic: string;
}

export const MARQUEE_ITEMS: readonly string[] = [
  'Bolos Autorais', 'Tortas Cremosas', 'Doces Finos', 'Latas Presenteáveis',
  'Vitrine Fresca no Centro', 'Produção Própria', 'Minha doçura, pra você!',
];

export const BENTO_CATEGORIES: readonly BentoCategory[] = [
  {
    id: 'bolos',
    title: 'Bolos Autorais',
    subtitle: 'Massas leves e recheios equilibrados',
    description: 'Fatias na vitrine e bolos inteiros sob encomenda para celebrações em Divinópolis.',
    tag: 'Clássico da Casa',
    image: '/img/bolos.webp',
    image800: '/img/bolos-800.webp',
    alt: 'Bolo artesanal confeitado da Stela Gualberto Doceria em Divinópolis',
    href: '#cardapio',
  },
  {
    id: 'tortas',
    title: 'Tortas & Cheesecakes',
    subtitle: 'Textura aveludada e chocolate nobre',
    description: 'Receitas com equilíbrio real de dulçor para sobremesas de fim de semana e eventos.',
    tag: 'Vitrine Diária',
    image: '/img/tortas.webp',
    image800: '/img/tortas-800.webp',
    alt: 'Torta artesanal cremosa servida na vitrine da Stela Gualberto Doceria',
    href: '#cardapio',
  },
  {
    id: 'doces-finos',
    title: 'Doces Finos',
    subtitle: 'Acabamento de festa em cada unidade',
    description: 'Brigadeiros gourmet, bombons recheados e docinhos montados para mesas de festa.',
    tag: 'Sob Encomenda',
    image: '/img/doces-finos.webp',
    image800: '/img/doces-finos-800.webp',
    alt: 'Seleção de doces finos artesanais da Stela Gualberto Doceria',
    href: '#encomendas',
  },
  {
    id: 'presentes',
    title: 'Caixas & Latas',
    subtitle: 'Presentes com assinatura autoral',
    description: 'Embalagens personalizadas com o selo Minha doçura, pra você! para datas marcantes.',
    tag: 'Presentes',
    image: '/img/presentes.webp',
    image800: '/img/presentes-800.webp',
    alt: 'Lata e caixa presenteável da Stela Gualberto Doceria',
    href: '#presentes',
  },
];

export const ATELIER_HIGHLIGHTS: readonly string[] = [
  'Loja física na Av. Divino Espírito Santo, 826, no Centro de Divinópolis.',
  'Produção própria diária sem uso de pré-misturas industriais.',
  'Chocolate nobre, frutas frescas e creme de leite verdadeiro nas bases.',
  'Vitrine de pronta entrega renovada de terça a domingo.',
  'Encomendas personalizadas com atendimento direto pelo WhatsApp.',
  'Embalagens afetivas com acabamento presenteável e cartão dedicatória.',
];

export const ATELIER_NUMBERS: readonly AtelierNumber[] = [
  { value: '430+', label: 'avaliações verificadas' },
  { value: '4', label: 'linhas autorais' },
  { value: '6', label: 'dias de vitrine fresca' },
  { value: '100%', label: 'produção própria' },
];

export const MENU_CARDS: readonly MenuCard[] = [
  {
    id: 'vitrine',
    title: 'Vitrine & Pronta Entrega',
    badge: 'Terça a domingo',
    description: 'Opções frescas disponíveis diariamente na loja do Centro para levar ou saborear na hora.',
    items: ['Fatias de bolos autorais', 'Tortas individuais e banoffee', 'Brigadeiros e bombons do dia', 'Sobremesas no pote e brownies'],
    ctaLabel: 'Consultar vitrine de hoje',
    whatsappTopic: 'Olá! Gostaria de saber os sabores disponíveis na vitrine de hoje.',
  },
  {
    id: 'bolos-tortas',
    title: 'Bolos & Tortas Inteiras',
    badge: 'Sob encomenda',
    description: 'Tamanhos pensados para reunir família e amigos sem sobras nem exagero no açúcar.',
    items: ['Bolos recheados de 1,5 kg a 4 kg', 'Tortas mousse, limão e frutas', 'Massas amanteigadas e cacau 100%', 'Acabamento limpo e elegante'],
    ctaLabel: 'Encomendar bolo inteiro',
    whatsappTopic: 'Olá! Quero encomendar um bolo ou torta inteira na Stela Gualberto Doceria.',
  },
  {
    id: 'doces-kits',
    title: 'Doces Finos & Kits Festa',
    badge: 'Eventos e mesas',
    description: 'Conjuntos coordenados de doces artesanais para aniversários, casamentos e encontros corporativos.',
    items: ['Caixas com 25, 50 ou 100 doces', 'Sabores tradicionais e especiais', 'Kits com bolo e docinhos combinados', 'Forminhas alinhadas à paleta do evento'],
    ctaLabel: 'Montar kit de festa',
    whatsappTopic: 'Olá! Gostaria de montar um kit de doces finos e festa com vocês.',
  },
];

export const CELEBRATION_BOX = {
  title: 'Planeje sua mesa sem errar na quantidade',
  subtitle: 'Atendimento consultivo direto com a equipe da doceria',
  description: 'Informe a ocasião, a data e a faixa de convidados para receber uma sugestão equilibrada de peso de bolo e doces finos.',
  highlights: ['Cálculo proporcional ao número de convidados', 'Sugestão de sabores que harmonizam entre si', 'Retirada agendada no Centro ou entrega combinada'],
  leadTimeNote: 'Recomendamos solicitar encomendas com 3 a 5 dias de antecedência.',
  ctaLabel: 'Enviar simulação no WhatsApp',
} as const;

export const PORTION_GUIDE: readonly PortionTier[] = [
  { guests: 'Até 15 convidados', cakeWeight: '1,5 kg', sweetsCount: '30 doces', idealFor: 'Reuniões íntimas e aniversários em casa' },
  { guests: '15 a 30 convidados', cakeWeight: '2,5 kg', sweetsCount: '60 doces', idealFor: 'Jantares comemorativos e chás de bebê' },
  { guests: '30 a 60 convidados', cakeWeight: '4,0 kg', sweetsCount: '120 doces', idealFor: 'Festas completas e eventos corporativos' },
  { guests: 'Acima de 60 convidados', cakeWeight: 'Sob medida (5 kg+)', sweetsCount: '200+ doces', idealFor: 'Casamentos, formaturas e grandes celebrações' },
];

export const GIFT_STYLES: readonly string[] = [
  'Latas Personalizadas', 'Caixas Cartonadas', 'Laços de Cetim', 'Brigadeiros Gourmet', 'Bombons Recheados', 'Brownies Embrulhados', 'Cartão Dedicatória',
];

export const GIFT_STEPS: readonly GiftStep[] = [
  { step: '01', title: 'Escolha a embalagem', description: 'Defina entre latas colecionáveis ou caixas cartonadas com acabamento rosé e trufa.' },
  { step: '02', title: 'Monte a seleção', description: 'Combine brigadeiros, bombons e brownies conforme o perfil de quem vai receber.' },
  { step: '03', title: 'Finalize com dedicatória', description: 'Adicione seu recado no cartão Minha doçura, pra você! e agende retirada ou entrega.' },
];

export const OCCASION_OPTIONS: readonly string[] = [
  'Aniversário', 'Casamento e Noivado', 'Batizado e Chá', 'Evento Corporativo', 'Presente Especial',
];

export const GUEST_TIER_OPTIONS: readonly string[] = PORTION_GUIDE.map((tier) => tier.guests);
