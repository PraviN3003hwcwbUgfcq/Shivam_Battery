import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/Page'
import PageHero from '../components/PageHero'
import BatteryArt from '../components/BatteryArt'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import AboutIntro from '../components/info/AboutIntro'
import VisitCard from '../components/info/VisitCard'
import { business } from '../config/business'
import { brands, categories } from '../config/products'
import { inView, rise, stagger } from '../utils/motion'

export default function About() {
  const photos = business.shopPhotos
  return (
    <Page
      title="About Shivam Battery Sales & Service, Palghar"
      description="Shivam Battery Sales & Service on Boisar Road, Palghar sells car, bike, truck and inverter batteries plus inverters and UPS from all major brands."
    >
      <PageHero eyebrow="About us" title="Shivam Battery Sales & Service" text="A battery shop on Boisar Road, Palghar West." />

      <section className="section section--top-tight">
        <div className="container split">
          <AboutIntro />
          <Reveal className="about-visual" delay={0.1}>
            {photos.length ? (
              <div className="about-photos">
                {photos.map((p) => (
                  <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />
                ))}
              </div>
            ) : (
              <div className="about-art">
                <BatteryArt variant="inverter" className="about-art__a" />
                <BatteryArt variant="tubular" className="about-art__b" />
                <BatteryArt variant="bike" className="about-art__c" />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split split--top">
          <div>
            <Reveal>
              <span className="eyebrow">What we sell</span>
              <h2 className="h2">Batteries and backup for every need</h2>
            </Reveal>
            <motion.ul className="sell-list" initial="hidden" whileInView="show" viewport={inView} variants={stagger(0.06)}>
              {categories.map((c) => (
                <motion.li key={c.id} variants={rise}>
                  <Link to={`/products?category=${c.id}`}>
                    <span className="sell-list__icon">
                      <Icon name={c.icon} />
                    </span>
                    <span>
                      <strong>{c.name}</strong>
                      <small>{c.blurb}</small>
                    </span>
                    <Icon name="arrow" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div>
            <Reveal>
              <span className="eyebrow">Brands</span>
              <h2 className="h2">All major brands under one roof</h2>
            </Reveal>
            <motion.ul className="brand-pills" initial="hidden" whileInView="show" viewport={inView} variants={stagger(0.05)}>
              {brands.map((b) => (
                <motion.li key={b} variants={rise}>
                  {b}
                </motion.li>
              ))}
              <motion.li variants={rise} className="brand-pills__more">
                and more
              </motion.li>
            </motion.ul>
            <Reveal className="note-card" delay={0.1}>
              <Icon name="card" />
              <p>{business.paymentNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Visit</span>
            <h2 className="h2">Come see us on Boisar Road</h2>
            <p className="lead">
              Bring your vehicle or your old battery. We&rsquo;ll check what fits, fit the new one for free, and give
              you an exchange value for the old one.
            </p>
          </Reveal>
          <VisitCard delay={0.1} />
        </div>
      </section>
    </Page>
  )
}
