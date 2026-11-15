import { useEffect } from 'react'
import { business } from '../config/business'

// LocalBusiness structured data, built only from verified details in config.
// Opening hours are left out until the shop confirms which days it is open.
export default function LocalBusinessSchema() {
  useEffect(() => {
    const { name, phone, address, siteUrl } = business
    const data = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name,
      telephone: phone.tel,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${address.line1}, ${address.line2}`,
        addressLocality: address.city,
        addressRegion: address.state,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
      paymentAccepted: 'Credit Card, Debit Card, EMI',
      ...(siteUrl && { url: siteUrl }),
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
    return () => script.remove()
  }, [])
  return null
}
