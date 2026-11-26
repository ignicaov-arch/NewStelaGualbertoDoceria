import { describe, expect, it } from 'vitest';
import { evaluateStoreStatus } from '../src/domain/schedule';

function saoPauloDate(isoLocal: string): Date {
  return new Date(`${isoLocal}-03:00`);
}

describe('evaluateStoreStatus', () => {
  it('indica fechado na segunda-feira durante todo o dia', () => {
    const monday = evaluateStoreStatus(saoPauloDate('2026-11-23T14:00:00'));
    expect(monday.isOpen).toBe(false);
    expect(monday.badgeText).toBe('Fechado hoje');
  });

  it('avalia corretamente terça a sexta antes, durante e após o expediente', () => {
    const tuesdayMorning = evaluateStoreStatus(saoPauloDate('2026-11-24T09:30:00'));
    expect(tuesdayMorning.isOpen).toBe(false);
    expect(tuesdayMorning.badgeText).toBe('Abre hoje às 11h');

    const wednesdayAfternoon = evaluateStoreStatus(saoPauloDate('2026-11-25T15:00:00'));
    expect(wednesdayAfternoon.isOpen).toBe(true);
    expect(wednesdayAfternoon.badgeText).toBe('Aberto agora');

    const thursdayNight = evaluateStoreStatus(saoPauloDate('2026-11-26T20:15:00'));
    expect(thursdayNight.isOpen).toBe(false);
    expect(thursdayNight.detailText).toContain('amanhã às 11h');

    const fridayNight = evaluateStoreStatus(saoPauloDate('2026-11-27T19:00:00'));
    expect(fridayNight.isOpen).toBe(false);
    expect(fridayNight.detailText).toContain('sábado às 10h');
  });

  it('avalia corretamente sábado e domingo antes, durante e após o expediente', () => {
    const satMorning = evaluateStoreStatus(saoPauloDate('2026-11-28T09:00:00'));
    expect(satMorning.isOpen).toBe(false);
    expect(satMorning.badgeText).toBe('Abre hoje às 10h');

    const satAfternoon = evaluateStoreStatus(saoPauloDate('2026-11-28T13:30:00'));
    expect(satAfternoon.isOpen).toBe(true);
    expect(satAfternoon.badgeText).toBe('Aberto agora');

    const satEvening = evaluateStoreStatus(saoPauloDate('2026-11-28T18:00:00'));
    expect(satEvening.isOpen).toBe(false);
    expect(satEvening.detailText).toContain('domingo às 10h');

    const sunEvening = evaluateStoreStatus(saoPauloDate('2026-11-29T17:30:00'));
    expect(sunEvening.isOpen).toBe(false);
    expect(sunEvening.detailText).toContain('terça-feira às 11h');
  });

  it('funciona com data padrão quando nenhum argumento é informado', () => {
    const current = evaluateStoreStatus();
    expect(typeof current.isOpen).toBe('boolean');
    expect(current.badgeText.length).toBeGreaterThan(0);
    expect(current.detailText.length).toBeGreaterThan(0);
  });
});
