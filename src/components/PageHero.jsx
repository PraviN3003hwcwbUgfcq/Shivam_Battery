import { motion } from 'framer-motion'
import { ease } from '../utils/motion'

const item = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
})

export default function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="container">
        <motion.span className="eyebrow" {...item(0)}>
          {eyebrow}
        </motion.span>
        <motion.h1 {...item(0.06)}>{title}</motion.h1>
        {text && <motion.p {...item(0.12)}>{text}</motion.p>}
      </div>
    </section>
  )
}
