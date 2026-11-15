import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Icon from '../Icon'

// A room with an inverter and battery. It loops: mains power -> power cut -> inverter backup,
// until the visitor uses the button, which switches it to manual control.
const PHASES = [
  { id: 'mains', ms: 3200, label: 'Mains power on', tone: 'green', action: 'Cut the power' },
  { id: 'cut', ms: 1100, label: 'Power cut', tone: 'red', action: 'Switching…' },
  { id: 'backup', ms: 4800, label: 'Inverter backup on', tone: 'blue', action: 'Restore power' },
]

function usePhase() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(reduce ? 2 : 0)
  const [auto, setAuto] = useState(!reduce)

  useEffect(() => {
    const current = PHASES[index]
    // A power cut always hands over to backup, even in manual mode.
    if (current.id !== 'cut' && !auto) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % PHASES.length), current.ms)
    return () => clearTimeout(t)
  }, [index, auto])

  const toggle = () => {
    setAuto(false)
    setIndex((i) => (PHASES[i].id === 'mains' ? 1 : 0))
  }

  return [PHASES[index], toggle]
}

const fade = { duration: 0.5, ease: 'easeInOut' }

export default function HomeBackupScene() {
  const [phase, toggle] = usePhase()
  const p = phase.id
  const light = { mains: 1, cut: [1, 0.15, 0.7, 0], backup: [0, 0.55, 0.95] }[p]
  const dim = { mains: 0, cut: 0.5, backup: 0.2 }[p]
  const levelBars = p === 'mains' ? 5 : 4

  return (
    <div className="scene">
      <div className="scene-controls">
        <span className={`scene-status scene-status--${phase.tone}`} aria-live="polite">
          <span className="scene-status__dot" aria-hidden="true" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={phase.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
            >
              {phase.label}
            </motion.span>
          </AnimatePresence>
        </span>
        <motion.button
          type="button"
          className={`scene-btn scene-btn--${p}`}
          onClick={toggle}
          disabled={p === 'cut'}
          whileTap={{ scale: 0.96 }}
        >
          <Icon name={p === 'backup' ? 'refresh' : 'bolt'} />
          {phase.action}
        </motion.button>
      </div>

      <svg
        className={`scene-svg is-${p}`}
        viewBox="0 0 480 400"
        role="img"
        aria-label="Illustration of a home inverter and battery keeping the light and fan running during a power cut"
      >
        <defs>
          <linearGradient id="hs-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7f9fd" />
            <stop offset="1" stopColor="#e8edf5" />
          </linearGradient>
          <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14295a" />
            <stop offset="1" stopColor="#3c62a8" />
          </linearGradient>
          <linearGradient id="hs-inv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dfe5ec" />
          </linearGradient>
          <linearGradient id="hs-bat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b434e" />
            <stop offset="1" stopColor="#191d23" />
          </linearGradient>
          <linearGradient id="hs-cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd76a" stopOpacity=".42" />
            <stop offset="1" stopColor="#ffd76a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hs-glow">
            <stop offset="0" stopColor="#ffe08a" stopOpacity=".75" />
            <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Room */}
        <rect width="480" height="400" fill="url(#hs-wall)" />
        <rect y="324" width="480" height="6" fill="#d4dbe5" />
        <rect y="330" width="480" height="70" fill="#dfe5ee" />
        <path d="M0 362h480M0 392h480" stroke="#d3dae4" strokeWidth="1.5" />

        {/* Window */}
        <rect x="36" y="58" width="122" height="142" rx="8" fill="url(#hs-sky)" stroke="#fff" strokeWidth="6" />
        <circle cx="124" cy="92" r="12" fill="#f6e7b4" />
        <circle cx="58" cy="84" r="1.6" fill="#fff" />
        <circle cx="80" cy="150" r="1.4" fill="#fff" opacity=".8" />
        <circle cx="140" cy="168" r="1.4" fill="#fff" opacity=".7" />
        <path d="M97 58v142M36 129h122" stroke="#fff" strokeWidth="5" />
        <rect x="28" y="198" width="138" height="8" rx="3" fill="#cfd7e2" />

        {/* Sofa */}
        <rect x="40" y="228" width="150" height="52" rx="14" fill="#b9c8e0" />
        <rect x="30" y="262" width="170" height="60" rx="14" fill="#cad6ea" />
        <rect x="20" y="248" width="30" height="74" rx="12" fill="#aebfdb" />
        <rect x="180" y="248" width="30" height="74" rx="12" fill="#aebfdb" />
        <rect x="64" y="240" width="42" height="32" rx="9" fill="#020e60" opacity=".85" />
        <rect x="114" y="242" width="40" height="30" rx="9" fill="#ffffff" opacity=".85" />
        <rect x="38" y="320" width="8" height="10" rx="2" fill="#8f9db3" />
        <rect x="184" y="320" width="8" height="10" rx="2" fill="#8f9db3" />

        {/* Plant */}
        <ellipse cx="232" cy="270" rx="9" ry="22" fill="#3fae6a" transform="rotate(-22 232 270)" />
        <ellipse cx="246" cy="266" rx="9" ry="24" fill="#2f9a5a" transform="rotate(14 246 266)" />
        <ellipse cx="239" cy="262" rx="7" ry="20" fill="#4cc27a" />
        <rect x="226" y="286" width="28" height="38" rx="5" fill="#f1f4f8" stroke="#d3dae4" strokeWidth="2" />

        {/* Wires */}
        <path id="hs-wire-lamp" d="M300 166H276q-8 0-8-8V18q0-8-8-8H200v40" fill="none" stroke="#c4ccd8" strokeWidth="3" />
        <path id="hs-wire-fan" d="M384 128v-8h30v-6" fill="none" stroke="#c4ccd8" strokeWidth="3" />
        <path id="hs-wire-mains" d="M420 166h26v78" fill="none" stroke="#c4ccd8" strokeWidth="3" />

        {/* Wall socket */}
        <rect x="434" y="244" width="24" height="32" rx="4" fill="#fff" stroke="#cfd6df" strokeWidth="2" />
        <circle cx="442" cy="256" r="2.2" fill="#9aa3af" />
        <circle cx="450" cy="256" r="2.2" fill="#9aa3af" />
        <circle cx="446" cy="266" r="2.2" fill="#9aa3af" />

        {/* Wall fan */}
        <rect x="414" y="104" width="12" height="18" rx="3" fill="#9aa3af" />
        <circle cx="420" cy="72" r="36" fill="#fff" fillOpacity=".55" stroke="#b8c2cf" strokeWidth="2" />
        <g className="scene-fan">
          {[0, 120, 240].map((r) => (
            <ellipse key={r} cx="420" cy="50" rx="9" ry="21" fill="#020e60" opacity=".8" transform={`rotate(${r} 420 72)`} />
          ))}
        </g>
        <circle cx="420" cy="72" r="7" fill="#1b2129" />
        <path d="M388 56a36 36 0 0 1 64 0M388 88a36 36 0 0 0 64 0" fill="none" stroke="#cfd6df" strokeWidth="1.5" />

        {/* Inverter (wall mounted) */}
        <rect x="300" y="128" width="120" height="78" rx="10" fill="url(#hs-inv)" stroke="#cfd6df" strokeWidth="1.5" />
        <rect x="310" y="138" width="100" height="38" rx="6" fill="#1b2129" />
        <motion.rect
          x="318"
          y="145"
          width="52"
          height="24"
          rx="3"
          animate={{ fill: p === 'backup' ? '#2f3fb8' : '#0a1240' }}
          transition={fade}
        />
        <rect x="324" y="151" width="30" height="4" rx="2" fill="#b6bdf2" />
        <rect x="324" y="159" width="20" height="4" rx="2" fill="#b6bdf2" opacity=".7" />
        <motion.circle cx="384" cy="150" r="4" fill="#2bd46b" animate={{ opacity: p === 'mains' ? 1 : 0.2 }} transition={fade} />
        <motion.circle cx="398" cy="150" r="4" fill="#6f7ce0" animate={{ opacity: p === 'backup' ? 1 : 0.2 }} transition={fade} />
        <circle cx="391" cy="166" r="5" fill="#2a313a" stroke="#454e5a" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={316 + i * 15} y="186" width="8" height="12" rx="2" fill="#cbd2db" />
        ))}

        {/* Battery cables */}
        <path d="M338 232v-26" stroke="#e5484d" strokeWidth="3" />
        <path d="M382 232v-26" stroke="#1b2129" strokeWidth="3" />

        {/* Tubular battery */}
        <rect x="332" y="230" width="12" height="8" rx="2" fill="#c9ced6" />
        <rect x="376" y="230" width="12" height="8" rx="2" fill="#c9ced6" />
        <rect x="314" y="236" width="92" height="16" rx="5" fill="#2a3038" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={350 + i * 10} cy="244" r="3.2" fill="#e9eef5" stroke="#020e60" strokeWidth="1.2" />
        ))}
        <rect x="318" y="248" width="84" height="80" rx="6" fill="url(#hs-bat)" />
        <rect x="326" y="262" width="68" height="48" rx="4" fill="#fff" />
        <rect x="326" y="262" width="68" height="13" rx="4" fill="#020e60" />
        <rect x="326" y="270" width="68" height="5" fill="#020e60" />
        <path d="M335 264l-4 6h3l-1 4 4-6h-3l1-4z" fill="#fff" />
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            x={333 + i * 11.5}
            y="288"
            width="8"
            height="14"
            rx="1.5"
            fill={p === 'backup' ? '#020e60' : '#22b35e'}
            animate={{ opacity: i < levelBars ? 1 : 0.18 }}
            transition={fade}
          />
        ))}

        {/* Dim the room when power goes */}
        <motion.rect width="480" height="400" fill="#0b1530" initial={false} animate={{ opacity: dim }} transition={fade} />

        {/* Power flow: mains charging the battery, then backup to the lamp and fan */}
        <motion.g animate={{ opacity: p === 'mains' ? 1 : 0 }} transition={fade}>
          <use href="#hs-wire-mains" className="scene-flow scene-flow--charge" />
        </motion.g>
        <motion.g animate={{ opacity: p === 'backup' ? 1 : 0 }} transition={fade}>
          <use href="#hs-wire-lamp" className="scene-flow" />
          <use href="#hs-wire-fan" className="scene-flow" />
        </motion.g>

        {/* Ceiling lamp and its light */}
        <motion.g animate={{ opacity: light }} transition={{ duration: p === 'cut' ? 0.6 : 0.5 }}>
          <path d="M172 92 118 324h164L228 92z" fill="url(#hs-cone)" />
          <circle cx="200" cy="100" r="92" fill="url(#hs-glow)" />
        </motion.g>
        <path d="M178 50h44l14 34h-72z" fill="#1b2129" />
        <circle cx="200" cy="90" r="9" fill="#c9ced6" />
        <motion.circle cx="200" cy="90" r="9" fill="#ffe08a" animate={{ opacity: light }} transition={{ duration: 0.5 }} />

        {/* Inverter LEDs stay bright above the dimmed room */}
        <motion.circle cx="398" cy="150" r="7" fill="#6f7ce0" animate={{ opacity: p === 'backup' ? [0.15, 0.5, 0.15] : 0 }} transition={{ duration: 1.6, repeat: Infinity }} />
      </svg>
    </div>
  )
}
