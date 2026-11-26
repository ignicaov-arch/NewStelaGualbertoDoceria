import type { ReactNode } from 'react';
import { BRAND } from '../data/brand';
import { evaluateStoreStatus } from '../domain/schedule';
import { buildWhatsAppUrl } from '../domain/whatsapp';

export interface HeroSectionProps {
  children?: ReactNode;
}

const CONFETTI_DOTS = [
  { top: '14%', left: '7%', color: '#F2BEB3', size: 10 },
  { top: '26%', left: '46%', color: '#C89F62', size: 8 },
  { top: '74%', left: '12%', color: '#B6493B', size: 9 },
  { top: '18%', right: '8%', color: '#F2BEB3', size: 12 },
  { top: '68%', right: '6%', color: '#C89F62', size: 9 },
] as const;

export function HeroSection({ children }: HeroSectionProps) {
  const status = evaluateStoreStatus();
  const whatsappHref = buildWhatsAppUrl(
    `Olá! Vim pelo site da ${BRAND.fullName} e quero consultar a vitrine ou fazer uma encomenda.`,
  );

  return (
    <section id="topo" className="hero">
      <div className="hero__marca" aria-hidden="true">
        Stela
      </div>

      <div className="chuva" aria-hidden="true">
        {CONFETTI_DOTS.map((dot, idx) => (
          <span
            key={idx}
            className="chuva__ponto"
            style={{
              top: dot.top,
              left: 'left' in dot ? dot.left : undefined,
              right: 'right' in dot ? dot.right : undefined,
              backgroundColor: dot.color,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
            }}
          />
        ))}
      </div>

      <div className="container hero__grid">
        <div>
          <div className="hero__status" role="status">
            <span
              className={`hero__status-dot ${status.isOpen ? 'is-open' : ''}`}
              aria-hidden="true"
            />
            <span>
              {status.badgeText} · {status.detailText}
            </span>
          </div>

          {children}

          <p className="hero__lead">
            Na {BRAND.fullName}, no {BRAND.address.neighborhood} de {BRAND.address.city}, você encontra bolos autorais, tortas cremosas e doces finos na vitrine de pronta entrega ou sob encomenda para festas e presentes afetivos com a assinatura {BRAND.slogan}
          </p>

          <div className="hero__acoes">
            <a
              href="#encomendas"
              className="btn btn--primario text-white"
              style={{ color: '#FDFBF8' }}
            >
              <span className="rolling-wrap">
                <span className="rolling-inner">
                  <span>Simular encomenda</span>
                  <span className="is-clone" aria-hidden="true">
                    Simular encomenda
                  </span>
                </span>
              </span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secundario text-current"
              style={{ color: '#32221F' }}
            >
              <span className="rolling-wrap">
                <span className="rolling-inner">
                  <span>Pedir pelo WhatsApp</span>
                  <span className="is-clone" aria-hidden="true">
                    Pedir pelo WhatsApp
                  </span>
                </span>
              </span>
            </a>
          </div>

          <div className="hero__fatos">
            <div className="hero__fato">
              <strong>
                {BRAND.rating.value}/{BRAND.rating.best} ({BRAND.rating.count}+)
              </strong>
              <span>Avaliações no Google</span>
            </div>
            <div className="hero__fato">
              <strong>Terça a domingo</strong>
              <span>Vitrine fresca no {BRAND.address.neighborhood}</span>
            </div>
            <div className="hero__fato">
              <strong>{BRAND.whatsappDisplay}</strong>
              <span>Atendimento direto</span>
            </div>
          </div>
        </div>

        <div className="hero__moldura">
          <div className="hero__foto-wrap">
            <img
              src="/img/hero.webp"
              srcSet="/img/hero-800.webp 800w, /img/hero.webp 1600w"
              sizes="(max-width: 860px) 100vw, 48vw"
              width={1600}
              height={900}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              alt={`Mesa artesanal com bolos e doces finos da ${BRAND.fullName} em ${BRAND.address.city}`}
              className="hero__foto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
