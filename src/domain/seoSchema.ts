import { BRAND } from '../data/brand';
import { FAQ_ITEMS } from '../data/socialProof';

export type PageKind = 'home' | 'linkbio' | 'privacy';

interface PageMeta {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly breadcrumbLabel: string;
}

const PAGE_META: Record<PageKind, PageMeta> = {
  home: {
    path: '/',
    title: `${BRAND.fullName} · Confeitaria Artesanal em ${BRAND.address.city}`,
    description: `${BRAND.slogan} Bolos autorais, tortas cremosas, doces finos e latas presenteáveis no Centro de ${BRAND.address.city}.`,
    breadcrumbLabel: 'Início',
  },
  linkbio: {
    path: '/linkbio',
    title: `Links Oficiais · ${BRAND.fullName}`,
    description: `Canais oficiais da ${BRAND.fullName}: WhatsApp de encomendas, vitrine do dia, avaliações e rota no Centro de ${BRAND.address.city}.`,
    breadcrumbLabel: 'Links Oficiais',
  },
  privacy: {
    path: '/politica-de-privacidade',
    title: `Política de Privacidade e LGPD · ${BRAND.fullName}`,
    description: `Política de privacidade, cookies e proteção de dados da ${BRAND.fullName} conforme a LGPD.`,
    breadcrumbLabel: 'Política de Privacidade',
  },
};

const WIKIDATA_CONCEPTS = [
  { '@type': 'Thing', name: 'Confeitaria', sameAs: 'https://www.wikidata.org/wiki/Q5159627' },
  { '@type': 'Thing', name: 'Bolo', sameAs: 'https://www.wikidata.org/wiki/Q13276' },
  { '@type': 'Thing', name: 'Brigadeiro', sameAs: 'https://www.wikidata.org/wiki/Q2914862' },
  { '@type': 'City', name: 'Divinópolis', sameAs: 'https://www.wikidata.org/wiki/Q926606' },
];

export function buildSiteSchemaGraph(pageKind: PageKind): string {
  const meta = PAGE_META[pageKind];
  const pageUrl = `${BRAND.siteUrl}${meta.path === '/' ? '/' : meta.path}`;
  const breadcrumbItems =
    pageKind === 'home'
      ? [{ '@type': 'ListItem', position: 1, name: 'Início', item: `${BRAND.siteUrl}/` }]
      : [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${BRAND.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: meta.breadcrumbLabel, item: pageUrl },
        ];

  const graph: Record<string, unknown>[] = [
    {
      '@type': ['Bakery', 'LocalBusiness'],
      '@id': `${BRAND.siteUrl}/#bakery`,
      name: BRAND.fullName,
      slogan: BRAND.slogan,
      url: `${BRAND.siteUrl}/`,
      image: `${BRAND.siteUrl}/img/bolos.webp`,
      telephone: `+${BRAND.whatsappPrimary}`,
      priceRange: '$$',
      servesCuisine: 'Confeitaria Artesanal',
      founder: { '@id': `${BRAND.siteUrl}/#founder` },
      address: {
        '@type': 'PostalAddress',
        streetAddress: BRAND.address.street,
        addressLocality: BRAND.address.city,
        addressRegion: BRAND.address.state,
        postalCode: BRAND.address.postalCode,
        addressCountry: BRAND.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BRAND.geo.latitude,
        longitude: BRAND.geo.longitude,
      },
      openingHoursSpecification: BRAND.schedule.map((entry) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: entry.days,
        opens: entry.opens,
        closes: entry.closes,
      })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: BRAND.rating.value,
        bestRating: BRAND.rating.best,
        ratingCount: BRAND.rating.count,
      },
      sameAs: [BRAND.instagramUrl, BRAND.googleMapsUrl, BRAND.googleKgUrl],
      knowsAbout: WIKIDATA_CONCEPTS,
    },
    {
      '@type': 'Person',
      '@id': `${BRAND.siteUrl}/#founder`,
      name: BRAND.founder,
      jobTitle: BRAND.founderRole,
      worksFor: { '@id': `${BRAND.siteUrl}/#bakery` },
      sameAs: [BRAND.instagramUrl],
    },
    {
      '@type': 'WebSite',
      '@id': `${BRAND.siteUrl}/#website`,
      url: `${BRAND.siteUrl}/`,
      name: BRAND.fullName,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${BRAND.siteUrl}/#bakery` },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: meta.title,
      description: meta.description,
      inLanguage: 'pt-BR',
      datePublished: BRAND.publishedIso,
      dateModified: BRAND.updatedIso,
      isPartOf: { '@id': `${BRAND.siteUrl}/#website` },
      about: { '@id': `${BRAND.siteUrl}/#bakery` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-subtitle', '.faq-answer'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbItems,
    },
  ];

  if (pageKind === 'home') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${BRAND.siteUrl}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c');
}
