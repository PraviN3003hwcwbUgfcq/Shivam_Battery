import { brands } from '../../config/products'

export default function BrandMarquee() {
  return (
    <section className="brands" aria-label="Brands we sell">
      <div className="container brands__inner">
        <p className="brands__label">Brands we sell</p>
        <div className="marquee">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="marquee__group" aria-hidden={copy === 1 ? true : undefined}>
                {brands.map((b) => (
                  <li key={b} className="marquee__item">
                    {b}
                  </li>
                ))}
                <li className="marquee__item marquee__item--more">+ more brands</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
