import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import StoryShowcase from './components/StoryShowcase.jsx'
import Capabilities from './components/Capabilities.jsx'
import Comparison from './components/Comparison.jsx'
import Metrics from './components/Metrics.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import NightMap from './components/NightMap.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <StoryShowcase />
        <Capabilities />
        <Comparison />
        <Metrics />
      </main>
      {/* the page closes on the same canvas it opened on */}
      <div className="close-band">
        <NightMap />
        <Cta />
        <Footer />
      </div>
    </>
  )
}
