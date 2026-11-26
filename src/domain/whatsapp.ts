import { BRAND } from '../data/brand';

export interface CelebrationEstimate {
  readonly cakeKg: string;
  readonly sweetsCount: number;
  readonly suggestion: string;
}

const BLOCKED_SCHEMES = ['javascript:', 'data:', 'vbscript:'];

export function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) {
    return '#';
  }

  const lower = trimmed.toLowerCase();
  for (const scheme of BLOCKED_SCHEMES) {
    if (lower.startsWith(scheme)) {
      return '#';
    }
  }

  if (trimmed.startsWith('#')) {
    return trimmed;
  }

  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
  } catch {
    return '#';
  }

  return '#';
}

export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  const localDigits = digits.startsWith('55') && digits.length >= 12 ? digits.slice(2) : digits;

  if (localDigits.length === 11) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 7)}-${localDigits.slice(7)}`;
  }

  if (localDigits.length === 10) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 6)}-${localDigits.slice(6)}`;
  }

  return raw.trim();
}

export function buildWhatsAppUrl(message?: string): string {
  const baseUrl = `https://wa.me/${BRAND.whatsappPrimary}`;
  const cleanMessage = message?.trim();
  if (!cleanMessage) {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(cleanMessage)}`;
}

export function estimateCelebrationOrder(
  occasion: string,
  guestTier: string,
): CelebrationEstimate {
  const normalizedTier = guestTier.toLowerCase();
  const normalizedOccasion = occasion.toLowerCase();
  const isGift = normalizedOccasion.includes('presente');

  if (isGift) {
    return {
      cakeKg: 'Mini bolo 800 g ou lata',
      sweetsCount: 24,
      suggestion: 'Caixa ou lata presenteável com 24 doces finos ou mini bolo autoral.',
    };
  }

  if (normalizedTier.includes('acima de 60') || normalizedTier.includes('60+')) {
    return {
      cakeKg: '5,0 kg+',
      sweetsCount: 200,
      suggestion: 'Bolo principal de 5 kg ou mais acompanhado de 200 doces finos variados.',
    };
  }

  if (normalizedTier.includes('30 a 60')) {
    return {
      cakeKg: '4,0 kg',
      sweetsCount: 120,
      suggestion: 'Bolo inteiro de 4 kg com 120 doces finos coordenados para a mesa.',
    };
  }

  if (normalizedTier.includes('15 a 30')) {
    return {
      cakeKg: '2,5 kg',
      sweetsCount: 60,
      suggestion: 'Bolo inteiro de 2,5 kg com 60 doces gourmet para servir com folga.',
    };
  }

  return {
    cakeKg: '1,5 kg',
    sweetsCount: 30,
    suggestion: 'Bolo inteiro de 1,5 kg acompanhado de 30 doces artesanais.',
  };
}

export function buildOrderWhatsAppMessage(
  occasion: string,
  dateText: string,
  guestTier: string,
): string {
  const cleanOccasion = occasion.trim() || 'Celebração';
  const cleanDate = dateText.trim() || 'data a definir';
  const cleanGuests = guestTier.trim() || 'Até 15 convidados';
  const estimate = estimateCelebrationOrder(cleanOccasion, cleanGuests);

  return [
    `Olá! Gostaria de consultar uma encomenda na ${BRAND.fullName}.`,
    `Ocasião: ${cleanOccasion}`,
    `Data prevista: ${cleanDate}`,
    `Público: ${cleanGuests}`,
    `Referência inicial: ${estimate.suggestion}`,
  ].join('\n');
}
