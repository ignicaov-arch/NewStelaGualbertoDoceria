const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

export function ReviewLightbox() {
  return (
    <div
      className="review-lightbox-modal"
      id="reviewLightbox"
      role="dialog"
      aria-modal="true"
      aria-hidden="true"
      aria-label="Avaliação completa do Google Maps"
    >
      <div className="review-lightbox-backdrop" id="reviewLightboxBackdrop" />
      <div className="review-lightbox-container" data-lenis-prevent="">
        <button
          type="button"
          className="review-lightbox-close"
          id="reviewLightboxClose"
          aria-label="Fechar avaliação ampliada"
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <line x1={18} y1={6} x2={6} y2={18} vectorEffect="non-scaling-stroke" />
            <line x1={6} y1={6} x2={18} y2={18} vectorEffect="non-scaling-stroke" />
          </svg>
        </button>

        <div className="review-lightbox-card">
          <div className="review-lightbox-header">
            <span className="review-lightbox-badge">Avaliação verificada · Google Maps</span>
            <span
              className="review-lightbox-stars"
              style={{ display: 'inline-flex', gap: '3px' }}
              aria-label="5 estrelas"
            >
              {[0, 1, 2, 3, 4].map((idx) => (
                <svg
                  key={idx}
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="#FBBC04"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <path d={STAR_PATH} />
                </svg>
              ))}
            </span>
          </div>

          <div className="review-lightbox-body" id="reviewLightboxBody">
            <img
              src=""
              alt="Avaliação ampliada no Google"
              id="reviewLightboxImg"
              className="review-lightbox-img"
              width={480}
              height={320}
              hidden
            />
            <div id="reviewLightboxRich" className="review-lightbox-rich" hidden />
          </div>

          <p className="review-lightbox-hint">Toque fora ou pressione ESC para fechar</p>
        </div>
      </div>
    </div>
  );
}