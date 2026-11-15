import { Link } from 'react-router-dom'
import Icon from '../Icon'
import Reveal from '../Reveal'

export default function AboutIntro({ compact = false, headingLevel = 'h2' }) {
  const Heading = headingLevel
  return (
    <Reveal className="about-intro">
      <span className="eyebrow">About the shop</span>
      <Heading>Your local battery shop in Palghar</Heading>
      <p>
        Shivam Battery Sales &amp; Service is on Boisar Road in Palghar West, near Char Rasta. We sell batteries for
        cars, bikes, trucks and home inverters, along with inverters and UPS units.
      </p>
      <p>
        We deal in all major brands, so you can compare options in one place. Tell us your vehicle or backup needs
        and we&rsquo;ll help you pick a battery that fits. Installation is free with your purchase.
      </p>
      {compact && (
        <Link className="link-arrow" to="/about">
          More about us
          <Icon name="arrow" />
        </Link>
      )}
    </Reveal>
  )
}
