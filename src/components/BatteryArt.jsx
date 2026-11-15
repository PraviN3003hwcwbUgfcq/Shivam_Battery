import { useId } from 'react'
import { motion } from 'framer-motion'

// Clean product illustrations used until real product photos are added.
// [x, y, width, height] of the battery body; terminals are x-centres.
const SHAPES = {
  car: { body: [30, 66, 180, 100], terminals: [62, 178], tw: 22, th: 13 },
  bike: { body: [74, 60, 92, 108], terminals: [92, 148], tw: 14, th: 11 },
  truck: { body: [14, 76, 212, 90], terminals: [42, 198], tw: 24, th: 13 },
  tubular: { body: [66, 44, 108, 124], terminals: [86, 154], tw: 16, th: 12, floats: true },
}

export default function BatteryArt({ variant = 'car', animated = false, label, className }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg
      className={className}
      viewBox="0 0 240 196"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b434e" />
          <stop offset="1" stopColor="#191d23" />
        </linearGradient>
        <linearGradient id={`lid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d5663" />
          <stop offset="1" stopColor="#2a3038" />
        </linearGradient>
        <linearGradient id={`term-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a94a2" />
          <stop offset=".5" stopColor="#e3e7ec" />
          <stop offset="1" stopColor="#7c8693" />
        </linearGradient>
        <linearGradient id={`inv-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e1e6ed" />
        </linearGradient>
        <radialGradient id={`shadow-${uid}`}>
          <stop offset="0" stopColor="#101828" stopOpacity=".28" />
          <stop offset="1" stopColor="#101828" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="180" rx="98" ry="8" fill={`url(#shadow-${uid})`} />
      {variant === 'inverter' ? (
        <Inverter uid={uid} animated={animated} />
      ) : (
        <Battery shape={SHAPES[variant] ?? SHAPES.car} uid={uid} animated={animated} />
      )}
    </svg>
  )
}

function ChargeBars({ x, y, w, h, animated }) {
  const gap = w * 0.06
  const bw = (w - gap * 3) / 4
  return [0, 1, 2, 3].map((i) =>
    animated ? (
      <motion.rect
        key={i}
        x={x + i * (bw + gap)}
        y={y}
        width={bw}
        height={h}
        rx="1.5"
        fill="#020e60"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: [0.15, 0.15, 1, 1, 0.15] }}
        transition={{
          duration: 2.4,
          times: [0, 0.1 + i * 0.15, 0.2 + i * 0.15, 0.9, 1],
          repeat: Infinity,
        }}
      />
    ) : (
      <rect
        key={i}
        x={x + i * (bw + gap)}
        y={y}
        width={bw}
        height={h}
        rx="1.5"
        fill="#020e60"
        opacity={i < 3 ? 1 : 0.2}
      />
    ),
  )
}

