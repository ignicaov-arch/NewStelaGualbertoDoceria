import { BRAND } from '../data/brand';
import { ATELIER_HIGHLIGHTS, ATELIER_NUMBERS } from '../data/catalog';

function splitCounterValue(raw: string): { numeric: string; suffix: string } {
  const match = raw.trim().match(/^(\d+)(.*)$/);
  if (!match) {
    return { numeric: '0', suffix: raw };
  }
  return { numeric: match[1], suffix: match[2] };
}

export function AtelierSection() {
  return (
    <section id="doceria" className="secao">
      <div className="container">
        <div className="espaco">
          <div className="espaco__moldura">
            <img
              src="/img/vitrine.webp"
              srcSet="/img/vitrine-800.webp 800w, /img/vitrine.webp 1200w"
              sizes="(max-width: 860px) 100vw, 48vw"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              alt={`Vitrine de doces e bolos na loja da ${BRAND.fullName} em ${BRAND.address.city}`}
              className="espaco__foto"
            />
            <div className="espaco__selo">
              {BRAND.address.street} · {BRAND.address.neighborhood} · {BRAND.address.city}
            </div>
          </div>

          <div>
            <span className="eyebrow">A Doceria</span>
            <h2 className="titulo-secao">
              Produção diária com assinatura <em>{BRAND.founder}</em>
            </h2>
            <p className="secao__resumo">
              De terça a domingo, nossa cozinha prepara bases frescas, recheios cozidos no ponto e acabamento artesanal para pronta entrega e festas.
            </p>

            <ul className="espaco__lista">
              {ATELIER_HIGHLIGHTS.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="espaco__numeros">
          {ATELIER_NUMBERS.map((metric) => {
            const { numeric, suffix } = splitCounterValue(metric.value);
            return (
              <div key={metric.label} className="espaco__metrica">
                <strong
                  className="conta"
                  data-ate={numeric}
                  data-sufixo={suffix}
                >
                  {metric.value}
                </strong>
                <span>{metric.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
