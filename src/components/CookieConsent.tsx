export function CookieConsent() {
  return (
    <>
      <aside
        data-cookie-banner=""
        aria-label="Aviso de cookies e privacidade"
        className="cookie-bar"
        hidden
      >
        <div style={{ display: 'grid', gap: '12px' }}>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--tinta)' }}>
            Usamos apenas cookies essenciais para o funcionamento do site. Cookies funcionais e de
            medição ficam desativados até a sua autorização conforme a LGPD.{' '}
            <a
              href="/politica-de-privacidade"
              style={{ color: 'var(--terracota)', textDecoration: 'underline', fontWeight: 600 }}
            >
              Política de Privacidade
            </a>
            .
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              type="button"
              data-cookie-accept-all=""
              className="btn btn--primario"
              style={{ minHeight: '44px', padding: '8px 16px', fontSize: '0.84rem' }}
            >
              Aceitar todos
            </button>
            <button
              type="button"
              data-cookie-reject-optional=""
              className="btn btn--secundario"
              style={{ minHeight: '44px', padding: '8px 16px', fontSize: '0.84rem' }}
            >
              Recusar opcionais
            </button>
            <button
              type="button"
              data-cookie-open=""
              className="btn btn--secundario"
              style={{ minHeight: '44px', padding: '8px 16px', fontSize: '0.84rem' }}
            >
              Personalizar
            </button>
          </div>
        </div>
      </aside>

      <div
        data-cookie-modal=""
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
        hidden
        data-lenis-prevent=""
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 80,
          display: 'grid',
          placeItems: 'center',
          padding: '16px',
          backgroundColor: 'rgba(50, 34, 31, 0.56)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '520px',
            padding: '24px',
            borderRadius: 'var(--raio)',
            backgroundColor: 'var(--papel)',
            color: 'var(--tinta)',
            border: 'var(--borda-sutil)',
            boxShadow: 'var(--sombra-card)',
          }}
        >
          <h2 id="cookie-modal-title" style={{ margin: '0 0 8px', fontSize: '1.25rem' }}>
            Preferências de privacidade (LGPD)
          </h2>
          <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: 'var(--texto-suave)' }}>
            Gerencie seu consentimento por categoria. Consulte nossa{' '}
            <a
              href="/politica-de-privacidade"
              style={{ color: 'var(--terracota)', textDecoration: 'underline', fontWeight: 600 }}
            >
              Política de Privacidade
            </a>
            .
          </p>

          <div style={{ display: 'grid', gap: '10px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.92rem' }}>
              <span
                style={{
                  padding: '3px 9px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--pessego-blush)',
                  color: 'var(--terracota)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                Sempre ativo
              </span>
              <span>
                <strong>Essenciais:</strong> necessários para segurança e preferência de cookies.
              </span>
            </div>
            <label style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.92rem' }}>
              <input
                type="checkbox"
                className="text-base"
                data-cookie-toggle="functional"
                defaultChecked={false}
              />
              <span>
                <strong>Funcionais:</strong> lembram escolhas rápidas de navegação.
              </span>
            </label>
            <label style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.92rem' }}>
              <input
                type="checkbox"
                className="text-base"
                data-cookie-toggle="analytics"
                defaultChecked={false}
              />
              <span>
                <strong>Analíticos:</strong> medição agregada de acesso às páginas.
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              type="button"
              data-cookie-save=""
              className="btn btn--primario"
              style={{ minHeight: '44px', padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Aceitar selecionados
            </button>
            <button
              type="button"
              data-cookie-accept-all=""
              className="btn btn--secundario"
              style={{ minHeight: '44px', padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Aceitar todos
            </button>
            <button
              type="button"
              data-cookie-reject-optional=""
              className="btn btn--secundario"
              style={{ minHeight: '44px', padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Recusar opcionais
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
