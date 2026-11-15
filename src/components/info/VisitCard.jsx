import Icon from '../Icon'
import Reveal from '../Reveal'
import { business, mapsLinks } from '../../config/business'
import { generalMessage, waLink } from '../../utils/whatsapp'

export default function VisitCard({ title = 'Visit the shop', delay = 0 }) {
  const { address, phone, hours, paymentNote } = business
  return (
    <Reveal className="visit" delay={delay}>
      <h2 className="visit__title">{title}</h2>

      <div className="visit__item">
        <span className="visit__icon"><Icon name="pin" /></span>
        <div>
          <h3>Address</h3>
          <address>
            {address.line1}
            <br />
            {address.line2}
            <br />
            {address.city}, {address.state} {address.postalCode}
          </address>
        </div>
      </div>

      <div className="visit__item">
        <span className="visit__icon"><Icon name="clock" /></span>
        <div>
          <h3>Hours</h3>
          {hours.map((h) => (
            <p key={h.days}>{h.time}</p>
          ))}
        </div>
      </div>

      <div className="visit__item">
        <span className="visit__icon"><Icon name="phone" /></span>
        <div>
          <h3>Phone &amp; WhatsApp</h3>
          <p><a href={`tel:${phone.tel}`}>{phone.display}</a></p>
        </div>
      </div>

      {paymentNote && (
        <div className="visit__item">
          <span className="visit__icon"><Icon name="card" /></span>
          <div>
            <h3>Payment</h3>
            <p>{paymentNote}</p>
          </div>
        </div>
      )}

      <div className="visit__actions">
        <a className="btn btn--primary btn--sm" href={`tel:${phone.tel}`}>
          <Icon name="phone" />
          Call Now
        </a>
        <a className="btn btn--wa btn--sm" href={waLink(generalMessage())} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" />
          WhatsApp Us
        </a>
        <a className="btn btn--ghost btn--sm" href={mapsLinks.directions} target="_blank" rel="noopener noreferrer">
          <Icon name="directions" />
          Get Directions
        </a>
      </div>
    </Reveal>
  )
}
