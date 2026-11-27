import type { GoogleReviewItem } from '../domain/googleReviews';
import { getAuthorInitial, getAvatarColor } from '../domain/googleReviews';

export interface ReviewCardProps {
  readonly review: GoogleReviewItem;
  readonly index: number;
  readonly compact?: boolean;
  readonly isClone?: boolean;
}

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

export function ReviewCard({
  review,
  index,
  compact = false,
  isClone = false,
}: ReviewCardProps) {
  const hasPhoto = review.authorPhoto.includes('lh3.googleusercontent.com');
  const subtitle = review.guideBadge.trim() || 'Avaliação verificada · Google Maps';
  const cardClass = compact ? 'review-card review-card--compact' : 'review-card';

  return (
    <article
      className={cardClass}
      data-author={review.authorName}
      data-time={review.relativeTime}
      data-full-text={review.text}
      data-clone={isClone ? 'true' : undefined}
      aria-hidden={isClone ? 'true' : undefined}
      tabIndex={isClone ? -1 : 0}
      role="button"
      aria-label={isClone ? undefined : `Ler avaliação completa de ${review.authorName}`}
    >
      <div className="gmaps-card-top">
        <div className="gmaps-author-wrap">
          {hasPhoto ? (
            <img
              src={review.authorPhoto}
              alt={`Foto de ${review.authorName}`}
              width={36}
              height={36}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="gmaps-avatar"
              data-fallback-initial={getAuthorInitial(review.authorName)}
              data-fallback-color={getAvatarColor(index)}
            />
          ) : (
            <span
              className="gmaps-avatar-fallback"
              style={{ backgroundColor: getAvatarColor(index) }}
              aria-hidden="true"
            >
              {getAuthorInitial(review.authorName)}
            </span>
          )}
          <div className="gmaps-author-meta">
            <span className="gmaps-author-name">{review.authorName}</span>
            <span className="gmaps-author-sub">{subtitle}</span>
          </div>
        </div>

        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="#6B524C"
          className="shrink-0"
          aria-hidden="true"
        >
          <circle cx={12} cy={5} r={1.8} />
          <circle cx={12} cy={12} r={1.8} />
          <circle cx={12} cy={19} r={1.8} />
        </svg>
      </div>

      <div className="gmaps-rating-row">
        <span className="gmaps-stars" aria-label="5 estrelas">
          {[0, 1, 2, 3, 4].map((starIdx) => (
            <svg
              key={starIdx}
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="#FBBC04"
              className="shrink-0"
              aria-hidden="true"
            >
              <path d={STAR_PATH} />
            </svg>
          ))}
        </span>
        <span className="gmaps-time">{review.relativeTime}</span>
      </div>

      <p className="gmaps-text">{review.text}</p>
    </article>
  );
}