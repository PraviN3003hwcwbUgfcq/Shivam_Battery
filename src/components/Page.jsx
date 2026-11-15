import { motion } from 'framer-motion'
import { useSeo } from '../hooks/useSeo'
import { ease } from '../utils/motion'

export default function Page({ title, description, children }) {
  useSeo(title, description)
  return (
    <motion.main
      id="main"
      className="page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease }}
    >
      {children}
    </motion.main>
  )
}
