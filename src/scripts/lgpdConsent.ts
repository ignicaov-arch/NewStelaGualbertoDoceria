export const LGPD_STORAGE_KEY = 'sg_doceria_lgpd_consent_v1';

export interface ConsentPrefs {
  readonly essential: true;
  readonly functional: boolean;
  readonly analytics: boolean;
  readonly updatedAt: string;
}

const DEFAULT_PREFS: Omit<ConsentPrefs, 'updatedAt'> = {
  essential: true,
  functional: false,
  analytics: false,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getSavedConsent(): ConsentPrefs | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(LGPD_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return null;
    }

    const functional = typeof parsed.functional === 'boolean' ? parsed.functional : false;
    const analytics = typeof parsed.analytics === 'boolean' ? parsed.analytics : false;
    const updatedAt =
      typeof parsed.updatedAt === 'string' && parsed.updatedAt
        ? parsed.updatedAt
        : new Date().toISOString();

    return {
      essential: true,
      functional,
      analytics,
      updatedAt,
    };
  } catch {
    return null;
  }
}

export function saveConsent(
  prefs: Partial<Pick<ConsentPrefs, 'functional' | 'analytics'>>,
): ConsentPrefs {
  const nextPrefs: ConsentPrefs = {
    essential: true,
    functional: Boolean(prefs.functional),
    analytics: Boolean(prefs.analytics),
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(LGPD_STORAGE_KEY, JSON.stringify(nextPrefs));
      window.dispatchEvent(
        new window.CustomEvent('sg:consent-updated', { detail: nextPrefs }),
      );
    } catch {
      // Storage indisponível no modo privado estrito.
    }
  }

  return nextPrefs;
}

function setVisible(element: Element | null, visible: boolean): void {
  if (!element || !(element instanceof HTMLElement)) {
    return;
  }
  element.hidden = !visible;
  element.setAttribute('aria-hidden', String(!visible));
}

function getToggle(name: 'functional' | 'analytics'): HTMLInputElement | null {
  if (typeof document === 'undefined') {
    return null;
  }
  return document.querySelector<HTMLInputElement>(`[data-cookie-toggle="${name}"]`);
}

function syncCheckboxes(prefs: Omit<ConsentPrefs, 'updatedAt'>): void {
  const functionalBox = getToggle('functional');
  const analyticsBox = getToggle('analytics');
  if (functionalBox) functionalBox.checked = prefs.functional;
  if (analyticsBox) analyticsBox.checked = prefs.analytics;
}

export function openCookiePreferences(): void {
  if (typeof document === 'undefined') {
    return;
  }
  syncCheckboxes(getSavedConsent() ?? DEFAULT_PREFS);
  setVisible(document.querySelector('[data-cookie-banner]'), false);
  setVisible(document.querySelector('[data-cookie-modal]'), true);
}

export function initCookieConsent(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const banner = document.querySelector('[data-cookie-banner]');
  const modal = document.querySelector('[data-cookie-modal]');
  const existing = getSavedConsent();

  syncCheckboxes(existing ?? DEFAULT_PREFS);
  setVisible(banner, !existing);
  setVisible(modal, false);

  document.querySelectorAll('[data-cookie-open]').forEach((el) => {
    el.addEventListener('click', () => openCookiePreferences());
  });

  const closeOverlays = () => {
    setVisible(banner, false);
    setVisible(modal, false);
  };

  document.querySelectorAll('[data-cookie-accept-all]').forEach((el) => {
    el.addEventListener('click', () => {
      saveConsent({ functional: true, analytics: true });
      closeOverlays();
    });
  });

  document.querySelectorAll('[data-cookie-reject-optional]').forEach((el) => {
    el.addEventListener('click', () => {
      saveConsent({ functional: false, analytics: false });
      closeOverlays();
    });
  });

  document.querySelectorAll('[data-cookie-save]').forEach((el) => {
    el.addEventListener('click', () => {
      saveConsent({
        functional: Boolean(getToggle('functional')?.checked),
        analytics: Boolean(getToggle('analytics')?.checked),
      });
      closeOverlays();
    });
  });
}
