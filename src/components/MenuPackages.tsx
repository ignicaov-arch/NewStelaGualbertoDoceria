import {
  CELEBRATION_BOX,
  MENU_CARDS,
  PORTION_GUIDE,
} from '../data/catalog';
import { buildWhatsAppUrl } from '../domain/whatsapp';

export function MenuPackages() {
  const celebrationHref = buildWhatsAppUrl(
    'Olá! Gostaria de ajuda para calcular as quantidades da minha mesa de doces e bolo.',
  );

  return (
    <section id="cardapio" className="secao menus">
      <div className="container">
        <div className="secao__cabecalho">
          <div>
            <span className="eyebrow">Cardápio & Encomendas</span>
            <h2 className="titulo-secao">
              Da fatia do dia à <em>mesa completa</em>
            </h2>
          </div>
          <p className="secao__resumo">
            Escolha entre os sabores da vitrine diária ou encomende bolos inteiros e doces finos com proporção pensada para o seu evento.
          </p>
        </div>

        <div className="menus__grid">
          {MENU_CARDS.map((card) => (
            <article key={card.id} className="menu-card">
              <div>
                <span className="festa__tag" style={{ color: '#F2BEB3' }}>
                  {card.badge}
                </span>
                <h3 className="menu-card__titulo">{card.title}</h3>
                <p style={{ margin: '0 0 12px', color: 'rgba(248, 243, 238, 0.8)' }}>
                  {card.description}
                </p>
                <ul className="menu-card__itens">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <a
                href={buildWhatsAppUrl(card.whatsappTopic)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primario text-white"
                style={{ color: '#FDFBF8' }}
              >
                <span>{card.ctaLabel}</span>
              </a>
            </article>
          ))}
        </div>

        <div className="pacote">
          <div style={{ maxWidth: '64ch' }}>
            <span className="festa__tag" style={{ color: '#C89F62' }}>
              {CELEBRATION_BOX.subtitle}
            </span>
            <h3 style={{ margin: '6px 0 8px', fontSize: '1.5rem' }}>
              {CELEBRATION_BOX.title}
            </h3>
            <p style={{ margin: '0 0 10px', color: 'rgba(248, 243, 238, 0.84)' }}>
              {CELEBRATION_BOX.description}
            </p>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#F2BEB3' }}>
              {CELEBRATION_BOX.leadTimeNote}
            </p>
          </div>

          <a
            href={celebrationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secundario text-current"
            style={{ color: '#32221F' }}
          >
            <span>{CELEBRATION_BOX.ctaLabel}</span>
          </a>
        </div>

        <div className="tabela-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Convidados</th>
                <th scope="col">Bolo sugerido</th>
                <th scope="col">Doces finos</th>
                <th scope="col">Indicação</th>
              </tr>
            </thead>
            <tbody>
              {PORTION_GUIDE.map((tier) => (
                <tr key={tier.guests}>
                  <td>{tier.guests}</td>
                  <td>{tier.cakeWeight}</td>
                  <td>{tier.sweetsCount}</td>
                  <td>{tier.idealFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
