import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FileDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t, isRtl } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  const [downloading, setDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloading) return;

    // Open immediately to bypass browser popup blockers
    window.open("https://drive.google.com/file/d/1LxJyof1LM-5wBe7gFcxSyiK9RSeVVvtB/view?usp=sharing", "_blank");

    setDownloading(true);
    setDownloadSuccess(false);

    // Smooth simulated download with a 1.8s delay to show premium visual feedback
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
    }, 1800);
  }

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(labelRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'
    })
    .to(titleRef.current, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
    }, '-=0.4')
    .to(subtitleRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
    }, '-=0.5')
    .to(ctaRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'
    }, '-=0.4')
    .to(trustRef.current, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power3.out'
    }, '-=0.3')
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center p-4 bg-slate-950"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background Video - Modern and immersive loop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-55 pointer-events-none"
      >
        <source src="https://res.cloudinary.com/dyqji8zrj/video/upload/v1782367643/1c099f16-762f-4785-88f8-96d3bf075218_vts5hv.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 z-[1] bg-black/30"
        style={{
          background: `
            linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.4) 50%, rgba(15,23,42,0.75) 100%),
            radial-gradient(ellipse at center, transparent 30%, rgba(15,23,42,0.4) 100%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-[2] w-full max-w-[850px] text-center mx-auto py-[10vh] px-4">
        <span
          ref={labelRef}
          className="opacity-0 translate-y-5 inline-block font-body font-bold text-xs md:text-sm text-gold-light uppercase tracking-[0.1em] mb-5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
        >
          {t('نقل موظفين احترافي متكامل · شريككم المعتمد منذ ٢٠١٥', 'Professional Employee Transportation · Your trusted partner since 2015')}
        </span>

        <h1
          ref={titleRef}
          className="opacity-0 translate-y-10 font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.35] mt-[12px] mb-6 text-white"
        >
          {t('خدمة نقل موظفين ', 'Employee Transportation ')} <br className="hidden sm:inline" />
          <span className="text-gold-light block mt-[15px] sm:mt-[23px] text-[28px] sm:text-[45px] leading-tight w-[821px] max-w-full min-h-[90px] md:min-h-[120px] h-auto rounded-none mx-auto font-normal no-underline">
            {t('تعتمد على الأمان، الالتزام، والانضباط', 'Built on Safety, Commitment & Reliability')}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="opacity-0 translate-y-8 font-body text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed mb-10 max-w-[700px] mx-auto"
        >
          {t('نوفر أحدث أساطيل الحافلات الفاخرة المخصصة لنقل الموظفين والعمال والوفود بأعلى معايير الأمن والسلامة، مع الالتزام المطلق بجدول أعمال شركتكم.', 'We provide the latest luxury fleet of buses tailored for staff, workers, and delegations, adhering to the highest standards of safety and absolute commitment to your schedule.')}
        </p>

        <div ref={ctaRef} className="opacity-0 translate-y-5 flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => scrollTo('contact')}
            className="font-body font-semibold text-base bg-gold text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-full hover:scale-[1.03] transition-all duration-200 shadow-lg shadow-gold/20 cursor-pointer"
          >
            {t('اطلب دراسة مسار وعرض سعر مجاني', 'Request Route Study & Free Quote')}
          </button>
          <button
            onClick={() => scrollTo('fleet')}
            className="font-body font-semibold text-base bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-250 cursor-pointer"
          >
            {t('استعرض أسطول حافلاتنا', 'Explore Our Fleet')}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="font-body font-semibold text-base bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-250 cursor-pointer flex items-center gap-2 min-w-[240px] justify-center disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-gold-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t('جاري فتح الملف...', 'Opening Profile...')}</span>
              </>
            ) : downloadSuccess ? (
              <>
                <svg className="h-5 w-5 text-green-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-400 font-bold">{t('تم الفتح بنجاح ✓', 'Opened Successfully ✓')}</span>
              </>
            ) : (
              <>
                <FileDown size={20} className="text-gold-light" />
                <span>{t('تحميل البروفايل التعريفي', 'Download Company Profile')}</span>
              </>
            )}
          </button>
        </div>

        <div ref={trustRef} className="opacity-0 translate-y-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-white/10 pt-8">
          {[
            t('شبكة تغطية 50+ مركبة حديثة', '50+ modern vehicle network'),
            t('سائقون بمعايير قيادة صارمة', 'Strict driving standards'),
            t('متابعة وتشغيل فوري 24/7', '24/7 instant operation & tracking')
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
              <span className="font-body text-xs sm:text-sm text-slate-300 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
