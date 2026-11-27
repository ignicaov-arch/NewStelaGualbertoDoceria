import {
  getAuthorInitial,
  getAvatarColor,
  type GoogleReviewItem,
} from '../domain/googleReviews';

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

function svgEl(tag: string, attrs: Record<string, string | number>): SVGElement {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attrs)) {
    node.setAttribute(key, String(value));
  }
  return node;
}

export function makeAvatarFallback(author: string, color: string): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = 'gmaps-avatar-fallback';
  span.style.backgroundColor = color;
  span.setAttribute('aria-hidden', 'true');
  span.textContent = getAuthorInitial(author);
  return span;
}

function createStarSvg(): SVGElement {
  const svg = svgEl('svg', {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: '#FBBC04',
    class: 'shrink-0',
    'aria-hidden': 'true',
  });
  svg.appendChild(svgEl('path', { d: STAR_PATH }));
  return svg;
}

function createDotsSvg(): SVGElement {
  const svg = svgEl('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: '#6B524C',
    class: 'shrink-0',
    'aria-hidden': 'true',
  });
  for (const cy of [5, 12, 19]) {
    svg.appendChild(svgEl('circle', { cx: 12, cy, r: 1.8 }));
  }
  return svg;
}

/** Constrói card acessível de avaliação 5 estrelas para trilha contínua. */
export function createDomReviewCard(
  review: GoogleReviewItem,
  index: number,
  isCompact: boolean,
  isClone: boolean,
): HTMLElement {
  const card = document.createElement('article');
  card.className = isCompact ? 'review-card review-card--compact' : 'review-card';
  card.dataset.author = review.authorName;
  card.dataset.time = review.relativeTime;
  card.dataset.fullText = review.text;
  if (isClone) {
    card.dataset.clone = 'true';
    card.setAttribute('aria-hidden', 'true');
    card.tabIndex = -1;
  } else {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Ler avaliação completa de ${review.authorName}`);
  }

  const top = document.createElement('div');
  top.className = 'gmaps-card-top';
  const wrap = document.createElement('div');
  wrap.className = 'gmaps-author-wrap';
  const color = getAvatarColor(index);

  if (review.authorPhoto.includes('lh3.googleusercontent.com')) {
    const img = document.createElement('img');
    img.className = 'gmaps-avatar';
    img.src = review.authorPhoto;
    img.alt = `Foto de ${review.authorName}`;
    img.width = 36;
    img.height = 36;
    img.loading = 'lazy';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener(
      'error',
      () => img.replaceWith(makeAvatarFallback(review.authorName, color)),
      { once: true },
    );
    wrap.appendChild(img);
  } else {
    wrap.appendChild(makeAvatarFallback(review.authorName, color));
  }

  const meta = document.createElement('div');
  meta.className = 'gmaps-author-meta';
  const nameEl = document.createElement('span');
  nameEl.className = 'gmaps-author-name';
  nameEl.textContent = review.authorName;
  const subEl = document.createElement('span');
  subEl.className = 'gmaps-author-sub';
  subEl.textContent = review.guideBadge.trim() || 'Avaliação verificada · Google Maps';
  meta.append(nameEl, subEl);
  wrap.appendChild(meta);
  top.append(wrap, createDotsSvg());

  const row = document.createElement('div');
  row.className = 'gmaps-rating-row';
  const stars = document.createElement('span');
  stars.className = 'gmaps-stars';
  stars.setAttribute('aria-label', '5 estrelas');
  for (let i = 0; i < 5; i++) stars.appendChild(createStarSvg());
  const timeEl = document.createElement('span');
  timeEl.className = 'gmaps-time';
  timeEl.textContent = review.relativeTime;
  row.append(stars, timeEl);

  const body = document.createElement('p');
  body.className = 'gmaps-text';
  body.textContent = review.text;

  card.append(top, row, body);
  return card;
}

/** Preenche trilha infinita com originais e clones aria-hidden para loop -50%. */
export function populateDomTrack(
  track: Element,
  items: readonly GoogleReviewItem[],
  isCompact: boolean,
  colorOffset = 0,
): void {
  const nodes: HTMLElement[] = [];
  items.forEach((rev, i) => nodes.push(createDomReviewCard(rev, i + colorOffset, isCompact, false)));
  items.forEach((rev, i) => nodes.push(createDomReviewCard(rev, i + colorOffset, isCompact, true)));
  track.replaceChildren(...nodes);
}

/** Garante inicial colorida caso avatar remoto falhe no navegador do visitante. */
export function bindAvatarErrorFallbacks(root: ParentNode): void {
  root.querySelectorAll<HTMLImageElement>('img.gmaps-avatar').forEach((img) => {
    if (img.dataset.errBound) return;
    img.dataset.errBound = 'true';
    const swap = () => {
      const initial = img.dataset.fallbackInitial || 'C';
      const color = img.dataset.fallbackColor || '#B6493B';
      img.replaceWith(makeAvatarFallback(initial, color));
    };
    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener('error', swap, { once: true });
  });
}