function Battery({ shape, uid, animated }) {
  const [x, y, w, h] = shape.body
  const lidH = Math.max(16, h * 0.17)
  const lidY = y - lidH + 4
  const L = { x: x + w * 0.1, y: y + h * 0.22, w: w * 0.8, h: h * 0.58 }
  const band = L.h * 0.3
  const boltScale = band / 22

  return (
    <g>
      {shape.terminals.map((tx) => (
        <g key={tx}>
          <rect
            x={tx - shape.tw / 2}
            y={lidY - shape.th + 2}
            width={shape.tw}
            height={shape.th}
            rx="3"
            fill={`url(#term-${uid})`}
          />
          <rect x={tx - shape.tw / 2 - 2} y={lidY - 2} width={shape.tw + 4} height="5" rx="2" fill="#20262d" />
        </g>
      ))}

      <rect x={x} y={y} width={w} height={h} rx="10" fill={`url(#body-${uid})`} />
      <rect x={x + 4} y={y + 6} width={w * 0.06} height={h - 12} rx="4" fill="#fff" opacity=".06" />

      <rect x={x - 5} y={lidY} width={w + 10} height={lidH} rx="7" fill={`url(#lid-${uid})`} />
      <rect x={x} y={lidY + 1} width={w} height="2.5" rx="1.25" fill="#fff" opacity=".14" />

      <text
        x={shape.terminals[0]}
        y={lidY + lidH * 0.72}
        textAnchor="middle"
        fontSize={lidH * 0.7}
        fontWeight="700"
        fill="#ff7464"
        fontFamily="Manrope, sans-serif"
      >
        +
      </text>
      <text
        x={shape.terminals[1]}
        y={lidY + lidH * 0.72}
        textAnchor="middle"
        fontSize={lidH * 0.7}
        fontWeight="700"
        fill="#a3adba"
        fontFamily="Manrope, sans-serif"
      >
        −
      </text>

      {shape.floats &&
        [0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={x + w * (0.38 + i * 0.12)}
            cy={lidY + lidH / 2}
            r={lidH * 0.2}
            fill="#e9eef5"
            stroke="#020e60"
            strokeWidth="1.5"
          />
        ))}

      <rect x={L.x} y={L.y} width={L.w} height={L.h} rx="6" fill="#fff" />
      <rect x={L.x} y={L.y} width={L.w} height={band} rx="6" fill="#020e60" />
      <rect x={L.x} y={L.y + band - 6} width={L.w} height="6" fill="#020e60" />
      <path
        d="M9 1 2 12h6l-1 9 8-12H9l1-8z"
        fill="#fff"
        transform={`translate(${L.x + 7} ${L.y + band / 2 - 11 * boltScale}) scale(${boltScale})`}
      />
      <rect x={L.x + 10 + 16 * boltScale} y={L.y + band / 2 - 2.5} width={L.w * 0.34} height="5" rx="2.5" fill="#fff" opacity=".85" />

      <rect x={L.x + 10} y={L.y + band + 9} width={L.w * 0.42} height="5" rx="2.5" fill="#c9d0da" />
      <rect x={L.x + 10} y={L.y + band + 19} width={L.w * 0.28} height="5" rx="2.5" fill="#dde2e9" />

      <ChargeBars
        x={L.x + L.w * 0.62}
        y={L.y + L.h - 8 - L.h * 0.28}
        w={L.w * 0.3}
        h={L.h * 0.28}
        animated={animated}
      />
    </g>
  )
}

function Inverter({ uid, animated }) {
  const loads = [0.78, 0.55, 0.9]
  return (
    <g>
      <rect x="54" y="168" width="26" height="8" rx="3" fill="#9aa3af" />
      <rect x="160" y="168" width="26" height="8" rx="3" fill="#9aa3af" />
      <rect x="36" y="36" width="168" height="136" rx="16" fill={`url(#inv-${uid})`} stroke="#cfd6df" />
      <rect x="52" y="54" width="136" height="60" rx="10" fill="#1b2129" />
      <rect x="62" y="64" width="74" height="40" rx="5" fill="#0a1240" />
      {loads.map((v, i) =>
        animated ? (
          <motion.rect
            key={i}
            x="70"
            y={71 + i * 10}
            height="5"
            rx="2.5"
            fill="#8590e6"
            initial={{ width: 56 * v }}
            animate={{ width: [56 * v, 56 * (1 - v / 2), 56 * v] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <rect key={i} x="70" y={71 + i * 10} width={56 * v} height="5" rx="2.5" fill="#8590e6" />
        ),
      )}
      <motion.circle
        cx="154"
        cy="72"
        r="4.5"
        fill="#2bd46b"
        animate={animated ? { opacity: [1, 0.35, 1] } : undefined}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <circle cx="154" cy="92" r="4.5" fill="#020e60" />
      <circle cx="174" cy="82" r="8.5" fill="#2a313a" stroke="#454e5a" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={56 + i * 19} y="128" width="9" height="28" rx="3" fill="#cbd2db" />
      ))}
    </g>
  )
}
