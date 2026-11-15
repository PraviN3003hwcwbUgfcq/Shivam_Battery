import Page from '../components/Page'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import VisitCard from '../components/info/VisitCard'
import RecommendForm from '../components/info/RecommendForm'
import { business, mapsLinks } from '../config/business'

export default function Contact() {
  return (
    <Page
      title="Contact Shivam Battery, Boisar Road, Palghar"
      description={`Call or WhatsApp Shivam Battery Sales & Service on ${business.phone.display}. Boisar Road, Char Rasta, Palghar West. Open 9 AM to 9 PM.`}
    >
      <PageHero
        eyebrow="Contact"
        title="Visit or message us"
        text="Call, WhatsApp or drop by the shop. We'll help you find the right battery."
      />

      <section className="section section--top-tight">
        <div className="container contact-grid">
          <VisitCard title="Shop details" />
          <Reveal className="map" delay={0.1}>
            <iframe
              title={`Map showing ${business.name}, Palghar`}
              src={mapsLinks.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <RecommendForm />
        </div>
      </section>
    </Page>
  )
}
