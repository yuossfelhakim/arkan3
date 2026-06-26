import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { t, isRtl } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const formColRef = useRef<HTMLDivElement>(null)
  const infoColRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formColRef.current) {
        gsap.fromTo(formColRef.current,
          { opacity: 0, x: isRtl ? -40 : 40 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
      if (infoColRef.current) {
        gsap.fromTo(infoColRef.current,
          { opacity: 0, x: isRtl ? 40 : -40 },
          {
            opacity: 1, x: 0, duration: 0.9, delay: 0.2, ease: 'power3.out',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <section
        ref={sectionRef}
        id="contact"
        className="bg-white py-24 border-t border-slate-100"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="max-w-[600px] mx-auto px-[5vw] text-center">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display font-extrabold text-3xl text-slate-800 mb-4">
            {t('تم استلام طلبكم بنجاح!', 'Your request has been received!')}
          </h3>
          <p className="font-body text-base text-slate-600 leading-relaxed">
            {t('شكرًا لاهتمامكم بخدمات أركان ترافيل. سيقوم أحد مسؤولي العلاقات العامة ودراسة المشاريع لدينا بالتواصل معكم هاتفياً لتقديم الاستشارة وعرض الأسعار في أسرع وقت ممكن.', 'Thank you for your interest in Arkan Travel services. One of our public relations and project studies officers will contact you by phone shortly to provide free consulting and your customized quote.')}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-white py-24 border-t border-slate-100"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1200px] mx-auto px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          {/* Left — Form */}
          <div ref={formColRef}>
            <span className="font-body font-semibold text-sm text-gold uppercase tracking-[0.08em] bg-gold/10 px-3.5 py-2 rounded-full inline-block">
              {t('اطلب عرض سعر مخصص لمؤسستك', 'Request a customized corporate quote')}
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-[40px] text-slate-800 mt-5 leading-tight">
              {t('دعنا نخطط سوياً لرحلات نقل مريحة لفريق عملك', "Let's plan comfortable commutes for your workforce")}
            </h2>
            <p className="font-body text-base text-slate-600 mt-4 leading-relaxed">
              {t('يسعدنا جدًا مناقشة متطلباتكم الخاصة؛ تفضل بملء بيانات النموذج أدناه، وسيتولى فريق المبيعات والتشغيل إعداد مسودة عرض فني ومالي دقيقة وموافاتكم بها سريعاً.', 'We are delighted to discuss your specific requirements. Please fill out the form below, and our sales and operations team will prepare a precise technical and financial proposal.')}
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body font-medium text-sm text-slate-700 block mb-1.5">
                    {t('اسم الشركة أو المصنع ', 'Company or Factory Name ')} <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-3.5 font-body text-base text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10 transition-all text-start"
                    placeholder={t('أمثلة: شركة المقاولات، مصنع المواد الغذائية', 'e.g. contracting company, food factory')}
                  />
                </div>
                <div>
                  <label className="font-body font-medium text-sm text-slate-700 block mb-1.5">
                    {t('اسم مسؤول التواصل ', 'Contact Person ')} <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-3.5 font-body text-base text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10 transition-all text-start"
                    placeholder={t('الاسم الثلاثي أو الثنائي', 'Full Name or Contact Name')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body font-medium text-sm text-slate-700 block mb-1.5">
                    {t('رقم الهاتف الجوال ', 'Mobile Phone Number ')} <span className="text-gold">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-3.5 font-body text-base text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10 transition-all text-start"
                    placeholder="010XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="font-body font-medium text-sm text-slate-700 block mb-1.5">
                    {t('البريد الإلكتروني للعمل', 'Work Email Address')}
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-3.5 font-body text-base text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10 transition-all text-start"
                    placeholder="example@yourfirm.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body font-medium text-sm text-slate-700 block mb-1.5">
                    {t('إجمالي عدد الموظفين المستهدف ', 'Total Targeted Employees ')} <span className="text-gold">*</span>
                  </label>
                  <select
                    required
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-3.5 font-body text-base text-slate-900 focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10 transition-all appearance-none text-start"
                  >
                    <option value="">{t('برجاء تحديد النطاق التقريبي', 'Please select approximate range')}</option>
                    <option value="<50">{t('أقل من 50 موظف وعامل', 'Less than 50 employees')}</option>
                    <option value="50-100">{t('من 50 إلى 100 موظف وعامل', '50 to 100 employees')}</option>
                    <option value="100-250">{t('من 100 إلى 250 موظف وعامل', '100 to 250 employees')}</option>
                    <option value="250-500">{t('من 250 إلى 500 موظف وعامل', '250 to 500 employees')}</option>
                    <option value=">500">{t('مؤسسة كبرى (أكثر من 500 موظف)', 'Enterprise (more than 500)')}</option>
                  </select>
                </div>
                <div>
                  <label className="font-body font-medium text-sm text-slate-700 block mb-1.5">
                    {t('نوع نظام التشغيل المطلوب ', 'Required Operation Type ')} <span className="text-gold">*</span>
                  </label>
                  <select
                    required
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-3.5 font-body text-base text-slate-900 focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10 transition-all appearance-none text-start"
                  >
                    <option value="">{t('برجاء الاختيار', 'Please select')}</option>
                    <option value="daily">{t('نقل يومي ثابت (دوام كامل)', 'Fixed daily transport (full-time)')}</option>
                    <option value="shifts">{t('نظام ورديات وشفتات متتابعة على مدار الساعة', 'Consecutive shifts (24/7)')}</option>
                    <option value="temp">{t('تأجير حافل لأحداث ومؤتمرات سنوية مؤقتة', 'Temporary event coach rentals')}</option>
                    <option value="other">{t('متطلبات تشغيلية أخرى', 'Other custom operations')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body font-medium text-sm text-slate-700 block mb-1.5">
                    {t('نقطة التجمع والاستلام ', 'Gathering & Pickup Points ')} <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-3.5 font-body text-base text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10 transition-all text-start"
                    placeholder={t('مثال: الجيزة وحلوان', 'e.g. Giza and Helwan')}
                  />
                </div>
                <div>
                  <label className="font-body font-medium text-sm text-slate-700 block mb-1.5">
                    {t('مقر الوصول والعمل ', 'Destination & Workplace ')} <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-3.5 font-body text-base text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10 transition-all text-start"
                    placeholder={t('مثال: المنطقة الحرة أو السادس من أكتوبر', 'e.g. Free Zone or 6th of October')}
                  />
                </div>
              </div>

              <div>
                <label className="font-body font-medium text-sm text-slate-700 block mb-1.5">
                  {t('تفاصيل واحتياجات تشغيلية هامة تود إضافتها', 'Additional Important Operational Requirements')}
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-white border border-slate-250 rounded-lg px-4 py-3.5 font-body text-base text-slate-900 placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10 transition-all resize-none text-start"
                  placeholder={t('مثال: تواريخ التشغيل المفضلة، سقف مالي محدد للخدمة، متطلبات تتبع إلكتروني خاصة...', 'e.g. preferred start dates, budget threshold, specific tracking requirements...')}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto font-body font-semibold text-lg bg-gold text-white px-12 py-4 rounded-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 shadow-md shadow-gold/20 cursor-pointer"
              >
                {submitting ? t('جاري إعداد وإرسال طلبكم...', 'Sending your request...') : t('إرسال طلب الحصول على دراسة مشروع', 'Submit Request for Proposal')}
              </button>
            </form>
          </div>

          {/* Right — Contact Info */}
          <div ref={infoColRef} className={isRtl ? 'lg:pr-16' : 'lg:pl-16'}>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm">
              <h3 className="font-display font-bold text-2xl text-slate-800 mb-6 font-display">
                {t('تواصل مباشر وسريع لدينا', 'Direct & Rapid Contact')}
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MessageCircle size={24} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-body font-medium text-sm text-slate-500 block">{t('واتساب الإدارة المباشر', 'Direct Administration WhatsApp')}</span>
                    <a 
                      href="https://wa.me/201119908096?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D8%A3%D8%B1%D9%83%D8%A7%D9%86%20%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%D9%84" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-body font-bold text-xl text-slate-800 hover:text-gold transition-colors inline-block" 
                      dir="ltr"
                    >
                      +20 11 19908096
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle size={24} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-body font-medium text-sm text-slate-500 block">{t('واتساب الاستشاري (المساعد الذكي)', 'Consultant WhatsApp (Smart Assistant)')}</span>
                    <a 
                      href="https://wa.me/201119908096?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%85%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%20%D8%A3%D8%B1%D9%83%D8%A7%D9%86%20%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%D9%84%D8%8C%20%D8%A3%D8%B1%D9%8A%D9%82%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%8%D9%82%D9%84%20%D8%A7%D9%84%D9%85%D9%88%D8%B8%D9%81%D9%8A%D9%86" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-body font-bold text-xl text-slate-800 hover:text-gold transition-colors inline-block"
                      dir="ltr"
                    >
                      +20 11 19908096
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={24} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-body font-medium text-sm text-slate-500 block">{t('المراسلات البريدية الرسمية', 'Official Email Correspondence')}</span>
                    <a href="mailto:arkantransportation@gmail.com" className="font-body font-bold text-lg text-slate-800 hover:text-gold transition-colors break-all">
                      arkantransportation@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={24} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-body font-medium text-sm text-slate-500 block">{t('ساعات استقبال المكالمات', 'Call Center Hours')}</span>
                    <span className="font-body font-semibold text-base text-slate-800 block">
                      {t('السبت – الخميس: 8 صباحاً – 8 مساءً', 'Saturday – Thursday: 8 AM – 8 PM')}
                    </span>
                    <span className="font-body text-sm text-gold font-medium block">
                      {t('يوم الجمعة: عطلة أسبوعية · دعم طارئ لرحلاتنا الشغالة: 24/7', 'Friday: Weekend Off · Emergency support for active trips: 24/7')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={`flex items-center gap-4 mt-8 ${isRtl ? 'justify-start' : 'justify-start'}`}>
              <a 
                href="https://www.facebook.com/ArkanTravel11" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-105 border border-slate-200 flex items-center justify-center text-gold hover:text-white hover:bg-gold hover:scale-110 transition-all"
                title={t("صفحتنا على فيسبوك", "Our Facebook Page")}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-105 border border-slate-200 flex items-center justify-center text-gold hover:text-white hover:bg-gold hover:scale-110 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/201119908096?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%88%D9%83%D9%85%20%D9%85%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%20%D8%A3%D8%B1%D9%83%D8%A7%D9%86%20%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%D9%84%D8%8C%2520%D8%A3%D8%B1%D9%8A%D8%AF%2520%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%2520%D8%B9%D9%86%2520%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%2520%D9%86%D9%82%D9%84%2520%D8%A7%D9%84%D9%85%D9%88%D8%B8%D9%81%D9%8A%25D9%2586" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-105 border border-slate-200 flex items-center justify-center text-gold hover:text-white hover:bg-gold hover:scale-110 transition-all"
                title={t("تواصل معنا عبر واتساب", "WhatsApp Us")}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
