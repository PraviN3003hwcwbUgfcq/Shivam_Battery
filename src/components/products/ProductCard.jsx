import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../Icon'
import ProductImage from '../ProductImage'
import { categoryById } from '../../config/products'
import { priceLabel } from '../../utils/format'
import { productMessage, waLink } from '../../utils/whatsapp'
import { ease } from '../../utils/motion'

const ProductCard = forwardRef(function ProductCard({ product, search = '' }, ref) {
  const detailsTo = `/products/${product.id}${search}`
  return (
    <motion.article
      ref={ref}
      layout
      className="product-card"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease }}
    >
      <Link to={detailsTo} className="product-card__media" tabIndex={-1} aria-hidden="true">
        <span className="product-card__tag">{categoryById[product.category].name}</span>
        <ProductImage product={product} />
      </Link>

      <div className="product-card__body">
        <p className="product-card__brand">{product.brand}</p>
        <h3 className="product-card__name">
          <Link to={detailsTo}>{product.name}</Link>
        </h3>
        {product.model && <p className="product-card__model">{product.model}</p>}

        <ul className="product-card__specs">
          {product.specs.slice(0, 2).map((s) => (
            <li key={s.label}>
              <Icon name="check" />
              <span>{s.value}</span>
            </li>
          ))}
        </ul>

        <div className="product-card__price">
          <span>Price</span>
          <strong>{priceLabel(product)}</strong>
        </div>

        <div className="product-card__actions">
          <Link to={detailsTo} className="btn btn--ghost btn--sm" aria-label={`View details: ${product.name}`}>
            View details
          </Link>
          <a
            className="btn btn--wa btn--sm"
            href={waLink(productMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire on WhatsApp about ${product.name}`}
          >
            <Icon name="whatsapp" />
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  )
})

export default ProductCard
