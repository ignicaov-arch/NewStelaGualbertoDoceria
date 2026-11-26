import { useState } from 'react';
import { BRAND } from '../data/brand';
import { sanitizeUrl } from '../domain/whatsapp';
import { LogoEmblem } from './LogoEmblem';

const NAV_LINKS = [
  { label: 'Linhas', href: '#linhas' },
  { label: 'A Doceria', href: '#doceria' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Encomendar', href: '#encomendas' },
  { label: 'LinkBio', href: '/linkbio' },
] as const;

export function HeaderPill() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="topo__wrap">
      <div className="topo__pilula">
        <a
          href="#topo"
          className="topo__logo text-current"
          style={{ color: '#32221F' }}
          aria-label={BRAND.fullName}
        >
          <LogoEmblem size={36} />
          <span className="topo__logo-texto">
            <span className="topo__logo-nome">{BRAND.name}</span>
            <span className="topo__logo-sub">{BRAND.subtitle}</span>
          </span>
        </a>

        <nav className="topo__nav" aria-label="Navegação principal">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={sanitizeUrl(item.href)} className="topo__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="topo__acoes">
          <a
            href="#encomendas"
            className="btn btn--primario topo__cta text-white"
            style={{ color: '#FDFBF8' }}
          >
            <span className="rolling-wrap">
              <span className="rolling-inner">
                <span>Encomendar</span>
                <span className="is-clone" aria-hidden="true">
                  Encomendar
                </span>
              </span>
            </span>
          </a>

          <button
            type="button"
            className="topo__burger"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile-drawer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ) : (
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="menu-mobile-drawer"
          className="topo__drawer"
          aria-label="Menu móvel"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={sanitizeUrl(item.href)}
              className="topo__drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
