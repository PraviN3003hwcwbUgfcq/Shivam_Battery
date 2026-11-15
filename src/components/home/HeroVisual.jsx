import { motion } from 'framer-motion'
import HomeBackupScene from './HomeBackupScene'
import { ease } from '../../utils/motion'

export default function HeroVisual() {
  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease }}
    >
      <HomeBackupScene />
    </motion.div>
  )
}
