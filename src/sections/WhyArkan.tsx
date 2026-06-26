import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Clock, Users } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function WhyArkan() {
  const { t, isRtl } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  const pillars = [
    { 
      word: t('الأمان', 'Safety'), 
      icon: ShieldCheck, 
      title: t('الأمان في كل رحلة', 'Safety in Every Journey'), 
      description: t('نحرص على سلامة كل رحلة من خلال أنظمة تتبع GPS الحديثة، مع فحص وصيانة دورية لأسطولنا لضمان خدمة آمنة ومنظمة.', 'We ensure the safety of every trip through modern GPS tracking systems, combined with regular fleet inspection & maintenance.') 
    },
    { 
      word: t('الانضباط', 'Discipline'), 
      icon: Clock, 
      title: t('الالتزام بالمواعيد دائماً', 'Absolute Punctuality'), 
      description: t('نفهم أن تأخر المواصلات يعني خسارة في الإنتاجية. نظامنا التشغيلي يضمن وصولاً دقيقاً في الوقت المحدد — 99.2% معدل الالتزام بالمواعيد على مدار 26 عاماً.', 'We understand that transit delays mean lost productivity. Our operational system guarantees precise arrival times - boasting a 99.2% on-time record.') 
    },
    { 
      word: t('الاحترافية', 'Expertise'), 
      icon: Users, 
      title: t('سائقون محترفون مدربون', 'Highly Trained Drivers'), 
      description: t('فريق سائقينا مدرب تدريباً مهنياً على أعلى مستوى — رخص قيادة مهنية، فحوصات طبية دورية، دورات في خدمة العملاء والسلامة المرورية، وسلوك مهني يعكس قيم شركتك.', 'Our driving team is professionally trained to the highest standards - carrying professional licenses, undergoing medical screenings, customer care training, and representing your company values.') 
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pillars slide in
      if (pillarsRef.current) {
        const words = pillarsRef.current.querySelectorAll('.pillar-word')
        gsap.fromTo(words,
          { opacity: 0, x: isRtl ? -60 : 60 },
          {
            opacity: 1, x: 0, stagger: 0.2, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      // Details fade in from bottom
      if (detailsRef.current) {
        const details = detailsRef.current.querySelectorAll('.detail-block')
        gsap.fromTo(details,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [isRtl])

  return (
    <section
      ref={sectionRef}
      id="why"
      className="bg-navy-deep py-20 md:py-32 overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1200px] mx-auto px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          {/* Column — Pillars */}
          <div ref={pillarsRef} className="min-h-[350px] md:min-h-[450px]">
            <span className="font-body font-semibold text-[22px] text-gold tracking-[0.08em] mb-6 block">
              {t('لماذا أركان', 'Why Arkan')}
            </span>
            <div className="flex flex-col gap-4 sm:gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.word} className="pillar-word flex items-center gap-3">
                  <h3 className="font-display font-black text-4xl sm:text-6xl md:text-7xl heading-gradient leading-none min-h-[50px] md:min-h-[85px]">
                    {pillar.word}
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>
              ))}
            </div>
          </div>

          {/* Column — Details */}
          <div ref={detailsRef} className="flex flex-col justify-center">
            {pillars.map((pillar, index) => (
              <div key={pillar.title} className="detail-block">
                <div className="flex items-center gap-3 mb-3">
                  <pillar.icon size={32} className="text-gold" />
                  <h4 className="font-display font-bold text-xl md:text-2xl text-slate-800">
                    {pillar.title}
                  </h4>
                </div>
                <p className="font-body text-base text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
                {index < pillars.length - 1 && (
                  <div className="my-8 h-px bg-slate-100" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
