import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounter(el: HTMLElement): void {
  const target = Number(el.dataset.ate || '0');
  const suffix = el.dataset.sufixo ?? '';
  if (!target || prefersReducedMotion) {
    if (target) {
      el.textContent = `${target}${suffix}`;
    }
    return;
  }

  const start = performance.now();
  const duration = 1200;

  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

function setupScrollReveals(): void {
  const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('.revela'));
  const counterNodes = Array.from(document.querySelectorAll<HTMLElement>('.conta[data-ate]'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach((node) => node.classList.add('is-visivel'));
    counterNodes.forEach((node) => animateCounter(node));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        const parent = target.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((child) =>
            child.classList.contains('revela'),
          );
          const idx = siblings.indexOf(target);
          if (idx > 0) {
            target.style.transitionDelay = `${Math.min(idx * 50, 250)}ms`;
          }
        }
        target.classList.add('is-visivel');
        revealObserver.unobserve(target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -28px 0px' },
  );

  revealNodes.forEach((node) => revealObserver.observe(node));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target as HTMLElement);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  counterNodes.forEach((node) => counterObserver.observe(node));
}

function resolveHashTarget(href: string | null): HTMLElement | null {
  if (!href) return null;
  if (href.startsWith('#') && href.length > 1) {
    return document.querySelector<HTMLElement>(href);
  }
  if (href.startsWith('/#') && window.location.pathname === '/') {
    return document.querySelector<HTMLElement>(href.slice(1));
  }
  return null;
}

function setupLenis144Hz(): void {
  const lenis = new Lenis({
    lerp: 0.082,
    smoothWheel: true,
    wheelMultiplier: 1.05,
    touchMultiplier: 1.35,
    autoRaf: false,
    respectReducedMotion: false,
    prevent: (node: HTMLElement) =>
      Boolean(node.closest('[data-lenis-prevent], [role="dialog"], dialog')),
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  if (!prefersReducedMotion) {
    const heroBrand = document.querySelector<HTMLElement>('.hero__marca');
    if (heroBrand) {
      gsap.to(heroBrand, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }
  }

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = resolveHashTarget(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, {
        offset: -92,
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    });
  });

  let resizeTimer = 0;
  const resizeObserver = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
  resizeObserver.observe(document.body);
}

setupScrollReveals();
setupLenis144Hz();
