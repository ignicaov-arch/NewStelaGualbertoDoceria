export interface StoreStatus {
  readonly isOpen: boolean;
  readonly badgeText: string;
  readonly detailText: string;
}

const TIMEZONE = 'America/Sao_Paulo';

interface ZonedParts {
  readonly weekday: string;
  readonly minutesOfDay: number;
}

function getSaoPauloParts(now: Date): ZonedParts {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(now);
  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? 'Mon';
  const hourStr = parts.find((part) => part.type === 'hour')?.value ?? '00';
  const minuteStr = parts.find((part) => part.type === 'minute')?.value ?? '00';

  const hour = Number.parseInt(hourStr, 10) % 24;
  const minute = Number.parseInt(minuteStr, 10);

  return {
    weekday,
    minutesOfDay: hour * 60 + minute,
  };
}

const WEEKDAY_OPEN = 11 * 60;
const WEEKDAY_CLOSE = 19 * 60;
const WEEKEND_OPEN = 10 * 60;
const WEEKEND_CLOSE = 17 * 60;

export function evaluateStoreStatus(now: Date = new Date()): StoreStatus {
  const { weekday, minutesOfDay } = getSaoPauloParts(now);

  if (weekday === 'Mon') {
    return {
      isOpen: false,
      badgeText: 'Fechado hoje',
      detailText: 'Segunda-feira de pausa · Abrimos terça às 11h',
    };
  }

  if (weekday === 'Sat' || weekday === 'Sun') {
    if (minutesOfDay >= WEEKEND_OPEN && minutesOfDay < WEEKEND_CLOSE) {
      return {
        isOpen: true,
        badgeText: 'Aberto agora',
        detailText: 'Vitrine hoje até 17h · Av. Divino Espírito Santo, 826',
      };
    }

    if (minutesOfDay < WEEKEND_OPEN) {
      return {
        isOpen: false,
        badgeText: 'Abre hoje às 10h',
        detailText: 'Sábado e domingo das 10h às 17h',
      };
    }

    return {
      isOpen: false,
      badgeText: 'Fechado agora',
      detailText: weekday === 'Sat' ? 'Abrimos domingo às 10h' : 'Abrimos terça-feira às 11h',
    };
  }

  if (minutesOfDay >= WEEKDAY_OPEN && minutesOfDay < WEEKDAY_CLOSE) {
    return {
      isOpen: true,
      badgeText: 'Aberto agora',
      detailText: 'Vitrine hoje até 19h · Av. Divino Espírito Santo, 826',
    };
  }

  if (minutesOfDay < WEEKDAY_OPEN) {
    return {
      isOpen: false,
      badgeText: 'Abre hoje às 11h',
      detailText: 'Terça a sexta das 11h às 19h',
    };
  }

  return {
    isOpen: false,
    badgeText: 'Fechado agora',
    detailText: weekday === 'Fri' ? 'Abrimos sábado às 10h' : 'Abrimos amanhã às 11h',
  };
}
