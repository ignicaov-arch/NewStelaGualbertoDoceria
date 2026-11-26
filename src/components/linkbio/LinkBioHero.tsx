import type { ReactNode } from 'react';
import { BRAND } from '../../data/brand';
import { LINKBIO_PROOFS } from '../../data/linkbioData';
import { evaluateStoreStatus } from '../../domain/schedule';

export interface LinkBioHeroProps {
  children?: ReactNode;
}

export function LinkBioHero({ children }: LinkBioHeroProps) {
  const status = evaluateStoreStatus();

  return (
    <section className="lb-hero">
      <div className="lb-emblem">
        <img
          src="/img/logo-stela.webp"
          alt="Logo oficial da Stela Gualberto Doceria"
          width={80}
          height={80}
          className="lb-emblem__img"
        />
      </div>

      <div className="lb-status-pill" data-store-status="">
        <span
          className={`lb-status-dot${status.isOpen ? ' is-open' : ''}`}
          data-store-status-dot=""
          aria-hidden="true"
        />
        <span data-store-status-text="">
          {status.badgeText} · {status.detailText}
        </span>
      </div>

      {children ?? <h1 className="lb-hero__title">{BRAND.fullName}</h1>}
      <p className="lb-hero__slogan">{BRAND.slogan}</p>

      <div className="lb-proofs">
        {LINKBIO_PROOFS.map((proof) => (
          <span key={proof} className="lb-proof-chip">
            {proof}
          </span>
        ))}
      </div>
    </section>
  );
}
