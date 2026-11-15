import { useState } from 'react'
import Icon from '../Icon'
import Reveal from '../Reveal'
import { categories, categoryById } from '../../config/products'
import { recommendationMessage, waLink } from '../../utils/whatsapp'

const points = ['No sign-up needed', 'Your details go straight into the message', 'You review it before sending']

export default function RecommendForm() {
  const [category, setCategory] = useState('')
  const [requirement, setRequirement] = useState('')

  const categoryName = category === 'unsure' ? 'Not sure yet' : categoryById[category]?.name ?? ''
  const href = waLink(recommendationMessage({ category: categoryName, requirement }))
  const placeholder = categoryById[category]?.placeholder ?? 'e.g. Hyundai i20 2018, or backup for 3 fans + 5 lights'

  const onSubmit = (e) => {
    e.preventDefault()
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <Reveal className="recommend">
      <div className="recommend__intro">
        <span className="eyebrow eyebrow--light">Need help choosing?</span>
        <h2>Tell us what it&rsquo;s for. We&rsquo;ll suggest the right battery.</h2>
        <p>Both fields are optional. Fill in what you know and send it to the shop on WhatsApp.</p>
        <ul className="recommend__points">
          {points.map((p) => (
            <li key={p}>
              <Icon name="check" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <form className="recommend__form" onSubmit={onSubmit}>
        <label className="field">
          <span className="field__label">
            Battery category <em>(optional)</em>
          </span>
          <select className="input select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
            <option value="unsure">Not sure yet</option>
          </select>
        </label>

        <label className="field">
          <span className="field__label">
            Vehicle model or power backup need <em>(optional)</em>
          </span>
          <input
            className="input"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder={placeholder}
            maxLength={160}
          />
        </label>

        <button type="submit" className="btn btn--wa btn--lg btn--block">
          <Icon name="whatsapp" />
          Get a Recommendation on WhatsApp
        </button>
        <p className="recommend__fine">Opens WhatsApp with your message ready to send.</p>
      </form>
    </Reveal>
  )
}
