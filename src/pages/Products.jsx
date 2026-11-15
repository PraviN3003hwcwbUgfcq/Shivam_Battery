import { useCallback } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/Page'
import Icon from '../components/Icon'
import FilterChips from '../components/products/FilterChips'
import ProductGrid from '../components/products/ProductGrid'
import ProductPanel from '../components/products/ProductPanel'
import { categories, categoryById, products } from '../config/products'
import { generalMessage, waLink } from '../utils/whatsapp'
import { ease } from '../utils/motion'

export default function Products() {
  const { productId } = useParams()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  const category = categoryById[params.get('category')] ? params.get('category') : 'all'
  const inCategory = category === 'all' ? products : products.filter((p) => p.category === category)
  const brandsHere = [...new Set(inCategory.map((p) => p.brand))]
  const brand = brandsHere.includes(params.get('brand')) ? params.get('brand') : 'all'
  const visible = brand === 'all' ? inCategory : inCategory.filter((p) => p.brand === brand)
  const active = products.find((p) => p.id === productId) ?? null

  const query = params.toString()
  const search = query ? `?${query}` : ''
  const closePanel = useCallback(() => navigate(`/products${search}`), [navigate, search])

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete(key)
    else next.set(key, value)
    if (key === 'category') next.delete('brand')
    setParams(next, { replace: true })
  }

  const categoryOptions = [
    { value: 'all', label: 'All', count: products.length },
    ...categories.map((c) => ({
      value: c.id,
      label: c.name,
      count: products.filter((p) => p.category === c.id).length,
    })),
  ]
  const brandOptions = [{ value: 'all', label: 'All brands' }, ...brandsHere.map((b) => ({ value: b, label: b }))]

  const title = active
    ? `${active.name} in Palghar | Shivam Battery`
    : 'Batteries, Inverters & UPS in Palghar | Shivam Battery'
  const description = active
    ? `${active.summary} Enquire on WhatsApp with Shivam Battery Sales & Service, Palghar.`
    : 'Browse car, bike, truck and inverter batteries plus inverters and UPS from all major brands. Enquire on WhatsApp for price and availability.'

  return (
    <Page title={title} description={description}>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Product catalogue
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            Batteries &amp; power backup
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
          >
            We stock all major brands. Pick a range and send us your vehicle or backup details on WhatsApp to get the
            exact model, price and availability.
          </motion.p>
        </div>
      </section>

      <div className="filters">
        <div className="container">
          <FilterChips id="category" label="Category" options={categoryOptions} value={category} onChange={(v) => setFilter('category', v)} />
          <FilterChips
            id="brand"
            label="Brand"
            variant="chips--brand"
            options={brandOptions}
            value={brand}
            onChange={(v) => setFilter('brand', v)}
          />
        </div>
      </div>

      <section className="section section--catalogue">
        <div className="container">
          <div className="result-bar" aria-live="polite">
            <p>
              Showing <strong>{visible.length}</strong> {visible.length === 1 ? 'range' : 'ranges'}
              {category !== 'all' && ` in ${categoryById[category].name}`}
              {brand !== 'all' && ` from ${brand}`}
            </p>
          </div>

          <ProductGrid products={visible} search={search} />

          <div className="catalogue-help">
            <div>
              <h2>Don&rsquo;t see your battery?</h2>
              <p>We deal in all major brands. Send us your vehicle or inverter details and we&rsquo;ll check for you.</p>
            </div>
            <a className="btn btn--wa" href={waLink(generalMessage())} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <ProductPanel product={active} onClose={closePanel} />
    </Page>
  )
}
