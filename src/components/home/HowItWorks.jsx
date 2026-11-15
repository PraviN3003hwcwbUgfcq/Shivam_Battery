import { motion } from 'framer-motion'
import Icon from '../Icon'
import { inView, rise, stagger } from '../../utils/motion'

const steps = [
  { icon: 'battery', title: 'Pick a battery', text: 'Browse by category and brand, or ask us to suggest one.' },
  { icon: 'whatsapp', title: 'Message us on WhatsApp', text: 'Your product and vehicle details are filled in for you.' },
  { icon: 'check', title: 'Confirm and collect', text: 'We confirm fit, price and stock. Visit the shop and we install it free.' },
]

export default function HowItWorks() {
  return (
    <motion.ol className="steps" initial="hidden" whileInView="show" viewport={inView} variants={stagger(0.12)}>
      {steps.map((s, i) => (
        <motion.li key={s.title} className="step" variants={rise}>
          <span className="step__icon">
            <Icon name={s.icon} />
          </span>
          <span className="step__num">Step {i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </motion.li>
      ))}
    </motion.ol>
  )
}
