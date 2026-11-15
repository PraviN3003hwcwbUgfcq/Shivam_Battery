import { motion } from 'framer-motion'
import Icon from '../Icon'
import { business } from '../../config/business'
import { generalMessage, waLink } from '../../utils/whatsapp'

// Desktop: floating WhatsApp button. Mobile: fixed Call / WhatsApp bar.
export function FloatingWhatsApp() {
  return (
    <motion.a
      className="wa-float"
      href={waLink(generalMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Shivam Battery on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon name="whatsapp" />
      <span className="wa-float__tip">Chat on WhatsApp</span>
    </motion.a>
  )
}

export function MobileBottomBar() {
  return (
    <div className="bottom-bar">
      <a className="btn btn--ghost" href={`tel:${business.phone.tel}`}>
        <Icon name="phone" />
        Call
      </a>
      <a className="btn btn--wa" href={waLink(generalMessage())} target="_blank" rel="noopener noreferrer">
        <Icon name="whatsapp" />
        WhatsApp
      </a>
    </div>
  )
}
