import Page from '../components/Page'
import PageHero from '../components/PageHero'
import ServiceGrid from '../components/info/ServiceGrid'
import RecommendForm from '../components/info/RecommendForm'
import { services } from '../config/services'

export default function Services() {
  return (
    <Page
      title="Battery Replacement, Free Installation & Exchange in Palghar | Shivam Battery"
      description="Battery replacement, free installation and old battery exchange at Shivam Battery Sales & Service, Boisar Road, Palghar."
    >
      <PageHero
        eyebrow="Services"
        title="Battery services in Palghar"
        text="Buy, fit and swap your battery in one visit. Message us on WhatsApp about any service."
      />
      <section className="section section--top-tight">
        <div className="container">
          <ServiceGrid services={services} />
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
