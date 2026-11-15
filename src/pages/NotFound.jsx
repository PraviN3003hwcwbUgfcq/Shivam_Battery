import { Link } from 'react-router-dom'
import Page from '../components/Page'
import BatteryArt from '../components/BatteryArt'

export default function NotFound() {
  return (
    <Page title="Page not found | Shivam Battery" description="This page could not be found.">
      <section className="section not-found">
        <div className="container">
          <BatteryArt variant="bike" className="not-found__art" />
          <h1>This page has run out of charge</h1>
          <p>The page you were looking for doesn&rsquo;t exist.</p>
          <div className="btn-row">
            <Link className="btn btn--primary" to="/">
              Go home
            </Link>
            <Link className="btn btn--ghost" to="/products">
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </Page>
  )
}
