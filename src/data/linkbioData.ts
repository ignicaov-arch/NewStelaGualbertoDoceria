import { BRAND } from './brand';
import { buildWhatsAppUrl } from '../domain/whatsapp';

export interface LinkBioAction {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
  readonly external: boolean;
  readonly featured: boolean;
  readonly badge?: string;
}

export interface LinkBioVitrineItem {
  readonly id: string;
  readonly title: string;
  readonly caption: string;
  readonly image: string;
  readonly alt: string;
  readonly href: string;
}

export const LINKBIO_PROOFS: readonly string[] = [
  `${BRAND.rating.value} no Google · +${BRAND.rating.count} avaliações`,
  `${BRAND.address.neighborhood} · ${BRAND.address.city}/${BRAND.address.state}`,
  'Terça a domingo · Vitrine fresca',
];

export const LINKBIO_ACTIONS: readonly LinkBioAction[] = [
  {
    id: 'whatsapp-encomenda',
    title: 'Encomendar no WhatsApp',
    subtitle: 'Bolos inteiros, doces finos, festas e latas presenteáveis',
    href: buildWhatsAppUrl(
      'Olá! Vim pelo link da bio e gostaria de fazer uma encomenda na Stela Gualberto Doceria.',
    ),
    external: true,
    featured: true,
    badge: 'Atendimento direto',
  },
  {
    id: 'vitrine-pronta-entrega',
    title: 'Vitrine & Pronta Entrega',
    subtitle: 'Consultar fatias, tortas e docinhos disponíveis hoje na loja',
    href: buildWhatsAppUrl(
      'Olá! Vim pelo link da bio e quero saber o que tem na vitrine de pronta entrega hoje.',
    ),
    external: true,
    featured: false,
  },
  {
    id: 'site-completo',
    title: 'Site Completo',
    subtitle: 'Conheça o cardápio autoral, guia de porções e nossa história',
    href: '/',
    external: false,
    featured: false,
  },
  {
    id: 'google-avaliacoes',
    title: 'Ver Avaliações 4.7 no Google',
    subtitle: `Mais de ${BRAND.rating.count} opiniões reais de clientes em Divinópolis`,
    href: BRAND.googleMapsUrl,
    external: true,
    featured: false,
  },
  {
    id: 'google-maps-rota',
    title: 'Abrir Rota no Google Maps',
    subtitle: BRAND.address.full,
    href: BRAND.googleMapsUrl,
    external: true,
    featured: false,
  },
];

export const LINKBIO_VITRINE: readonly LinkBioVitrineItem[] = [
  {
    id: 'vitrine-bolos',
    title: 'Bolos Autorais',
    caption: 'Fatias e inteiros sob encomenda',
    image: '/img/bolos-800.webp',
    alt: 'Bolo artesanal da Stela Gualberto Doceria',
    href: '/#cardapio',
  },
  {
    id: 'vitrine-tortas',
    title: 'Tortas Cremosas',
    caption: 'Textura aveludada na vitrine',
    image: '/img/tortas-800.webp',
    alt: 'Torta artesanal da Stela Gualberto Doceria',
    href: '/#cardapio',
  },
  {
    id: 'vitrine-doces',
    title: 'Doces Finos',
    caption: 'Caixas e mesas de celebração',
    image: '/img/doces-finos-800.webp',
    alt: 'Doces finos artesanais da Stela Gualberto Doceria',
    href: '/#encomendas',
  },
  {
    id: 'vitrine-presentes',
    title: 'Caixas & Latas',
    caption: 'Minha doçura, pra você!',
    image: '/img/presentes-800.webp',
    alt: 'Caixa e lata presenteável da Stela Gualberto Doceria',
    href: '/#presentes',
  },
];
