import { BRAND } from '../data/brand';
import { LogoEmblem } from './LogoEmblem';

export function FooterSection() {
  return (
    <div
      className="rodape__inner"
      style={{
        backgroundColor: 'var(--tinta)',
        color: 'var(--creme)',
        padding: '48px 0 36px',
        borderTop: 'var(--borda-escura)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            paddingBottom: '28px',
            borderBottom: 'var(--borda-escura)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <LogoEmblem size={44} />
            <div>
              <strong
                style={{
                  display: 'block',
                  fontFamily: 'var(--fonte-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.85rem',
                  lineHeight: 1,
                  color: 'var(--pessego-marca)',
                }}
              >
                Stela.
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'rgba(248, 243, 238, 0.8)' }}>
                {BRAND.slogan}
              </span>
            </div>
          </div>

          <nav
            aria-label="Links do rodapé"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}
          >
            <a href="/#linhas" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>
              Linhas
            </a>
            <a href="/#doceria" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>
              A Doceria
            </a>
            <a href="/#cardapio" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>
              Cardápio
            </a>
            <a href="/linkbio" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>
              LinkBio
            </a>
            <a
              href="/politica-de-privacidade"
              style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
            >
              Privacidade
            </a>
            <button
              id="btn-preferencias-cookies"
              type="button"
              data-cookie-open=""
              style={{
                minHeight: '44px',
                padding: '8px 14px',
                borderRadius: '999px',
                border: 'var(--borda-escura)',
                backgroundColor: 'var(--tinta-2)',
                color: 'var(--creme)',
                fontSize: '0.86rem',
                fontWeight: 600,
              }}
            >
              Preferências de cookies
            </button>
          </nav>
        </div>

        <p
          style={{
            margin: '20px 0 0',
            fontSize: '0.84rem',
            color: 'rgba(248, 243, 238, 0.72)',
          }}
        >
          © 2026 Stela Gualberto Doceria · Av. Divino Espírito Santo, 826, Centro, Divinópolis - MG
        </p>
      </div>
    </div>
  );
}
