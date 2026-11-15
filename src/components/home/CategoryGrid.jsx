import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BatteryArt from '../BatteryArt'
import Icon from '../Icon'
import { categories, products } from '../../config/products'
import { inView, rise, stagger } from '../../utils/motion'

export default function CategoryGrid() {
  return (
    <motion.ul className="cat-grid" initial="hidden" whileInView="show" viewport={inView} variants={stagger(0.07)}>
      {categories.map((c) => {
        const brandCount = new Set(products.filter((p) => p.category === c.id).map((p) => p.brand)).size
        return (
          <motion.li key={c.id} variants={rise}>
            <Link to={`/products?category=${c.id}`} className="cat-tile">
              <div className="cat-tile__art">
                {c.image ? (
                  <img className="product-photo" src={c.image} alt="" loading="lazy" decoding="async" />
                ) : (
                  <BatteryArt variant={c.art} />
                )}
              </div>
              <h3>{c.name}</h3>
              <p>{c.blurb}</p>
              <span className="cat-tile__foot">
                {brandCount} brands
                <Icon name="arrow" />
              </span>
            </Link>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
