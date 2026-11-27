import {
  buildSingleMarqueeRow,
  filterLatestFiveStarReviews,
  splitDualMarqueeRows,
  type GoogleReviewsPayload,
} from '../domain/googleReviews';
import {
  bindAvatarErrorFallbacks,
  createDomReviewCard,
  populateDomTrack,
} from './googleReviewsDom';
import { bindReviewLightbox } from './googleReviewsLightbox';

function bindMarqueeMotionAndPause(section: HTMLElement): void {
  const container = section.querySelector<HTMLElement>('.testimonials-marquee-container');
  const pauseBtn = section.querySelector<HTMLButtonElement>('[data-reviews-pause]');

  if (pauseBtn && container && !pauseBtn.dataset.bound) {
    pauseBtn.dataset.bound = 'true';
    const baseLabel = pauseBtn.textContent?.trim() || 'Pausar rolagem';
    pauseBtn.addEventListener('click', () => {
      const nextPaused = !container.classList.contains('is-paused');
      container.classList.toggle('is-paused', nextPaused);
      pauseBtn.setAttribute('aria-pressed', String(nextPaused));
      pauseBtn.textContent = nextPaused
        ? baseLabel.includes('rolagem')
          ? 'Retomar rolagem'
          : 'Retomar'
        : baseLabel;
    });
  }

  section.querySelectorAll<HTMLElement>('.marquee-track').forEach((track) => {
    if (track.dataset.rafBound) return;
    track.dataset.rafBound = 'true';
    let last = performance.now();
    let offset = 0;
    let hovered = false;
    track.addEventListener('mouseenter', () => {
      hovered = true;
    });
    track.addEventListener('mouseleave', () => {
      hovered = false;
    });

    window.setTimeout(() => {
      const style = window.getComputedStyle(track);
      const isLtr = Boolean(track.closest('.marquee-ltr'));
      if (style.animationDuration !== '0.01ms' && style.animationName !== 'none') return;
      const half = track.scrollWidth / 2;
      if (half <= 0) return;
      if (isLtr) offset = -half;
      const step = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        const paused = hovered || Boolean(container?.classList.contains('is-paused'));
        if (!paused) {
          offset = isLtr
            ? offset + 54 * dt >= 0
              ? -half
              : offset + 54 * dt
            : Math.abs(offset - 54 * dt) >= half
              ? 0
              : offset - 54 * dt;
          track.style.transform = `translate3d(${offset.toFixed(1)}px, 0, 0)`;
        }
        window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }, 350);
  });
}

function applyPayloadToSection(section: HTMLElement, payload: GoogleReviewsPayload): void {
  const limit = Number(section.getAttribute('data-max-reviews') || 20);
  const isSingle = section.getAttribute('data-reviews-layout') === 'single';
  const fiveStars = filterLatestFiveStarReviews(payload.reviews, limit);
  if (!payload.verified || fiveStars.length === 0) return;

  const badge = section.querySelector<HTMLElement>('[data-reviews-badge]');
  if (badge && payload.rating && payload.userRatingCount) {
    badge.textContent = `Avaliações verificadas · Nota ${Number(payload.rating).toFixed(1)} (${payload.userRatingCount} no Google)`;
  }

  const marqueeBox = section.querySelector<HTMLElement>('.testimonials-marquee-container');
  const staticGrid = section.querySelector<HTMLElement>('[data-reviews-static]');
  const row1 = section.querySelector<HTMLElement>('[data-reviews-row="1"]');
  const row2 = section.querySelector<HTMLElement>('[data-reviews-row="2"]');

  if (isSingle) {
    const plan = buildSingleMarqueeRow(fiveStars);
    if (plan.mode === 'static' && staticGrid && marqueeBox) {
      marqueeBox.hidden = true;
      staticGrid.hidden = false;
      staticGrid.replaceChildren(...plan.row1.map((r, i) => createDomReviewCard(r, i, true, false)));
    } else if (plan.mode === 'single' && row1 && marqueeBox) {
      if (staticGrid) staticGrid.hidden = true;
      marqueeBox.hidden = false;
      populateDomTrack(row1, plan.row1, true, 0);
    }
  } else {
    const plan = splitDualMarqueeRows(fiveStars);
    if (plan.mode === 'dual' && row1 && row2 && marqueeBox) {
      if (staticGrid) staticGrid.hidden = true;
      marqueeBox.hidden = false;
      populateDomTrack(row1, plan.row1, false, 0);
      populateDomTrack(row2, plan.row2, false, 2);
    }
  }
  section.hidden = false;
}

/** Hidrata avaliações 5 estrelas no cliente, vincula modal e pausa acessível. */
export async function hydrateGoogleReviews(): Promise<void> {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-google-reviews]'));
  if (sections.length === 0) return;

  sections.forEach((section) => {
    bindAvatarErrorFallbacks(section);
    bindReviewLightbox(section);
    bindMarqueeMotionAndPause(section);
  });

  for (const url of ['/api/google-reviews', '/data/google-reviews.json']) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const payload = (await res.json()) as GoogleReviewsPayload;
      if (payload?.verified && Array.isArray(payload.reviews) && payload.reviews.length > 0) {
        sections.forEach((section) => {
          applyPayloadToSection(section, payload);
          bindReviewLightbox(section);
        });
        break;
      }
    } catch {
      // Mantém SSR estático pré-renderizado sem interromper UX.
    }
  }
}
