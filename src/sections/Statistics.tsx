import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Statistics() {
  const { language, t, isRtl } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  const stats = [
    { value: 50, suffix: '+', label: t('حافلة ومركبة حديثة', 'Modern Buses & Vehicles') },
    { value: 99.2, suffix: '%', label: t('معدل الالتزام بالمواعيد', 'On-Time Punctuality Rate'), isDecimal: true },
    { value: 120, suffix: '+', label: t('عميل وشركة متعاقدة', 'Corporate Clients') },
    { value: 26, suffix: '+', label: t('عاماً من الخبرة والريادة', 'Years of Industry Experience') },
    { value: 85, suffix: '+', label: t('سائق محترف ومعتمد', 'Certified Professional Drivers') },
    { value: 30000, suffix: '+', label: t('رحلة آمنة شهرياً', 'Safe Monthly Trips') },
    { value: 24, suffix: '/7', label: t('دعم وغرفة عمليات', 'Operations & Support Center') },
    { value: 100, suffix: '%', label: t('تغطية تأمينية شاملة', 'Comprehensive Insurance Coverage') },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, index) => {
        const el = numbersRef.current[index]
        if (!el) return

        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          delay: index * 0.1,
          ease: 'power2.out',
          snap: stat.isDecimal ? { val: 0.1 } : { val: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            if (stat.isDecimal) {
              el.textContent = obj.val.toFixed(1) + stat.suffix
            } else {
              el.textContent = Math.floor(obj.val).toLocaleString('en-US') + stat.suffix
            }
          }
        })
      })

      // Fade in stat items
      const items = sectionRef.current?.querySelectorAll('.stat-item')
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [language]) // Re-run when language changes to fetch correct items array

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 border-t border-slate-100"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1200px] mx-auto px-[5vw]">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-body font-semibold text-[22px] text-gold uppercase tracking-[0.08em] bg-gold/10 px-3 py-1.5 rounded-full">
            {t('أرقام تعكس جدارتنا', 'Numbers Reflecting Our Credibility')}
          </span>
          <h2 className="font-display font-extrabold text-[28px] sm:text-5xl heading-gradient mt-5 leading-tight min-h-[50px] md:min-h-[62px] h-auto">
            {t('مسيرة حافلة بالانضباط والتميز والنجاح', 'A Journey Driven by Punctuality & Excellence')}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className="stat-item text-center">
              <span
                ref={el => { numbersRef.current[index] = el }}
                className="font-display font-black text-4xl md:text-6xl text-gold leading-none block"
                dir="ltr"
              >
                0
              </span>
              <span className="w-1 h-1 rounded-full bg-gold/40 mx-auto my-3 block" />
              <span className="font-body font-medium text-sm md:text-base text-slate-600 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
