import { OCCASION_OPTIONS, GUEST_TIER_OPTIONS } from '../data/catalog';
import { estimateCelebrationOrder } from '../domain/whatsapp';

export function OrderFormSection() {
  const initialEstimate = estimateCelebrationOrder(
    OCCASION_OPTIONS[0] ?? 'Aniversário',
    GUEST_TIER_OPTIONS[0] ?? 'Até 15 convidados',
  );

  return (
    <section id="encomendas" className="secao agendar">
      <div className="container">
        <div
          className="revela"
          style={{
            padding: 'clamp(24px, 4vw, 44px)',
            borderRadius: 'var(--raio-grande)',
            backgroundColor: 'var(--tinta)',
            color: 'var(--creme)',
            border: 'var(--borda-escura)',
            boxShadow: 'var(--sombra-card)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: 'var(--pessego-marca)' }}>
              Simulador de encomenda
            </span>
            <h2 className="titulo-secao" style={{ color: 'var(--creme)' }}>
              Monte seu pedido e fale direto no <em style={{ color: 'var(--pessego-marca)' }}>WhatsApp</em>
            </h2>
            <p style={{ margin: '0 0 20px', color: 'rgba(248, 243, 238, 0.8)' }}>
              Escolha a ocasião, a data prevista e a faixa de convidados para gerar uma referência
              inicial já preenchida para a equipe da doceria.
            </p>

            <div
              id="estimativa-live"
              aria-live="polite"
              style={{
                padding: '18px 20px',
                borderRadius: '22px',
                backgroundColor: 'rgba(253, 251, 248, 0.08)',
                border: '1px solid rgba(242, 190, 179, 0.28)',
              }}
            >
              <strong style={{ display: 'block', color: 'var(--pessego-marca)', marginBottom: '6px' }}>
                Sugestão inicial: <span id="estimativa-peso">{initialEstimate.cakeKg}</span> ·{' '}
                <span id="estimativa-doces">{initialEstimate.sweetsCount}</span> doces
              </strong>
              <p
                id="estimativa-sugestao"
                style={{ margin: 0, fontSize: '0.92rem', color: 'rgba(248, 243, 238, 0.88)' }}
              >
                {initialEstimate.suggestion}
              </p>
            </div>
          </div>

          <form
            id="form-encomenda"
            style={{
              display: 'grid',
              gap: '14px',
              padding: '22px',
              borderRadius: 'var(--raio)',
              backgroundColor: 'var(--papel)',
              color: 'var(--tinta)',
            }}
          >
            <label style={{ display: 'grid', gap: '6px', fontWeight: 600, fontSize: '0.9rem' }}>
              <span>Ocasião</span>
              <select
                id="tipo"
                name="tipo"
                className="ui-select text-base"
                defaultValue={OCCASION_OPTIONS[0]}
              >
                {OCCASION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: 'grid', gap: '6px', fontWeight: 600, fontSize: '0.9rem' }}>
              <span>Data prevista</span>
              <input
                id="data"
                name="data"
                type="date"
                className="text-base"
                style={{
                  minHeight: '48px',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: '1px solid rgba(50, 34, 31, 0.18)',
                  backgroundColor: 'var(--creme)',
                  color: 'var(--tinta)',
                }}
              />
            </label>

            <label style={{ display: 'grid', gap: '6px', fontWeight: 600, fontSize: '0.9rem' }}>
              <span>Faixa de convidados</span>
              <select
                id="convidados"
                name="convidados"
                className="ui-select text-base"
                defaultValue={GUEST_TIER_OPTIONS[0]}
              >
                {GUEST_TIER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" className="btn btn--primario" style={{ width: '100%' }}>
              <span className="rolling-wrap">
                <span className="rolling-inner">
                  <span>Enviar consulta no WhatsApp</span>
                  <span className="is-clone" aria-hidden="true">
                    Enviar consulta no WhatsApp
                  </span>
                </span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
