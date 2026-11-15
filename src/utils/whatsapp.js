import { business } from '../config/business'

export const waLink = (message) =>
  `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`

const siteOrigin = () =>
  business.siteUrl || (typeof window !== 'undefined' ? window.location.origin : '')

export const productUrl = (product) => `${siteOrigin()}/products/${product.id}`

export const generalMessage = () =>
  'Hi Shivam Battery, I found your website and need help choosing a battery.'

export function productMessage(product, requirement = '') {
  const label = product.model ? `${product.name} (${product.model})` : product.name
  const parts = [`Hi Shivam Battery, I'm interested in ${label}.`]
  if (requirement.trim()) parts.push(`My vehicle or requirement is ${requirement.trim()}.`)
  parts.push('Please confirm compatibility, price and availability.')
  parts.push(`Product link: ${productUrl(product)}`)
  return parts.join(' ')
}

export function recommendationMessage({ category, requirement }) {
  const parts = [generalMessage()]
  if (category) parts.push(`Category: ${category}.`)
  if (requirement.trim()) parts.push(`Vehicle model / requirement: ${requirement.trim()}.`)
  return parts.join(' ')
}

export const serviceMessage = (service) =>
  `Hi Shivam Battery, I found your website and would like to know more about ${service.title.toLowerCase()}.`
