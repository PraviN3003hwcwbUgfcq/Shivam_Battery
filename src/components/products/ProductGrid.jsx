import { AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, search }) {
  return (
    <div className="product-grid">
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} search={search} />
        ))}
      </AnimatePresence>
    </div>
  )
}
