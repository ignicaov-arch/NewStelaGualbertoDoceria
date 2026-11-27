import { BRAND } from '../data/brand';
import { GOOGLE_REVIEWS_DATA } from '../data/googleReviewsData';
import { splitDualMarqueeRows } from '../domain/googleReviews';
import { sanitizeUrl } from '../domain/whatsapp';
import { ReviewCard } from './ReviewCard';
import { ReviewLightbox } from './ReviewLightbox';

export function TestimonialsSection() {
  const googleHref = sanitizeUrl(BRAND.googleMapsUrl);
  const plan = GOOGLE_REVIEWS_DATA.verified
    ? splitDualMarqueeRows(GOOGLE_REVIEWS_DATA.reviews)
    : { mode: 'hidden' as const, row1: [], row2: [] };
  const overallScore = BRAND.rating.value;
  const isHidden = plan.mode === 'hidden';
  const showDualMarquee = plan.mode === 'dual';

  return (
    <section
      id="depoimentos"
      className="secao depoimentos testimonials-section"
      data-google-reviews=""
      data-reviews-layout="dual"
      data-max-reviews="20"
      hidden={isHidden}
    >
      <div className="container">
        <div className="testimonials-header revela">
          <span className="eyebrow" data-reviews-badge="">
            Avaliações verificadas · Nota {overallScore} ({BRAND.rating.count} no Google)
          </span>
          <h2 className="titulo-secao">
            O que dizem no <em>Google Meu Negócio</em>
          </h2>
          <p className="section-subtitle">
            Relatos reais 5 estrelas em Divinópolis. Clique no card ou toque e segure no celular para ler a avaliação completa.
          </p>

          <div className="testimonials-actions">
            <a
              href={googleHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secundario text-current"
              style={{ color: '#32221F' }}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M12 3L14.7 8.5L20.8 9.4L16.4 13.7L17.4 19.8L12 16.9L6.6 19.8L7.6 13.7L3.2 9.4L9.3 8.5L12 3Z"
                  fill="#FBBC04"
                  stroke="#32221F"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span>Ver {BRAND.rating.count} avaliações no Google</span>
            </a>

            <button
              type="button"
              className="btn btn--secundario"
              data-reviews-pause=""
              aria-pressed="false"
              style={{ minHeight: '44px' }}
            >
              Pausar rolagem
            </button>
          </div>
        </div>
      </div>

      <div
        className="testimonials-marquee-container"
        aria-label="Depoimentos verificados 5 estrelas em rolagem contínua"
        hidden={!showDualMarquee}
      >
        <div className="marquee-row marquee-ltr" aria-label="Avaliações do Google - Faixa 1">
          <div className="marquee-track" data-reviews-row="1">
            {plan.row1.map((review, idx) => (
              <ReviewCard key={`r1-${review.reviewId}-${idx}`} review={review} index={idx} />
            ))}
            {plan.row1.map((review, idx) => (
              <ReviewCard
                key={`r1c-${review.reviewId}-${idx}`}
                review={review}
                index={idx}
                isClone
              />
            ))}
          </div>
        </div>

        <div className="marquee-row marquee-rtl" aria-label="Avaliações do Google - Faixa 2">
          <div className="marquee-track" data-reviews-row="2">
            {plan.row2.map((review, idx) => (
              <ReviewCard key={`r2-${review.reviewId}-${idx}`} review={review} index={idx + 2} />
            ))}
            {plan.row2.map((review, idx) => (
              <ReviewCard
                key={`r2c-${review.reviewId}-${idx}`}
                review={review}
                index={idx + 2}
                isClone
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="reviews-static-grid" data-reviews-static="" hidden={showDualMarquee}>
          {!showDualMarquee &&
            plan.row1.map((review, idx) => (
              <ReviewCard key={`st-${review.reviewId}-${idx}`} review={review} index={idx} />
            ))}
        </div>
      </div>

      <ReviewLightbox />
    </section>
  );
}