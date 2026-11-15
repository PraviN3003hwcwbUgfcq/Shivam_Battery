import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../Icon'
import HeroVisual from './HeroVisual'
import { generalMessage, waLink } from '../../utils/whatsapp'
import { ease } from '../../utils/motion'

const lines = [
  { words: ['The', 'Right', 'Battery.'], accent: false },
  { words: ['Reliable', 'Power.'], accent: true },
]

const facts = ['All major battery brands', 'Car, bike, truck & inverter', 'EMI & card payments']

const word = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
})

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.span className="hero__location" {...fadeUp(0)}>
            <span className="dot" aria-hidden="true" />
            Boisar Road, Palghar
          </motion.span>

          <h1>
            <span className="sr-only">The Right Battery. Reliable Power.</span>
            <motion.span
              aria-hidden="true"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            >
              {lines.map((line) => (
                <span key={line.words[0]} className={`hero__line${line.accent ? ' accent' : ''}`}>
                  {line.words.map((w) => (
                    <motion.span key={w} className="word" variants={word}>
                      {w}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p className="hero__lead" {...fadeUp(0.45)}>
            Explore battery and power backup solutions in Palghar. Contact us for help choosing the right option.
          </motion.p>

          <motion.div className="btn-row" {...fadeUp(0.55)}>
            <Link className="btn btn--primary btn--lg" to="/products">
              Explore Products
              <Icon name="arrow" />
            </Link>
            <a className="btn btn--wa btn--lg" href={waLink(generalMessage())} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" />
              Talk on WhatsApp
            </a>
          </motion.div>

          <motion.ul className="hero__facts" {...fadeUp(0.65)}>
            {facts.map((f) => (
              <li key={f}>
                <Icon name="check" />
                {f}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
