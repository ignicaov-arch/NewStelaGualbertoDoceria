import { describe, expect, it } from 'vitest';
import { BRAND } from '../src/data/brand';
import {
  ATELIER_HIGHLIGHTS,
  ATELIER_NUMBERS,
  BENTO_CATEGORIES,
  CELEBRATION_BOX,
  GIFT_STEPS,
  GIFT_STYLES,
  GUEST_TIER_OPTIONS,
  MARQUEE_ITEMS,
  MENU_CARDS,
  OCCASION_OPTIONS,
  PORTION_GUIDE,
} from '../src/data/catalog';
import { GOOGLE_REVIEWS_DATA } from '../src/data/googleReviewsData';
import { LINKBIO_ACTIONS, LINKBIO_PROOFS, LINKBIO_VITRINE } from '../src/data/linkbioData';
import { FAQ_ITEMS, HOW_IT_WORKS_STEPS } from '../src/data/socialProof';

const BANNED_EMOJIS = ['🚀', '🔥', '✨', '💡', '🎉', '👉', '💪', '🎯', '⭐', '🏆', '💥', '🌟'];
const FORBIDDEN_TERMS = ['Confete', 'Upward Academy', 'VPS', 'Docker', 'Hetzner'];

describe('Integridade do catálogo e copy oficial', () => {
  it('mantém quantidades e ativos oficiais da Stela Gualberto Doceria', () => {
    expect(BRAND.whatsappPrimary).toBe('5537999232526');
    expect(BRAND.schedule).toHaveLength(2);
    expect(MARQUEE_ITEMS.length).toBeGreaterThanOrEqual(5);
    expect(BENTO_CATEGORIES).toHaveLength(4);
    expect(ATELIER_HIGHLIGHTS).toHaveLength(6);
    expect(ATELIER_NUMBERS).toHaveLength(4);
    expect(MENU_CARDS).toHaveLength(3);
    expect(CELEBRATION_BOX.highlights).toHaveLength(3);
    expect(PORTION_GUIDE).toHaveLength(4);
    expect(GIFT_STYLES).toHaveLength(7);
    expect(GIFT_STEPS).toHaveLength(3);
    expect(OCCASION_OPTIONS).toHaveLength(5);
    expect(GUEST_TIER_OPTIONS).toHaveLength(4);
    expect(HOW_IT_WORKS_STEPS).toHaveLength(4);
    expect(GOOGLE_REVIEWS_DATA.verified).toBe(true);
    expect(GOOGLE_REVIEWS_DATA.reviews.length).toBeGreaterThanOrEqual(4);
    expect(FAQ_ITEMS).toHaveLength(6);
    expect(LINKBIO_PROOFS).toHaveLength(3);
    expect(LINKBIO_ACTIONS).toHaveLength(5);
    expect(LINKBIO_VITRINE).toHaveLength(4);
  });

  it('garante respostas Answer-First de 35 a 55 palavras no FAQ', () => {
    for (const item of FAQ_ITEMS) {
      const words = item.answer.trim().split(/\s+/).length;
      expect(words).toBeGreaterThanOrEqual(35);
      expect(words).toBeLessThanOrEqual(55);
    }
  });

  it('não contém travessões, emojis banidos nem termos proibidos nos dados', () => {
    const serialized = JSON.stringify({
      BRAND,
      MARQUEE_ITEMS,
      BENTO_CATEGORIES,
      ATELIER_HIGHLIGHTS,
      ATELIER_NUMBERS,
      MENU_CARDS,
      CELEBRATION_BOX,
      PORTION_GUIDE,
      GIFT_STYLES,
      GIFT_STEPS,
      HOW_IT_WORKS_STEPS,
      FAQ_ITEMS,
      LINKBIO_PROOFS,
      LINKBIO_ACTIONS,
      LINKBIO_VITRINE,
    });

    expect(serialized).not.toContain(' — ');
    expect(serialized).not.toContain(' – ');
    for (const emoji of BANNED_EMOJIS) {
      expect(serialized).not.toContain(emoji);
    }
    for (const term of FORBIDDEN_TERMS) {
      expect(serialized.toLowerCase()).not.toContain(term.toLowerCase());
    }
  });
});
