export const priceLabel = (product) =>
  product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Ask for Price'
