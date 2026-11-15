import { useState } from 'react'
import BatteryArt from './BatteryArt'
import { categoryById } from '../config/products'

export default function ProductImage({ product, className }) {
  const [failed, setFailed] = useState(false)
  const category = categoryById[product.category]

  if (product.image && !failed) {
    return (
      <img
        className={`product-photo ${className ?? ''}`}
        src={product.image}
        alt={`${product.brand} ${category.artLabel.replace(/^an? /, '')}${product.model ? `, ${product.model}` : ''}`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    )
  }
  return <BatteryArt className={className} variant={category.art} label={`Illustration of ${category.artLabel}`} />
}
