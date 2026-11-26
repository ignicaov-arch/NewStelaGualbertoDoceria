import { HOW_IT_WORKS_STEPS } from '../data/socialProof';

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="secao passos"
      style={{ backgroundColor: 'var(--areia)' }}
    >
      <div className="container">
        <div className="secao__cabecalho revela">
          <div>
            <span className="eyebrow">Atendimento simples</span>
            <h2 className="titulo-secao">
              Como funciona da <em>escolha à entrega</em>
            </h2>
          </div>
          <p className="secao__resumo">
            Seja para levar da vitrine hoje ou reservar sua mesa de festa, todo o processo acontece
            com transparência e contato direto com a nossa equipe.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '18px',
          }}
        >
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article
              key={step.number}
              className="revela"
              style={{
                padding: '24px',
                borderRadius: 'var(--raio)',
                backgroundColor: 'var(--papel)',
                border: 'var(--borda-sutil)',
                boxShadow: 'var(--sombra-suave)',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--pessego-marca)',
                  color: 'var(--tinta)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                {step.number}
              </span>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: 'var(--tinta)' }}>
                {step.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--texto-suave)' }}>
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
