import { describe, expect, it } from 'vitest';
import { buildSiteSchemaGraph } from '../src/domain/seoSchema';

interface SchemaNode {
  readonly '@type': string | readonly string[];
  readonly [key: string]: unknown;
}

function parseGraph(jsonText: string): readonly SchemaNode[] {
  const parsed = JSON.parse(jsonText) as {
    readonly '@context': string;
    readonly '@graph': readonly SchemaNode[];
  };
  expect(parsed['@context']).toBe('https://schema.org');
  return parsed['@graph'];
}

describe('buildSiteSchemaGraph', () => {
  it('gera @graph completo na home com Bakery, Person, WebPage, Breadcrumb e FAQPage', () => {
    const raw = buildSiteSchemaGraph('home');
    expect(raw).not.toContain('<');

    const graph = parseGraph(raw);
    const bakery = graph.find(
      (node) => Array.isArray(node['@type']) && node['@type'].includes('Bakery'),
    );
    const faq = graph.find((node) => node['@type'] === 'FAQPage');
    const breadcrumb = graph.find((node) => node['@type'] === 'BreadcrumbList');

    expect(bakery).toBeDefined();
    expect(bakery?.name).toBe('Stela Gualberto Doceria');
    expect(bakery?.aggregateRating).toEqual({
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      bestRating: '5',
      ratingCount: '430',
    });
    expect(faq).toBeDefined();
    expect((breadcrumb?.itemListElement as unknown[]).length).toBe(1);
    expect(raw).toContain('wikidata.org/wiki/Q926606');
    expect(raw).toContain('wikidata.org/wiki/Q13276');
  });

  it('gera breadcrumb de 2 níveis e omite FAQPage em linkbio e privacy', () => {
    const linkbioGraph = parseGraph(buildSiteSchemaGraph('linkbio'));
    const privacyGraph = parseGraph(buildSiteSchemaGraph('privacy'));

    expect(linkbioGraph.some((node) => node['@type'] === 'FAQPage')).toBe(false);
    expect(privacyGraph.some((node) => node['@type'] === 'FAQPage')).toBe(false);

    const linkbioCrumb = linkbioGraph.find((node) => node['@type'] === 'BreadcrumbList');
    const privacyCrumb = privacyGraph.find((node) => node['@type'] === 'BreadcrumbList');

    expect((linkbioCrumb?.itemListElement as unknown[]).length).toBe(2);
    expect((privacyCrumb?.itemListElement as unknown[]).length).toBe(2);
  });
});
