import { FAQ_ITEMS } from '../data/socialProof';

export function FaqSection() {
  return (
    <section id="duvidas" className="secao faq" style={{ backgroundColor: 'var(--papel)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 'clamp(24px, 4vw, 52px)',
            alignItems: 'start',
          }}
        >
          <div className="revela" style={{ position: 'sticky', top: '96px' }}>
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="titulo-secao">
              Tudo claro antes de <em>encomendar</em>
            </h2>
            <p className="secao__resumo">
              Prazos de produção, retirada na loja do Centro, entregas em Divinópolis e montagem de
              latas e caixas presenteáveis.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {FAQ_ITEMS.map((item, index) => (
              <details
                key={item.question}
                className="pergunta revela"
                open={index === 0}
                style={{
                  padding: '18px 20px',
                  borderRadius: '22px',
                  backgroundColor: 'var(--creme)',
                  border: 'var(--borda-sutil)',
                }}
              >
                <summary
                  style={{
                    listStyle: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    fontWeight: 700,
                    fontSize: '1.02rem',
                    color: 'var(--tinta)',
                  }}
                >
                  <span>{item.question}</span>
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    style={{ flexShrink: 0 }}
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </summary>
                <p
                  className="faq-answer"
                  style={{
                    margin: '12px 0 0',
                    color: 'var(--texto-suave)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                  }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
