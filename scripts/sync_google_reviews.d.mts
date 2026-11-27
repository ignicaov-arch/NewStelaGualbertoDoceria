import type { GoogleReviewItem } from '../src/domain/googleReviews';

export interface BusinessMatchPlace {
  readonly displayName?: { readonly text?: string } | string;
  readonly name?: string;
  readonly title?: string;
  readonly formattedAddress?: string;
  readonly address?: string;
  readonly websiteUri?: string;
  readonly website?: string;
  readonly nationalPhoneNumber?: string;
  readonly internationalPhoneNumber?: string;
  readonly phone?: string;
}

export interface BusinessMatchExpected {
  readonly domain?: string;
  readonly phoneDigits?: string;
  readonly city?: string;
  readonly nameToken?: string;
}

export interface WindowOptions {
  readonly fetchLimit?: number;
  readonly displayLimit?: number;
}

export function verifyExactBusinessMatch(
  place?: BusinessMatchPlace,
  expected?: BusinessMatchExpected,
): boolean;

export function selectLatestFiveStarWindow(
  incomingReviews?: readonly Record<string, unknown>[],
  existingPool?: readonly Record<string, unknown>[],
  options?: WindowOptions,
): {
  readonly recentPool: GoogleReviewItem[];
  readonly fiveStarLatest: GoogleReviewItem[];
};
