import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUp } from 'lucide-react'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import WhyArkan from './sections/WhyArkan'
import FleetShowcase from './sections/FleetShowcase'
import Statistics from './sections/Statistics'
import ServiceCoverage from './sections/ServiceCoverage'
import Testimonials from './sections/Testimonials'
import HowItWorks from './sections/HowItWorks'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import SupportWidget from './components/SupportWidget'
import { LanguageProvider, useLanguage } from './context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function AppContent() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { isRtl, t } = useLanguage()

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      // Initialize smooth scroll feel via ScrollTrigger defaults
      ScrollTrigger.defaults({
        toggleActions: 'play none none none'
      })
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navigation />
      <main>
        <Hero />
        <WhyArkan />
        <FleetShowcase />
        <Statistics />
        <ServiceCoverage />
        <Testimonials />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />

      {/* Interactive Support / WhatsApp Assistant Widget on the Left/Right based on language */}
      <SupportWidget />

      {/* Scroll to Top Arrow - Positioned dynamically based on RTL/LTR */}
      {showScrollTop && (
        <button
          onClick={scrollTop}
          className={`fixed bottom-6 ${isRtl ? 'right-6 md:right-8' : 'left-6 md:left-8'} z-50 bg-gold text-white p-3.5 rounded-full shadow-xl hover:scale-110 hover:bg-gold-light active:scale-95 transition-all duration-300 cursor-pointer border border-white/10`}
          aria-label={t("الرجوع إلى الأعلى", "Back to top")}
        >
          <ArrowUp size={24} strokeWidth={2.5} />
        </button>
      )}
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
