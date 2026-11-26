import { BRAND } from '../data/brand';
import { TESTIMONIALS } from '../data/socialProof';
import { sanitizeUrl } from '../domain/whatsapp';

export function TestimonialsSection() {
  const googleKgHref = sanitizeUrl(BRAND.googleKgUrl);

  return (
    <section id="depoimentos" className="secao depoimentos">
      <div className="container">
        <div className="secao__cabecalho revela">
          <div>
            <span className="eyebrow">Quem já provou</span>
            <h2 className="titulo-secao">
              Carinho que volta em forma de <em>recomendações</em>
            </h2>
          </div>

          <a
            href={googleKgHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secundario text-current"
            style={{ color: '#32221F' }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3L14.7 8.5L20.8 9.4L16.4 13.7L17.4 19.8L12 16.9L6.6 19.8L7.6 13.7L3.2 9.4L9.3 8.5L12 3Z"
                fill="#C89F62"
                stroke="#32221F"
                strokeWidth={1.5}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span>Nota 4,7 de 5 em 430+ avaliações no Google</span>
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px',
          }}
        >
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.author}
              className="revela"
              style={{
                margin: 0,
                padding: '26px',
                borderRadius: 'var(--raio)',
                backgroundColor: 'var(--papel)',
                border: 'var(--borda-sutil)',
                boxShadow: 'var(--sombra-suave)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '18px',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--tinta)',
                }}
              >
                "{item.quote}"
              </p>
              <footer style={{ borderTop: 'var(--borda-sutil)', paddingTop: '14px' }}>
                <strong style={{ display: 'block', color: 'var(--tinta)' }}>{item.author}</strong>
                <span style={{ fontSize: '0.84rem', color: 'var(--texto-suave)' }}>
                  {item.context}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
