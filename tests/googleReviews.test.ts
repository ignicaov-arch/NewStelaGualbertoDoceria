import { describe, expect, it } from 'vitest';
import {
  buildSingleMarqueeRow,
  filterLatestFiveStarReviews,
  getAuthorInitial,
  getAvatarColor,
  splitDualMarqueeRows,
  type GoogleReviewItem,
} from '../src/domain/googleReviews';
import { GOOGLE_REVIEWS_DATA } from '../src/data/googleReviewsData';
import {
  selectLatestFiveStarWindow,
  verifyExactBusinessMatch,
} from '../scripts/sync_google_reviews.mjs';

function makeReview(index: number, rating = 5, text = `Ótima experiência #${index}`): GoogleReviewItem {
  return {
    reviewId: `rev-${index}`,
    authorName: `Cliente ${index}`,
    authorUri: '',
    authorPhoto: '',
    guideBadge: 'Avaliação Google',
    rating,
    text,
    relativeTime: 'há 1 semana',
    publishTime: new Date(Date.UTC(2026, 10, 1 + (index % 28), index % 24)).toISOString(),
  };
}

describe('Google Reviews 5 estrelas · Domínio & Sync 50->20', () => {
  it('mantém janela deslizante 50->20 sem congelar quando entra avaliação 5★ mais nova', () => {
    const olderPool = Array.from({ length: 20 }, (_, i) => ({
      reviewId: `old-${i + 1}`,
      authorName: `Antigo ${i + 1}`,
      rating: 5,
      text: `Relato antigo ${i + 1}`,
      publishTime: new Date(Date.UTC(2026, 9, i + 1)).toISOString(),
    }));

    const incoming = [
      {
        reviewId: 'new-top-5star',
        authorName: 'Cliente Novo Top',
        starRating: 'FIVE',
        text: { text: 'Bolo artesanal impecável no Centro de Divinópolis!' },
        publishTime: '2026-11-27T12:00:00.000Z',
      },
      {
        reviewId: 'low-rating-ignored',
        authorName: 'Nota Baixa',
        rating: 2,
        text: 'Comentário com menos de 5 estrelas deve sair do filtro.',
        publishTime: '2026-11-27T13:00:00.000Z',
      },
    ];

    const { recentPool, fiveStarLatest } = selectLatestFiveStarWindow(incoming, olderPool, {
      fetchLimit: 50,
      displayLimit: 20,
    });

    expect(recentPool).toHaveLength(22);
    expect(fiveStarLatest).toHaveLength(20);
    expect(fiveStarLatest[0]?.reviewId).toBe('new-top-5star');
    expect(fiveStarLatest.every((r) => r.rating === 5)).toBe(true);
    expect(fiveStarLatest.some((r) => r.reviewId === 'old-1')).toBe(false);
  });

  it('valida trava anti-homônimo com >= 2 âncoras fortes', () => {
    expect(
      verifyExactBusinessMatch(
        {
          displayName: { text: 'Stela Gualberto Doceria' },
          formattedAddress: 'Av. Divino Espírito Santo, 826 - Centro, Divinópolis - MG',
          nationalPhoneNumber: '(37) 99923-2526',
        },
        { nameToken: 'Stela Gualberto', city: 'Divinópolis', phoneDigits: '5537999232526' },
      ),
    ).toBe(true);

    expect(
      verifyExactBusinessMatch(
        {
          displayName: { text: 'Stela Doceria Homônimo' },
          formattedAddress: 'Rua Exemplo, São Paulo - SP',
          nationalPhoneNumber: '(11) 91234-5678',
        },
        { nameToken: 'Stela Gualberto', city: 'Divinópolis', phoneDigits: '5537999232526' },
      ),
    ).toBe(false);
  });

  it('divide site principal em 2 faixas cruzadas e /linkbio em 1 faixa única', () => {
    const fourReviews = [1, 2, 3, 4].map((n) => makeReview(n, 5));
    const dualPlan = splitDualMarqueeRows(fourReviews);
    const singlePlan = buildSingleMarqueeRow(fourReviews);

    expect(dualPlan.mode).toBe('dual');
    expect(dualPlan.row1.length).toBeGreaterThanOrEqual(6);
    expect(dualPlan.row2.length).toBeGreaterThanOrEqual(6);
    expect(dualPlan.row1[0]?.reviewId).not.toBe(dualPlan.row2[0]?.reviewId);

    expect(singlePlan.mode).toBe('single');
    expect(singlePlan.row1.length).toBeGreaterThanOrEqual(6);
    expect(splitDualMarqueeRows([]).mode).toBe('hidden');
    expect(buildSingleMarqueeRow([makeReview(1)]).mode).toBe('static');
  });

  it('carrega payload real de public/data/google-reviews.json estritamente 5 estrelas', () => {
    expect(GOOGLE_REVIEWS_DATA.verified).toBe(true);
    expect(GOOGLE_REVIEWS_DATA.businessName).toContain('Stela Gualberto');
    expect(GOOGLE_REVIEWS_DATA.reviews.length).toBeGreaterThanOrEqual(4);
    expect(
      filterLatestFiveStarReviews(GOOGLE_REVIEWS_DATA.reviews).every((r) => r.rating === 5),
    ).toBe(true);
    expect(getAuthorInitial('  sonia ')).toBe('S');
    expect(getAuthorInitial('')).toBe('C');
    expect(getAvatarColor(3)).toMatch(/^#[0-9A-F]{6}$/i);
  });
});