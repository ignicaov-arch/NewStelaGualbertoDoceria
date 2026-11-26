import { evaluateStoreStatus } from '../domain/schedule';
import {
  buildOrderWhatsAppMessage,
  buildWhatsAppUrl,
  estimateCelebrationOrder,
} from '../domain/whatsapp';
import { initCookieConsent } from './lgpdConsent';

function hydrateStoreStatus(): void {
  const status = evaluateStoreStatus();

  const heroStatus = document.querySelector<HTMLElement>('.hero__status');
  if (heroStatus) {
    const dot = heroStatus.querySelector<HTMLElement>('.hero__status-dot');
    const textSpan = heroStatus.querySelector<HTMLElement>('span:last-child');
    if (dot) {
      dot.classList.toggle('is-open', status.isOpen);
    }
    if (textSpan) {
      textSpan.textContent = `${status.badgeText} · ${status.detailText}`;
    }
  }

  const lbStatus = document.querySelector<HTMLElement>('[data-store-status]');
  if (lbStatus) {
    const dot = lbStatus.querySelector<HTMLElement>('[data-store-status-dot]');
    const textEl = lbStatus.querySelector<HTMLElement>('[data-store-status-text]');
    if (dot) {
      dot.classList.toggle('is-open', status.isOpen);
    }
    if (textEl) {
      textEl.textContent = `${status.badgeText} · ${status.detailText}`;
    }
  }
}

function setupStickyHeaderState(): void {
  const header = document.querySelector<HTMLElement>('.topo');
  if (!header) return;

  const updateState = () => {
    header.classList.toggle('is-rolou', window.scrollY > 24);
  };

  updateState();
  window.addEventListener('scroll', updateState, { passive: true });
}

function setupFaqAccordion(): void {
  const items = Array.from(document.querySelectorAll<HTMLDetailsElement>('details.pergunta'));
  items.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      items.forEach((other) => {
        if (other !== detail) {
          other.open = false;
        }
      });
    });
  });
}

function setupOrderSimulator(): void {
  const form = document.getElementById('form-encomenda');
  if (!(form instanceof HTMLFormElement)) return;

  const tipoSelect = document.getElementById('tipo');
  const dataInput = document.getElementById('data');
  const convidadosSelect = document.getElementById('convidados');
  const pesoEl = document.getElementById('estimativa-peso');
  const docesEl = document.getElementById('estimativa-doces');
  const sugestaoEl = document.getElementById('estimativa-sugestao');

  const refreshEstimate = () => {
    const occasion = tipoSelect instanceof HTMLSelectElement ? tipoSelect.value : 'Aniversário';
    const guestTier =
      convidadosSelect instanceof HTMLSelectElement ? convidadosSelect.value : 'Até 15 convidados';
    const estimate = estimateCelebrationOrder(occasion, guestTier);

    if (pesoEl) pesoEl.textContent = estimate.cakeKg;
    if (docesEl) docesEl.textContent = String(estimate.sweetsCount);
    if (sugestaoEl) sugestaoEl.textContent = estimate.suggestion;
  };

  tipoSelect?.addEventListener('change', refreshEstimate);
  convidadosSelect?.addEventListener('change', refreshEstimate);
  refreshEstimate();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const occasion = tipoSelect instanceof HTMLSelectElement ? tipoSelect.value : 'Aniversário';
    const dateText = dataInput instanceof HTMLInputElement ? dataInput.value : '';
    const guestTier =
      convidadosSelect instanceof HTMLSelectElement ? convidadosSelect.value : 'Até 15 convidados';

    const message = buildOrderWhatsAppMessage(occasion, dateText, guestTier);
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

function setupCookieModalDismiss(): void {
  const modal = document.querySelector<HTMLElement>('[data-cookie-modal]');
  if (!modal) return;

  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
  };

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}

hydrateStoreStatus();
setupStickyHeaderState();
setupFaqAccordion();
setupOrderSimulator();
initCookieConsent();
setupCookieModalDismiss();
