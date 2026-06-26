import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  initials: string;
}

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  isRtl: boolean;
}) => {
  const { isRtl } = props;
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ quote, name, title, initials }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-8 rounded-3xl border border-slate-100 shadow-lg bg-white transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-gold/30 w-full max-w-sm relative overflow-hidden"
                >
                  <blockquote className="m-0 p-0 relative z-10 text-start">
                    {/* Quote mark inside card */}
                    <span
                      className={`absolute -top-6 ${isRtl ? '-right-2' : '-left-2'} font-display font-black text-6xl text-slate-100 leading-none select-none`}
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <p className="font-body text-sm md:text-base text-slate-700 leading-relaxed m-0 relative z-10">
                      {quote}
                    </p>
                    <footer className={`flex items-center gap-3 mt-6 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                      {!isRtl && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0 ring-2 ring-slate-100 group-hover:ring-gold/30 transition-all duration-300 ease-in-out">
                          <span className="font-display font-bold text-xs text-slate-950">
                            {initials}
                          </span>
                        </div>
                      )}
                      <div className={`flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
                        <cite className="font-display font-semibold not-italic tracking-tight leading-5 text-slate-900">
                          {name}
                        </cite>
                        <span className="font-body text-xs leading-5 tracking-tight text-slate-500 mt-1">
                          {title}
                        </span>
                      </div>
                      {isRtl && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0 ring-2 ring-slate-100 group-hover:ring-gold/30 transition-all duration-300 ease-in-out">
                          <span className="font-display font-bold text-xs text-slate-950">
                            {initials}
                          </span>
                        </div>
                      )}
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export default function Testimonials() {
  const { t, isRtl } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const list = [
    {
      quote: t('تعاملنا مع أركان ترافيل منذ ثلاث سنوات، والخدمة ممتازة باستمرار. الالتزام بالمواعيد مثالي، والسائقون محترفون جداً. الموظفون يشعرون بالأمان والراحة في الرحلات اليومية.', 'We have been working with Arkan Travel for three years, and the service is consistently excellent. Punctuality is perfect, and drivers are very professional. Employees feel safe and comfortable in their daily commute.'),
      name: t('محمد عبدالله', 'Mohamed Abdullah'),
      title: t('مدير الموارد البشرية · مصنع النهضة للصناعات', 'HR Manager · Al-Nahda Industrial Corp'),
      initials: t('م.ع', 'MA')
    },
    {
      quote: t('كشركة تكنولوجيا نعمل في فترات مرنة، كنا نحتاج لشريك نقل يستوعب تغيرات الجداول. أركان قدموا لنا حلاً مرناً مع خدمة عملاء استثنائية. أنصح بهم بشدة.', 'As a technology company with flexible hours, we needed a transport partner that accommodates schedule shifts. Arkan provided a flexible solution with outstanding customer care. Highly recommended.'),
      name: t('سارة محمود', 'Sarah Mahmoud'),
      title: t('مديرة العمليات · شركات Delta Tech', 'Operations Director · Delta Tech Co.'),
      initials: t('س.م', 'SM')
    },
    {
      quote: t('النقل كان تحدياً كبيراً لنا مع توسع المصنع في العاشر من رمضان. أركان ترافيل وفروا لنا أسطولاً مخصصاً يغطي جميع الشفتات — الصباحية والمسائية والليلية — بدون أي تأخير.', 'Transportation was a major challenge with our factory expansion in 10th of Ramadan. Arkan Travel provided a dedicated fleet covering all morning, evening, and night shifts with absolute zero delays.'),
      name: t('أحمد خالد', 'Ahmed Khaled'),
      title: t('مدير الإنتاج · مجموعة الأمل الصناعية', 'Production Director · Al-Amal Group'),
      initials: t('أ.خ', 'AK')
    }
  ]

  const firstColumn = [list[0], list[1], list[2]]
  const secondColumn = [list[1], list[2], list[0]]
  const thirdColumn = [list[2], list[0], list[1]]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.testimonials-header')
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
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
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-navy-base py-24 md:py-32 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-700/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-[5vw] z-10 relative">
        {/* Header */}
        <div className="text-center mb-16 testimonials-header">
          <span className="font-body font-semibold text-[22px] text-gold tracking-[0.08em] block mb-2">
            {t('شهادات عملائنا', 'Client Testimonials')}
          </span>
          <h2 className="font-display font-extrabold text-[28px] sm:text-5xl heading-gradient leading-tight min-h-[50px] md:min-h-[62px] h-auto block mb-4">
            {t('ماذا يقول عملاؤنا عنا', 'What Our Clients Say About Us')}
          </h2>
          <p className="font-body text-slate-400 max-w-[600px] mx-auto text-base md:text-lg leading-relaxed">
            {t('شركاء النجاح يشاركون تجربتهم الاستثنائية والحلول المرنة والمنضبطة في تسيير رحلاتهم مع أركان ترافيل.', 'Our partners share their exceptional experiences with our reliable corporate transportation and flexible dispatching solutions.')}
          </p>
        </div>

        {/* Scrolling Columns with fade masks */}
        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[640px] overflow-hidden"
          role="region"
          aria-label="Client feedback perpetual loop"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={26} className="w-full max-w-sm" isRtl={isRtl} />
          <TestimonialsColumn testimonials={secondColumn} duration={32} className="hidden md:block w-full max-w-sm" isRtl={isRtl} />
          <TestimonialsColumn testimonials={thirdColumn} duration={29} className="hidden lg:block w-full max-w-sm" isRtl={isRtl} />
        </div>
      </div>
    </section>
  )
}
