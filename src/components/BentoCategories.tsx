import { BRAND } from '../data/brand';
import { BENTO_CATEGORIES } from '../data/catalog';
import { buildWhatsAppUrl } from '../domain/whatsapp';

export function BentoCategories() {
  const customOrderHref = buildWhatsAppUrl(
    `Olá! Quero montar uma encomenda personalizada na ${BRAND.fullName}.`,
  );

  return (
    <section id="linhas" className="secao">
      <div className="container">
        <div className="secao__cabecalho">
          <div>
            <span className="eyebrow">Linhas da casa</span>
            <h2 className="titulo-secao">
              Receitas para <em>vitrine</em>, mesa posta e presentes
            </h2>
          </div>
          <p className="secao__resumo">
            Cada linha respeita o equilíbrio entre massa leve, chocolate nobre e doçura na medida certa para quem busca confeitaria artesanal em {BRAND.address.city}.
          </p>
        </div>

        <div className="bento">
          {BENTO_CATEGORIES.map((category, index) => {
            const isFeatured = index === 0 || index === 1;
            return (
              <article
                key={category.id}
                className={`festa ${isFeatured ? 'festa--destaque' : ''}`}
              >
                <div>
                  <div className="festa__foto-wrap">
                    <img
                      src={category.image}
                      srcSet={`${category.image800} 800w, ${category.image} 1200w`}
                      sizes="(max-width: 860px) 100vw, 45vw"
                      width={1200}
                      height={750}
                      loading="lazy"
                      decoding="async"
                      alt={category.alt}
                      className="festa__foto"
                    />
                  </div>
                  <span className="festa__tag">{category.tag}</span>
                  <h3 className="festa__titulo">{category.title}</h3>
                  <p className="festa__desc">{category.description}</p>
                </div>

                <a
                  href={category.href}
                  className="festa__link text-current"
                  style={{ color: '#B6493B' }}
                >
                  <span>{category.subtitle}</span>
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8H13M9 4L13 8L9 12"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </a>
              </article>
            );
          })}

          <article className="festa festa--extra">
            <div>
              <span className="festa__tag">Atendimento sob medida</span>
              <h3 className="festa__titulo">
                Precisa combinar bolo, doces finos e latas na mesma data?
              </h3>
              <p className="festa__desc">
                Nossa equipe ajuda a calcular quantidades por convidado, ajustar sabores e reservar sua entrega ou retirada na {BRAND.address.street}.
              </p>
            </div>
            <div className="festa__acoes">
              <a
                href={customOrderHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primario text-white"
                style={{ color: '#FDFBF8' }}
              >
                <span>Conversar no WhatsApp</span>
              </a>
              <a
                href="#encomendas"
                className="btn btn--secundario text-current"
                style={{ color: '#32221F' }}
              >
                <span>Simular quantidade</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
