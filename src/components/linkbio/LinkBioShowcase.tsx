import { LINKBIO_VITRINE } from '../../data/linkbioData';
import { sanitizeUrl } from '../../domain/whatsapp';

export function LinkBioShowcase() {
  return (
    <section aria-labelledby="lb-vitrine-heading">
      <h2 id="lb-vitrine-heading" className="lb-section-title">
        Vitrine da semana
      </h2>
      <div className="lb-vitrine-grid">
        {LINKBIO_VITRINE.map((item) => (
          <a
            key={item.id}
            href={sanitizeUrl(item.href)}
            className="lb-vitrine-card text-current"
            style={{ color: '#32221F' }}
          >
            <div className="lb-vitrine-card__media">
              <img
                src={item.image}
                alt={item.alt}
                width={400}
                height={300}
                loading="lazy"
                className="lb-vitrine-card__img"
              />
            </div>
            <span className="lb-vitrine-card__title">{item.title}</span>
            <span className="lb-vitrine-card__cap">{item.caption}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
