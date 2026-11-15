import { motion } from 'framer-motion'
import { ease, inView } from '../utils/motion'

export default function Reveal({ children, className, delay = 0, y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
