import { buildWhatsAppUrl } from '../domain/whatsapp';

export function WhatsAppFloat() {
  const href = buildWhatsAppUrl(
    'Olá! Vim pelo site da Stela Gualberto Doceria e gostaria de atendimento.',
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Stela Gualberto Doceria no WhatsApp"
      className="zap-flutuante bottom-6 right-6 z-50 text-white"
      style={{
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        right: '24px',
        bottom: '24px',
        zIndex: 50,
        boxShadow: '0 14px 30px -8px rgba(37, 211, 102, 0.55)',
      }}
    >
      <svg width={30} height={30} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 13.73 3.49 15.35 4.34 16.72L3.25 20.75L7.38 19.68C8.72 20.52 10.3 21 12 21Z"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M9.4 8.9C9.2 8.5 9 8.5 8.8 8.5H8.3C8.1 8.5 7.8 8.6 7.6 8.8C7.4 9.1 6.8 9.6 6.8 10.7C6.8 11.8 7.6 12.9 7.7 13C7.8 13.2 9.2 15.4 11.4 16.3C13.2 17 13.6 16.9 14 16.8C14.4 16.7 15.3 16.2 15.5 15.6C15.7 15 15.7 14.5 15.6 14.4C15.5 14.3 15.3 14.2 15 14.1C14.7 13.9 13.6 13.4 13.4 13.3C13.2 13.2 13 13.2 12.9 13.4C12.7 13.7 12.3 14.1 12.2 14.3C12 14.4 11.9 14.5 11.6 14.3C11.3 14.2 10.5 13.9 9.5 13C8.7 12.3 8.2 11.4 8.1 11.2C7.9 10.9 8.1 10.8 8.2 10.6C8.3 10.5 8.5 10.3 8.6 10.1C8.7 10 8.8 9.8 8.9 9.7C9 9.5 8.9 9.4 8.8 9.2L9.4 8.9Z"
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </a>
  );
}
