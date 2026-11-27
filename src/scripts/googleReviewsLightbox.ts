function bindCardLightboxTriggers(
  root: ParentNode,
  openModal: (card: HTMLElement) => void,
): void {
  root.querySelectorAll<HTMLElement>('.review-card').forEach((card) => {
    if (card.dataset.bound) return;
    card.dataset.bound = 'true';
    let pressTimer = 0;
    let startX = 0;
    let startY = 0;
    let held = false;

    card.addEventListener('click', () => {
      if (held) {
        held = false;
        return;
      }
      openModal(card);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
    card.addEventListener(
      'touchstart',
      (e) => {
        const t = e.touches[0];
        if (!t) return;
        startX = t.clientX;
        startY = t.clientY;
        held = false;
        window.clearTimeout(pressTimer);
        pressTimer = window.setTimeout(() => {
          held = true;
          openModal(card);
        }, 450);
      },
      { passive: true },
    );
    card.addEventListener(
      'touchmove',
      (e) => {
        const t = e.touches[0];
        if (t && (Math.abs(t.clientX - startX) > 10 || Math.abs(t.clientY - startY) > 10)) {
          window.clearTimeout(pressTimer);
        }
      },
      { passive: true },
    );
    card.addEventListener('touchend', () => window.clearTimeout(pressTimer), { passive: true });
    card.addEventListener('touchcancel', () => window.clearTimeout(pressTimer), { passive: true });
  });
}

/** Vincula abertura de modal para leitura integral ao clicar ou segurar o card. */
export function bindReviewLightbox(root: ParentNode): void {
  const modal = document.getElementById('reviewLightbox');
  const modalImg = document.getElementById('reviewLightboxImg') as HTMLImageElement | null;
  const modalRich = document.getElementById('reviewLightboxRich');
  const closeBtn = document.getElementById('reviewLightboxClose');
  const backdrop = document.getElementById('reviewLightboxBackdrop');
  if (!modal || (!modalImg && !modalRich)) return;

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openModal = (card: HTMLElement) => {
    if (modalImg) {
      modalImg.src = '';
      modalImg.hidden = true;
    }
    if (modalRich) {
      const authorEl = document.createElement('strong');
      authorEl.textContent = card.dataset.author || 'Cliente Google Maps';
      const timeEl = document.createElement('small');
      timeEl.style.color = '#6B524C';
      timeEl.textContent = card.dataset.time || 'Avaliação no Google Maps';
      const textEl = document.createElement('p');
      textEl.style.margin = '0';
      textEl.textContent = card.dataset.fullText || '';
      modalRich.replaceChildren(authorEl, timeEl, textEl);
      modalRich.hidden = false;
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  if (!modal.dataset.bound) {
    modal.dataset.bound = 'true';
    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }
  bindCardLightboxTriggers(root, openModal);
}
