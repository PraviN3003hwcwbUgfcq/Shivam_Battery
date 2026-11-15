import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../Logo'
import Icon from '../Icon'
import { business } from '../../config/business'
import { generalMessage, waLink } from '../../utils/whatsapp'
import { ease } from '../../utils/motion'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

const mobileLinks = [...links.slice(0, 3), { to: '/about', label: 'About' }, links[3]]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`header${scrolled || open ? ' is-scrolled' : ''}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container header__inner">
        <Logo />

        <nav className="header__nav" aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `header__link${isActive ? ' is-active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <motion.span layoutId="nav-underline" className="header__underline" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <a className="btn btn--wa header__wa" href={waLink(generalMessage())} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" />
            WhatsApp Us
          </a>
          <button
            type="button"
            className="icon-btn header__menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-backdrop"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              id="mobile-nav"
              className="mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease }}
            >
              {mobileLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3, ease }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) => `mobile-nav__link${isActive ? ' is-active' : ''}`}
                  >
                    {l.label}
                    <Icon name="arrow" />
                  </NavLink>
                </motion.div>
              ))}
              <div className="btn-row mobile-nav__actions">
                <a className="btn btn--ghost" href={`tel:${business.phone.tel}`}>
                  <Icon name="phone" />
                  Call
                </a>
                <a className="btn btn--wa" href={waLink(generalMessage())} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" />
                  WhatsApp Us
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
