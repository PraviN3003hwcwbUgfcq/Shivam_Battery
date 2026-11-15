import { Link } from 'react-router-dom'
import { business } from '../config/business'

// `dark` uses the white artwork for dark backgrounds (footer).
export default function Logo({ dark = false }) {
  const tone = dark ? 'white' : 'navy'
  return (
    <Link to="/" className={`logo${dark ? ' logo--dark' : ''}`} aria-label={`${business.name}, home`}>
      <img className="logo__mark" src={`/images/logo/logo-${tone}.png`} alt="" width="40" height="40" />
      <span className="logo__text">
        <img className="logo__wordmark" src={`/images/logo/wordmark-${tone}.png`} alt="" width="156" height="20" />
        <span>Sales &amp; Service · Palghar</span>
      </span>
    </Link>
  )
}
