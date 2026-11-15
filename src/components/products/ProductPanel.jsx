import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../Icon'
import ProductImage from '../ProductImage'
import { business } from '../../config/business'
import { categoryById } from '../../config/products'
import { priceLabel } from '../../utils/format'
import { productMessage, waLink } from '../../utils/whatsapp'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export default function ProductPanel({ product, onClose }) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [requirement, setRequirement] = useState('')
  const closeRef = useRef(null)

  useEffect(() => setRequirement(''), [product?.id])

  useEffect(() => {
    if (!product) return
    const previous = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [product, onClose])

  const offscreen = isMobile ? { y: '100%' } : { x: '100%' }
  const onscreen = isMobile ? { y: 0 } : { x: 0 }
  const category = product && categoryById[product.category]

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            key="overlay"
            className="panel-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            key="panel"
            className="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="panel-title"
            initial={offscreen}
            animate={onscreen}
            exit={offscreen}
            transition={{ type: 'spring', damping: 34, stiffness: 320 }}
          >
            <div className="panel__top">
              <span className="eyebrow">{category.name}</span>
              <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close product details">
                <Icon name="close" />
              </button>
            </div>

            <motion.div
              className="panel__media"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <ProductImage product={product} />
            </motion.div>

            <div className="panel__body">
              <div>
                <p className="panel__brand">{product.brand}</p>
                <h2 id="panel-title" className="panel__title">
                  {product.name}
                </h2>
                {product.model && <p className="panel__model">{product.model}</p>}
              </div>
              <p className="panel__summary">{product.summary}</p>

              <dl className="specs">
                {product.specs.map((s) => (
                  <div key={s.label} className="specs__row">
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="panel__price">
                <span>Price</span>
                <strong>{priceLabel(product)}</strong>
              </div>

              <label className="field">
                <span className="field__label">
                  Your vehicle model or requirement <em>(optional)</em>
                </span>
                <input
                  className="input"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder={category.placeholder}
                  maxLength={160}
                />
              </label>

              <div className="panel__actions">
                <a
                  className="btn btn--wa btn--lg btn--block"
                  href={waLink(productMessage(product, requirement))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" />
                  Enquire on WhatsApp
                </a>
                <a className="btn btn--ghost btn--block" href={`tel:${business.phone.tel}`}>
                  <Icon name="phone" />
                  Call {business.phone.display}
                </a>
              </div>
              <p className="panel__note">
                You review the message in WhatsApp before sending. The shop confirms fit, price and stock.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
