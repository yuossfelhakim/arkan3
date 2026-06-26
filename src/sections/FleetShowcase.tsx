import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function FleetShowcase() {
  const { t, isRtl } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const fleetImages = [
    {
      src: 'https://res.cloudinary.com/dyqji8zrj/image/upload/v1780682258/Ultra_realistic_employee_transportation_service__202606052050_oxwrbw.jpg',
      label: t('نقل الموظفين اليومي', 'Daily Staff Transportation'),
      description: t('حافلات حديثة مجهزة بالكامل لضمان راحة وإنتاجية كوادر عملكم يومياً.', 'Fully equipped modern buses ensuring daily comfort and productivity for your workforce.')
    },
    {
      src: 'https://res.cloudinary.com/dyqji8zrj/image/upload/v1780682258/Ultra_realistic_factory_transportation_service__202606052051_mlbcs1.jpg',
      label: t('نقل عمال ومصانع', 'Factory & Labor Transportation'),
      description: t('خطوط نقل دقيقة لخدمة الورديات المتعاقبة على مدار الساعة بأقصى درجات الالتزام.', 'Precise routes designed to service consecutive shifts 24/7 with the highest discipline.')
    },
    {
      src: 'https://res.cloudinary.com/dyqji8zrj/image/upload/v1780682259/Ultra_realistic_school_transportation_service__202606052056_b54af8.jpg',
      label: t('النقل المدرسي والجامعي', 'School & University Transport'),
      description: t('حلول ذكية وآمنة لنقل الطلاب بمشرفين مؤهلين وأعلى معايير الأمن والسلامة.', 'Smart and safe student transport solutions with qualified supervisors and top safety standards.')
    },
    {
      src: 'https://res.cloudinary.com/dyqji8zrj/image/upload/v1780682259/Ultra_realistic_security_personnel_transportation__202606052055_bfmlkc.jpg',
      label: t('نقل شركات الأمن', 'Security Staff Transportation'),
      description: t('نوفر خدمات نقل يومية ومرنة لأفراد الأمن، مع متابعة مستمرة للرحلات والتزام كامل بمواعيد التشغيل.', 'Flexible daily transfers for security staff, with constant tracking and total schedule commitment.')
    }
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      // Grid items entrance animation (staggered scroll triggered)
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="fleet"
      className="bg-[#F9FAFB] py-24 border-t border-slate-100 overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1200px] mx-auto px-[5vw]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-body font-semibold text-[22px] text-gold uppercase tracking-[0.08em] bg-gold/10 px-3 py-1.5 rounded-full">
            {t('خدمات أسطولنا المميز', 'Our Premium Fleet Services')}
          </span>
          <h2 className="font-display font-extrabold text-[32px] sm:text-[47px] min-h-[50px] md:min-h-[73px] h-auto heading-gradient mt-[20px] leading-tight">
            {t('حلول نقل متكاملة تلبي احتياجاتكم بدقة', 'Integrated Fleet Solutions Tailored to Your Needs')}
          </h2>
          <p className="font-body text-base md:text-lg text-slate-600 max-w-[700px] mx-auto mt-4 leading-relaxed">
            {t('نوفر لكم من خلال أسطولنا المتنوع والمجهز بأحدث الوسائل التكنولوجية خدمات نقل ذكية تضمن الأمان التام والالتزام الصارم بجميع جداول أعمالكم.', 'Through our diverse fleet equipped with the latest technologies, we offer smart transport services ensuring safety and absolute commitment to your schedules.')}
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {fleetImages.map((img) => (
            <div
              key={img.src}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/65 shadow-sm hover:shadow-xl hover:border-gold/25 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90" />
                
                {/* Floating Category Tag */}
                <span className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} bg-gold text-white font-body font-medium text-xs px-3 py-1.5 rounded-md shadow-md`}>
                  {t('خدمة متميزة', 'Premium Service')}
                </span>
                
                {/* On-image label (Fallback/Enhancement) */}
                <div className={`absolute bottom-4 ${isRtl ? 'right-4 left-4' : 'left-4 right-4'} text-white z-10`}>
                  <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">
                    {img.label}
                  </h3>
                </div>
              </div>

              {/* Text content under image for premium corporate details and clarity */}
              <div className="p-6 md:p-8 bg-white">
                <p className="font-body text-slate-600 text-sm md:text-base leading-relaxed">
                  {img.description}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-body">
                  <span>{t('أنظمة تتبع GPS حية بدقة', 'High-Precision Live GPS Tracking')}</span>
                  <span className="text-gold font-semibold">{t('تأمين شامل 100%', '100% Full Insurance')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
