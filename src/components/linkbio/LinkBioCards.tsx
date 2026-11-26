import { LINKBIO_ACTIONS } from '../../data/linkbioData';
import { sanitizeUrl } from '../../domain/whatsapp';

export function LinkBioCards() {
  return (
    <section aria-label="Links principais da doceria" className="lb-cards">
      {LINKBIO_ACTIONS.map((action) => {
        const href = sanitizeUrl(action.href);
        const textColor = action.featured ? '#F8F3EE' : '#32221F';

        return (
          <a
            key={action.id}
            href={href}
            target={action.external ? '_blank' : undefined}
            rel={action.external ? 'noopener noreferrer' : undefined}
            className={`lb-card text-current${action.featured ? ' lb-card--featured' : ''}`}
            style={{ color: textColor }}
          >
            <div>
              {action.badge ? <span className="lb-card__badge">{action.badge}</span> : null}
              <span className="lb-card__title">{action.title}</span>
              <span className="lb-card__sub">{action.subtitle}</span>
            </div>

            <span className="lb-card__arrow" aria-hidden="true">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </a>
        );
      })}
    </section>
  );
}
