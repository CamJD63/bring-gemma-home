import { motion } from 'framer-motion'
import SightingsMap from './components/SightingsMap.jsx'
import GoogleSightingsMap from './components/GoogleSightingsMap.jsx'
import { sightings } from './data/sightings.js'

const CONTACT_PHONE = '(801) 792-6800'

// If a Google Maps API key is configured, use Google Maps.
// Otherwise fall back to the free Leaflet/OpenStreetMap map so the
// site always works with no setup.
const useGoogle = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)

// Shared animation helpers
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <motion.div
          className="hero-inner"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="photo-frame"
            variants={fadeUp}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            whileHover={{ scale: 1.05, rotate: -3 }}
          >
            <img
              className="gemma-photo"
              src="/gemma.jpg"
              alt="Gemma — a black and tan German Shepherd mix wearing a pink collar"
              onError={(e) => {
                e.currentTarget.parentElement.classList.add('photo-fallback')
                e.currentTarget.remove()
              }}
            />
          </motion.div>
          <div className="hero-text">
            <motion.p className="eyebrow" variants={fadeUp}>
              Lost Dog · Provo, UT
            </motion.p>
            <motion.h1 variants={fadeUp}>Bring Gemma Home</motion.h1>
            <motion.p className="lede" variants={fadeUp}>
              Our dog Gemma is lost near Meadow Fork Rd. If you spot her, please don't
              call her or chase her — she's very skittish and will run. Note where and
              when you saw her and contact us right away.
            </motion.p>
            <motion.div className="contact" variants={fadeUp}>
              <motion.a
                className="call-btn"
                href="tel:+18017926800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  boxShadow: [
                    '0 4px 14px rgba(214, 51, 108, 0.3)',
                    '0 6px 22px rgba(214, 51, 108, 0.55)',
                    '0 4px 14px rgba(214, 51, 108, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Call {CONTACT_PHONE}
              </motion.a>
              <span className="contact-alt">or call Animal Control</span>
            </motion.div>
          </div>
        </motion.div>
      </header>

      <main>
        <motion.section
          className="map-section"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2>Where Gemma's been spotted</h2>
          <p className="map-help">
            Hover over a marker to see the time of the sighting.{' '}
            <span className="legend">
              <span className="dot home" /> Lost here &nbsp;
              <span className="dot sighting" /> Sighting
            </span>
          </p>
          {useGoogle ? <GoogleSightingsMap /> : <SightingsMap />}
          {sightings.length === 0 && (
            <p className="empty-note">
              No sightings reported yet. The pink marker shows where Gemma was lost —
              new sightings will appear here as they come in.
            </p>
          )}
        </motion.section>
      </main>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p>
          Please help us bring Gemma home. Share this page with neighbors. If you see
          her, call <a href="tel:+18017926800">{CONTACT_PHONE}</a> or Animal Control.
        </p>
        <p className="reminder">Remember: don't chase or call her — she will run.</p>
      </motion.footer>
    </div>
  )
}
