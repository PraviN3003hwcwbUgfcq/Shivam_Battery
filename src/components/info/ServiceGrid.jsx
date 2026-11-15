import { motion } from 'framer-motion'
import Icon from '../Icon'
import { serviceMessage, waLink } from '../../utils/whatsapp'
import { inView, rise, stagger } from '../../utils/motion'

export default function ServiceGrid({ services }) {
  return (
    <motion.ul className="service-grid" initial="hidden" whileInView="show" viewport={inView} variants={stagger(0.1)}>
      {services.map((s) => (
        <motion.li key={s.id} className="service-card" variants={rise}>
          <span className="service-card__icon">
            <Icon name={s.icon} />
          </span>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <a
            className="link-arrow"
            href={waLink(serviceMessage(s))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire on WhatsApp about ${s.title.toLowerCase()}`}
          >
            Enquire on WhatsApp
            <Icon name="arrow" />
          </a>
        </motion.li>
      ))}
    </motion.ul>
  )
}
