import { describe, expect, it } from 'vitest';
import {
  buildOrderWhatsAppMessage,
  buildWhatsAppUrl,
  estimateCelebrationOrder,
  formatPhoneDisplay,
  sanitizeUrl,
} from '../src/domain/whatsapp';

describe('sanitizeUrl', () => {
  it('permite protocolos seguros, caminhos relativos e âncoras', () => {
    expect(sanitizeUrl('https://wa.me/5537999232526')).toBe('https://wa.me/5537999232526');
    expect(sanitizeUrl('http://localhost:4321/linkbio')).toBe('http://localhost:4321/linkbio');
    expect(sanitizeUrl('/linkbio')).toBe('/linkbio');
    expect(sanitizeUrl('#encomendas')).toBe('#encomendas');
  });

  it('bloqueia esquemas perigosos, vazios e URLs malformadas', () => {
    expect(sanitizeUrl('')).toBe('#');
    expect(sanitizeUrl('   ')).toBe('#');
    expect(sanitizeUrl('javascript:alert(1)')).toBe('#');
    expect(sanitizeUrl('  JAVASCRIPT:void(0)')).toBe('#');
    expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('#');
    expect(sanitizeUrl('vbscript:msgbox(1)')).toBe('#');
    expect(sanitizeUrl('//evil.example.com')).toBe('#');
    expect(sanitizeUrl('ftp://example.com/arquivo')).toBe('#');
    expect(sanitizeUrl('not a valid url')).toBe('#');
  });
});

describe('formatPhoneDisplay', () => {
  it('formata números brasileiros com ou sem DDI 55', () => {
    expect(formatPhoneDisplay('5537999232526')).toBe('(37) 99923-2526');
    expect(formatPhoneDisplay('37999232526')).toBe('(37) 99923-2526');
    expect(formatPhoneDisplay('3732211234')).toBe('(37) 3221-1234');
    expect(formatPhoneDisplay(' 12345 ')).toBe('12345');
  });
});

describe('buildWhatsAppUrl e orçamento de celebração', () => {
  it('gera URL do WhatsApp com e sem mensagem codificada', () => {
    expect(buildWhatsAppUrl()).toBe('https://wa.me/5537999232526');
    expect(buildWhatsAppUrl('   ')).toBe('https://wa.me/5537999232526');
    expect(buildWhatsAppUrl('Olá Stela!')).toBe(
      'https://wa.me/5537999232526?text=Ol%C3%A1%20Stela!',
    );
  });

  it('estima porções para todas as faixas e presentes', () => {
    expect(estimateCelebrationOrder('Presente Especial', 'Até 15 convidados').sweetsCount).toBe(24);
    expect(estimateCelebrationOrder('Aniversário', 'Até 15 convidados').cakeKg).toBe('1,5 kg');
    expect(estimateCelebrationOrder('Aniversário', '15 a 30 convidados').cakeKg).toBe('2,5 kg');
    expect(estimateCelebrationOrder('Evento Corporativo', '30 a 60 convidados').sweetsCount).toBe(
      120,
    );
    expect(estimateCelebrationOrder('Casamento e Noivado', 'Acima de 60 convidados').cakeKg).toBe(
      '5,0 kg+',
    );
  });

  it('monta mensagem completa e com fallbacks padrão', () => {
    const filled = buildOrderWhatsAppMessage('Aniversário', '12/12/2026', '15 a 30 convidados');
    expect(filled).toContain('Ocasião: Aniversário');
    expect(filled).toContain('Data prevista: 12/12/2026');
    expect(filled).toContain('2,5 kg');

    const fallback = buildOrderWhatsAppMessage('', '', '');
    expect(fallback).toContain('Ocasião: Celebração');
    expect(fallback).toContain('Data prevista: data a definir');
    expect(fallback).toContain('Até 15 convidados');
  });
});
