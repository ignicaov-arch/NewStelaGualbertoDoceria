import { useState } from 'react';
import { MARQUEE_ITEMS } from '../data/catalog';

export function MarqueeRibbon() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className={`faixa ${paused ? 'is-paused' : ''}`}
      aria-label="Destaques da confeitaria"
    >
      <div className="faixa__trilho">
        <div className="faixa__track">
          {[0, 1].map((dupIdx) => (
            <div
              key={dupIdx}
              style={{ display: 'flex', gap: '28px', alignItems: 'center' }}
              aria-hidden={dupIdx === 1 ? true : undefined}
            >
              {MARQUEE_ITEMS.map((item) => (
                <span key={`${dupIdx}-${item}`} className="faixa__item">
                  <span>{item}</span>
                  <span className="faixa__separador" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        id="btn-pausar-faixa"
        type="button"
        className="faixa__controle"
        aria-label={paused ? 'Retomar faixa em movimento' : 'Pausar faixa em movimento'}
        onClick={() => setPaused((prev) => !prev)}
      >
        <svg
          width={14}
          height={14}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          {paused ? (
            <path
              d="M4 3L13 8L4 13V3Z"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : (
            <path
              d="M5 3V13M11 3V13"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>
        <span>{paused ? 'Retomar' : 'Pausar'}</span>
      </button>
    </section>
  );
}
