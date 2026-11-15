import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { business, mapsLinks } from '../../config/business'
import { generalMessage, waLink } from '../../utils/whatsapp'

export default function Footer() {
  const { address, phone, hours } = business
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo dark />
            <p>
              Batteries for cars, bikes, trucks and inverters, plus inverters and UPS. All major brands, in
              Palghar.
            </p>
          </div>

          <div>
            <h2 className="footer__title">Explore</h2>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer__title">Visit</h2>
            <address className="footer__address">
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.city}, {address.state} {address.postalCode}
            </address>
            {hours.map((h) => (
              <p key={h.days} className="footer__hours">
                {h.days}: {h.time}
              </p>
            ))}
          </div>

          <div>
            <h2 className="footer__title">Contact</h2>
            <ul className="footer__links">
              <li><a href={`tel:${phone.tel}`}>Call {phone.display}</a></li>
              <li>
                <a href={waLink(generalMessage())} target="_blank" rel="noopener noreferrer">
                  WhatsApp us
                </a>
              </li>
              <li>
                <a href={mapsLinks.directions} target="_blank" rel="noopener noreferrer">
                  Get directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {business.name}</p>
          <p>Prices and availability are confirmed by the shop on call or WhatsApp.</p>
        </div>
      </div>
    </footer>
  )
}
