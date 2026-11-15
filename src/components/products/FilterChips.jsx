import { motion } from 'framer-motion'

export default function FilterChips({ label, options, value, onChange, id, variant = '' }) {
  return (
    <div className="filters__row">
      <span className="filters__label" id={`${id}-label`}>
        {label}
      </span>
      <div className={`chips ${variant}`} role="group" aria-labelledby={`${id}-label`}>
        {options.map((o) => {
          const active = o.value === value
          return (
            <button
              key={o.value}
              type="button"
              className={`chip${active ? ' is-active' : ''}`}
              aria-pressed={active}
              onClick={() => onChange(o.value)}
            >
              {active && (
                <motion.span
                  layoutId={`${id}-pill`}
                  className="chip__bg"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span>{o.label}</span>
              {o.count != null && <span className="chip__count">{o.count}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
