import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Factory, Landmark } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const { t, isRtl } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: Building2,
      title: t('نقل موظفي الشركات', 'Corporate Staff Transportation'),
      description: t('نوفر حلول نقل جماعي يومية ومخصصة لتأمين وصول كوادر عملكم من وإلى مقار الشركات والمكاتب الإدارية بتوقيتات بالغة الدقة ومسارات ذكية محسّنة.', 'We deliver daily group transport solutions securing your personnel to and from corporate headquarters and offices with highly precise timing and optimized routes.'),
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Factory,
      title: t('نقل عمال ومصانع', 'Factory & Labor Transportation'),
      description: t('خدمات نقل مخصصة للمصانع الكبرى والمناطق الصناعية لتغطية الورديات المتتالية وتناوب العمالة بلا انقطاع، مع الحفاظ على أعلى مستويات الجهوزية.', 'Custom transit services for large-scale factories and industrial zones covering consecutive, 24/7 labor shifts smoothly while maintaining top readiness.'),
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Landmark,
      title: t('النقل المؤسسي والوفود', 'Institutional & Delegation Transport'),
      description: t('تلبية الاحتياجات الرسمية والبروتوكولية للوزارات والهيئات الحكومية والوفود الرسمية، عبر أسطول راقٍ يعكس الهوية المؤسسية باحترافية كاملة.', 'Fulfilling official and protocol transit needs for ministries, governmental authorities, and delegations, with a premium corporate identity.'),
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
    }
  ]

  useEffect(() => {
    if (!cardsRef.current) return

    const cards = cardsRef.current.querySelectorAll('.service-card')
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-white py-24 border-t border-slate-100"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1200px] mx-auto px-[5vw]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body font-semibold text-xs text-gold uppercase tracking-[0.08em] bg-gold/10 px-3 py-1.5 rounded-full">
            {t('خدمات نقل مخصصة للشركات والمصانع', 'Tailored Corporate & Factory Transit Services')}
          </span>
          <h2 className="font-display font-extrabold text-[28px] sm:text-5xl heading-gradient mt-5 leading-tight">
            {t('حلول نقل تضمن استمرارية أعمالكم بكفاءة تامة', 'Transport Solutions Ensuring Perfect Efficiency for Your Business')}
          </h2>
          <p className="font-body text-base md:text-lg text-slate-600 max-w-[700px] mx-auto mt-4 leading-relaxed">
            {t('نقدم لكم خدمات نقل متطورة تُعنى بأدق تفاصيل رحلتكم اليومية، مما يمنح كوادركم رحلة مريحة تزيد من إنتاجيتهم وتقلل الإجهاد اليومي.', 'We provide sophisticated transportation services focusing on every detail of your daily commute, offering comfortable rides that boost productivity and reduce stress.')}
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card bg-white border border-slate-200/60 rounded-2xl p-8 hover:-translate-y-2 hover:border-gold/30 hover:shadow-lg shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <service.icon
                    size={28}
                    className="text-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-slate-800 mb-4 text-start">
                  {service.title}
                </h3>
                <p className="font-body text-base text-slate-600 leading-relaxed mb-6 text-start">
                  {service.description}
                </p>
              </div>
              <div className="rounded-xl overflow-hidden mt-2 border border-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full aspect-video object-cover hover:scale-105 duration-300 transition-transform"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
