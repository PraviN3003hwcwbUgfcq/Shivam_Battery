import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { FloatingWhatsApp, MobileBottomBar } from './components/layout/ContactBars'
import LocalBusinessSchema from './components/LocalBusinessSchema'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  // /products and /products/:id share a key so opening a product doesn't replay the page transition.
  const pageKey = location.pathname.split('/')[1] || 'home'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pageKey])

  return (
    <MotionConfig reducedMotion="user">
      <LocalBusinessSchema />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={pageKey}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId?" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </MotionConfig>
  )
}
