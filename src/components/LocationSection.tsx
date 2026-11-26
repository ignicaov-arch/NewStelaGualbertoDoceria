import { BRAND } from '../data/brand';
import { buildWhatsAppUrl, sanitizeUrl } from '../domain/whatsapp';

export function LocationSection() {
  const mapsHref = sanitizeUrl(BRAND.googleMapsUrl);
  const instagramHref = sanitizeUrl(BRAND.instagramUrl);
  const whatsappHref = buildWhatsAppUrl(
    'Olá! Gostaria de confirmar o horário da vitrine hoje na Av. Divino Espírito Santo.',
  );

  return (
    <section id="endereco" className="secao endereco" style={{ backgroundColor: 'var(--areia)' }}>
      <div className="container">
        <div className="espaco">
          <div className="revela">
            <span className="eyebrow">Visite a loja no Centro</span>
            <h2 className="titulo-secao">
              Estamos na <em>Av. Divino Espírito Santo</em>, 826
            </h2>
            <p className="secao__resumo">{BRAND.address.full}</p>

            <ul className="espaco__lista" style={{ marginTop: '20px' }}>
              <li>
                <strong>Horários de atendimento:</strong> Ter-Sex 11h às 19h · Sáb-Dom 10h às 17h
              </li>
              <li>
                <strong>WhatsApp oficial:</strong>{' '}
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {BRAND.whatsappDisplay}
                </a>
              </li>
              <li>
                <strong>Instagram:</strong>{' '}
                <a href={instagramHref} target="_blank" rel="noopener noreferrer">
                  {BRAND.instagramHandle}
                </a>
              </li>
            </ul>

            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primario text-white"
              style={{ color: '#FDFBF8' }}
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21C15.5 17.4 19 14.1 19 10C19 6.1 15.9 3 12 3C8.1 3 5 6.1 5 10C5 14.1 8.5 17.4 12 21Z"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx={12}
                  cy={10}
                  r={2.5}
                  stroke="currentColor"
                  strokeWidth={1.8}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span>Abrir no Google Maps</span>
            </a>
          </div>

          <div className="espaco__moldura revela">
            <svg
              width={600}
              height={420}
              viewBox="0 0 600 420"
              fill="none"
              role="img"
              aria-label="Mapa ilustrativo da localização da Stela Gualberto Doceria no Centro de Divinópolis"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 'calc(var(--raio-grande) - var(--pad-card))',
                backgroundColor: '#F8F3EE',
              }}
            >
              <rect
                x={8}
                y={8}
                width={584}
                height={404}
                rx={20}
                fill="#FDFBF8"
                stroke="#E4D4C7"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M40 130H560M40 230H560M40 320H560M170 30V390M310 30V390M450 30V390"
                stroke="#EFE4DA"
                strokeWidth={10}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M55 215L545 145"
                stroke="#F2BEB3"
                strokeWidth={16}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={310}
                cy={178}
                r={54}
                fill="rgba(242, 190, 179, 0.34)"
                stroke="#B6493B"
                strokeWidth={1.4}
                strokeDasharray="6 6"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M310 210C325 194 338 180 338 164C338 148.5 325.5 136 310 136C294.5 136 282 148.5 282 164C282 180 295 194 310 210Z"
                fill="#B6493B"
                stroke="#32221F"
                strokeWidth={1.6}
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={310}
                cy={164}
                r={9}
                fill="#FDFBF8"
                stroke="#32221F"
                strokeWidth={1.4}
                vectorEffect="non-scaling-stroke"
              />
              <rect
                x={140}
                y={260}
                width={320}
                height={76}
                rx={18}
                fill="#32221F"
                stroke="#C89F62"
                strokeWidth={1.4}
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={300}
                y={292}
                textAnchor="middle"
                fill="#F8F3EE"
                fontSize={16}
                fontWeight={700}
              >
                Stela Gualberto Doceria
              </text>
              <text x={300} y={316} textAnchor="middle" fill="#F2BEB3" fontSize={13}>
                Av. Divino Espírito Santo, 826 · Centro
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
