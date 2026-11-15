import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
import Hero from '../components/home/Hero'
import BrandMarquee from '../components/home/BrandMarquee'
import CategoryGrid from '../components/home/CategoryGrid'
import HowItWorks from '../components/home/HowItWorks'
import ProductGrid from '../components/products/ProductGrid'
import RecommendForm from '../components/info/RecommendForm'
import ServiceGrid from '../components/info/ServiceGrid'
import AboutIntro from '../components/info/AboutIntro'
import VisitCard from '../components/info/VisitCard'
import { products } from '../config/products'
import { services } from '../config/services'

const featured = products.filter((p) => p.featured)

export default function Home() {
  return (
    <Page
      title="Shivam Battery Sales & Service | Batteries & Inverters in Palghar"
      description="Car, bike, truck and inverter batteries plus inverters and UPS at Shivam Battery Sales & Service, Boisar Road, Palghar. Enquire on WhatsApp for price and availability."
    >
      <Hero />
      <BrandMarquee />

      {/* <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Shop by category"
            title="Batteries for every vehicle and home"
            text="Pick a category to see the brands we carry."
          />
          <CategoryGrid />
        </div>
      </section> */}

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Popular ranges"
            title="Featured batteries"
            action={
              <Link className="link-arrow" to="/products">
                View all products
                <Icon name="arrow" />
              </Link>
            }
          />
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading center eyebrow="How it works" title="Choose online, confirm on WhatsApp" />
          <HowItWorks />
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <RecommendForm />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Services"
            title="Help with your battery"
            action={
              <Link className="link-arrow" to="/services">
                All services
                <Icon name="arrow" />
              </Link>
            }
          />
          <ServiceGrid services={services} />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split">
          <AboutIntro compact />
          <VisitCard delay={0.1} />
        </div>
      </section>
    </Page>
  )
}
