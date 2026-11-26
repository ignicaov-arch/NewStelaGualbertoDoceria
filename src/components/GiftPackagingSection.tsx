import { BRAND } from '../data/brand';
import { GIFT_STEPS, GIFT_STYLES } from '../data/catalog';
import { buildWhatsAppUrl } from '../domain/whatsapp';

export function GiftPackagingSection() {
  const giftWhatsApp = buildWhatsAppUrl(
    'Olá! Gostaria de encomendar uma caixa ou lata presenteável da linha Minha doçura, pra você!',
  );

  return (
    <section id="presentes" className="secao decoracao">
      <div className="container">
        <div className="espaco">
          <div className="espaco__moldura revela" style={{ borderRadius: '999px 999px 32px 32px' }}>
            <img
              src="/img/presentes.webp"
              srcSet="/img/presentes-800.webp 800w, /img/presentes.webp 1200w"
              sizes="(max-width: 860px) 100vw, 48vw"
              alt="Latas e caixas presenteáveis da Stela Gualberto Doceria com o selo Minha doçura, pra você!"
              width={800}
              height={960}
              loading="lazy"
              className="espaco__foto"
              style={{ borderRadius: '999px 999px 18px 18px', aspectRatio: '4 / 5' }}
            />
            <div className="espaco__selo" style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--fonte-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.15rem',
                  color: 'var(--terracota)',
                }}
              >
                {BRAND.slogan}
              </span>
            </div>
          </div>

          <div className="revela">
            <span className="eyebrow">Presentes autorais</span>
            <h2 className="titulo-secao">
              Caixas e latas <em>personalizadas</em> para marcar momentos
            </h2>
            <p className="secao__resumo">
              Cada embalagem nasce para transformar um gesto de carinho em memória afetiva, com
              laço de cetim, cartão dedicatória e seleção fresca da nossa produção no Centro.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                margin: '20px 0 24px',
              }}
            >
              {GIFT_STYLES.map((styleName) => (
                <span
                  key={styleName}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '999px',
                    backgroundColor: 'var(--pessego-blush)',
                    border: '1px solid rgba(182, 73, 59, 0.2)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--tinta)',
                  }}
                >
                  {styleName}
                </span>
              ))}
            </div>

            <ol className="espaco__lista" style={{ marginBottom: '26px' }}>
              {GIFT_STEPS.map((item) => (
                <li key={item.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '34px',
                      height: '34px',
                      borderRadius: '999px',
                      backgroundColor: 'var(--pessego-marca)',
                      color: 'var(--tinta)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                    }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--tinta)' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.92rem', color: 'var(--texto-suave)' }}>
                      {item.description}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href={giftWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primario text-white"
              style={{ color: '#FDFBF8' }}
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 7H4V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V7Z"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M12 7V21M3 7H21M7.5 7C6.1 7 5 5.9 5 4.5C5 3.1 6.1 2 7.5 2C9.8 2 12 7 12 7ZM16.5 7C17.9 7 19 5.9 19 4.5C19 3.1 17.9 2 16.5 2C14.2 2 12 7 12 7Z"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span>Montar presente no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
