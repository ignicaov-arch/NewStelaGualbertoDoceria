import { BRAND } from '../../data/brand';
import { GOOGLE_REVIEWS_DATA } from '../../data/googleReviewsData';
import { buildSingleMarqueeRow } from '../../domain/googleReviews';
import { sanitizeUrl } from '../../domain/whatsapp';
import { ReviewCard } from '../ReviewCard';

export function LinkBioReviews() {
  const googleHref = sanitizeUrl(BRAND.googleMapsUrl);
  const plan = GOOGLE_REVIEWS_DATA.verified
    ? buildSingleMarqueeRow(GOOGLE_REVIEWS_DATA.reviews)
    : { mode: 'hidden' as const, row1: [] };
  const overallScore = BRAND.rating.value;
  const isHidden = plan.mode === 'hidden';
  const showMarquee = plan.mode === 'single';

  return (
    <section
      className="testimonials-section testimonials-section--linkbio"
      aria-label="Avaliações 5 estrelas no Google Meu Negócio"
      data-google-reviews=""
      data-reviews-layout="single"
      data-max-reviews="20"
      hidden={isHidden}
    >
      <div className="lb-reviews-header">
        <div>
          <span className="eyebrow" data-reviews-badge="">
            Google Maps · Nota {overallScore} ({BRAND.rating.count} avaliações)
          </span>
          <h2 className="lb-section-title" style={{ margin: '6px 0 0' }}>
            Avaliações 5 estrelas
          </h2>
        </div>

        <div className="lb-reviews-controls">
          <button
            type="button"
            className="lb-topbar__home"
            data-reviews-pause=""
            aria-pressed="false"
            style={{ border: 0, fontFamily: 'inherit', color: '#32221F' }}
          >
            Pausar
          </button>
          <a
            href={googleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="lb-topbar__home text-current"
            style={{ color: '#32221F' }}
          >
            Ver no Google
          </a>
        </div>
      </div>

      <div className="testimonials-marquee-container marquee-single" hidden={!showMarquee}>
        <div className="marquee-row marquee-rtl" aria-label="Avaliações do Google - Fileira Única">
          <div className="marquee-track" data-reviews-row="1">
            {plan.row1.map((review, idx) => (
              <ReviewCard
                key={`lb-${review.reviewId}-${idx}`}
                review={review}
                index={idx}
                compact
              />
            ))}
            {plan.row1.map((review, idx) => (
              <ReviewCard
                key={`lbc-${review.reviewId}-${idx}`}
                review={review}
                index={idx}
                compact
                isClone
              />
            ))}
          </div>
        </div>
      </div>

      <div className="reviews-static-grid" data-reviews-static="" hidden={showMarquee}>
        {!showMarquee &&
          plan.row1.map((review, idx) => (
            <ReviewCard
              key={`lbst-${review.reviewId}-${idx}`}
              review={review}
              index={idx}
              compact
            />
          ))}
      </div>
    </section>
  );
}