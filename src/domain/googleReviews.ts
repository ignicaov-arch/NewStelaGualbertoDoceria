export interface GoogleReviewItem {
  readonly reviewId: string;
  readonly authorName: string;
  readonly authorUri: string;
  readonly authorPhoto: string;
  readonly guideBadge: string;
  readonly rating: number;
  readonly text: string;
  readonly relativeTime: string;
  readonly publishTime: string;
}

export interface GoogleReviewsPayload {
  readonly verified: boolean;
  readonly placeId: string;
  readonly businessName: string;
  readonly fetchLimit: number;
  readonly displayLimit: number;
  readonly rating: number;
  readonly userRatingCount: number;
  readonly updatedAt: string;
  readonly reviews: readonly GoogleReviewItem[];
  readonly recentPool: readonly GoogleReviewItem[];
}

export interface DualMarqueePlan {
  readonly mode: 'hidden' | 'static' | 'dual';
  readonly row1: readonly GoogleReviewItem[];
  readonly row2: readonly GoogleReviewItem[];
}

export interface SingleMarqueePlan {
  readonly mode: 'hidden' | 'static' | 'single';
  readonly row1: readonly GoogleReviewItem[];
}

const AVATAR_PALETTE = [
  '#B6493B',
  '#6B4C3E',
  '#2E6F5E',
  '#8C5A32',
  '#46312D',
  '#9A3B2E',
] as const;

export function getAuthorInitial(name: string): string {
  const cleaned = name.trim();
  return cleaned ? cleaned.charAt(0).toUpperCase() : 'C';
}

export function getAvatarColor(index: number): string {
  return AVATAR_PALETTE[Math.abs(index) % AVATAR_PALETTE.length] ?? '#B6493B';
}

export function filterLatestFiveStarReviews(
  reviews: readonly GoogleReviewItem[],
  limit = 20,
): GoogleReviewItem[] {
  return [...reviews]
    .filter((item) => item.rating === 5 && item.text.trim().length > 0)
    .sort((a, b) => Date.parse(b.publishTime) - Date.parse(a.publishTime))
    .slice(0, Math.max(1, limit));
}

export function repeatToMinTrack(
  items: readonly GoogleReviewItem[],
  minCards = 6,
): GoogleReviewItem[] {
  if (items.length === 0) return [];
  const out: GoogleReviewItem[] = [...items];
  while (out.length < minCards) {
    out.push(...items.slice(0, minCards - out.length));
  }
  return out;
}

export function splitDualMarqueeRows(
  reviews: readonly GoogleReviewItem[],
): DualMarqueePlan {
  const clean = filterLatestFiveStarReviews(reviews);
  if (clean.length === 0) {
    return { mode: 'hidden', row1: [], row2: [] };
  }
  if (clean.length < 3) {
    return { mode: 'static', row1: clean, row2: [] };
  }

  if (clean.length >= 6) {
    const splitAt = Math.ceil(clean.length / 2);
    return {
      mode: 'dual',
      row1: repeatToMinTrack(clean.slice(0, splitAt), 6),
      row2: repeatToMinTrack(clean.slice(splitAt), 6),
    };
  }

  const offset = Math.floor(clean.length / 2);
  const rotated = [...clean.slice(offset), ...clean.slice(0, offset)];
  return {
    mode: 'dual',
    row1: repeatToMinTrack(clean, 6),
    row2: repeatToMinTrack(rotated, 6),
  };
}

export function buildSingleMarqueeRow(
  reviews: readonly GoogleReviewItem[],
): SingleMarqueePlan {
  const clean = filterLatestFiveStarReviews(reviews);
  if (clean.length === 0) {
    return { mode: 'hidden', row1: [] };
  }
  if (clean.length < 3) {
    return { mode: 'static', row1: clean };
  }
  return {
    mode: 'single',
    row1: repeatToMinTrack(clean, 6),
  };
}