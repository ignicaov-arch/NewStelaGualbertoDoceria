import rawReviewsJson from '../../public/data/google-reviews.json';
import type { GoogleReviewsPayload } from '../domain/googleReviews';

export const GOOGLE_REVIEWS_DATA: GoogleReviewsPayload =
  rawReviewsJson as unknown as GoogleReviewsPayload;