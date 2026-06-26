import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t, isRtl } = useLanguage()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const WHATSAPP_LINK = "https://wa.me/201119908096?text=" + encodeURIComponent(t("السلام عليكم أرغب في الاستفسار عن خدمات النقل من أركان ترافيل", "Hello, I would like to inquire about transport services from Arkan Travel."));
  const FACEBOOK_LINK = "https://www.facebook.com/ArkanTravel11";
  const EMAIL_LINK = "mailto:arkantransportation@gmail.com";
  const PHONE_LINK = "tel:+201050078365";

  const fleetItems = [
    t('حافلات نقل موظفين الشركات', 'Corporate Staff Commute'),
    t('سيارات نقل العمالة الكبرى', 'Major Labor & Factory Fleet'),
    t('حافلات النقل الفاخرة للوفود', 'Luxury Delegation Coaches'),
    t('خدمة تتبع ومراقبة GPS', 'Live GPS Tracking Solutions'),
    t('التغطية بجميع أنحاء الجمهورية', 'Nationwide Coverage')
  ]

  const companyItems = [
    { label: t('من نحن', 'About Us'), id: 'why' },
    { label: t('أسطولنا', 'Our Fleet'), id: 'fleet' },
    { label: t('عملاؤنا', 'Our Clients'), id: 'testimonials' },
    { label: t('الشروط والأحكام', 'Terms & Conditions'), id: '' },
    { label: t('سياسة الخصوصية', 'Privacy Policy'), id: '' },
  ]

  return (
    <footer className="bg-[#FFFFFF] border-t border-slate-200 py-16 md:py-20" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-[1200px] mx-auto px-[5vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-start">
          {/* Column 1 — Brand */}
          <div className="text-start">
            <span className="font-display font-bold text-xl text-gold block">
              {t('أركان ترافيل', 'Arkan Travel')}
            </span>
            <span className="font-body text-xs text-slate-500 block mb-4">
              {t('لنقل الموظفين', 'Employee Transportation')}
            </span>
            <p className="font-body text-sm text-slate-600 leading-relaxed max-w-[240px]">
              {t('خدمات نقل موظفين احترافية للشركات والمصانع والمؤسسات في مصر.', 'Professional employee transport services for corporate firms, factories & offices in Egypt.')}
            </p>
            <div className="flex items-center gap-4 mt-5">
              {/* Facebook */}
              <a 
                href={FACEBOOK_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gold/60 hover:text-gold transition-colors"
                title={t("فيسبوك أركان ترافيل", "Arkan Travel Facebook")}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-gold/60 hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gold/60 hover:text-gold transition-colors"
                title={t("واتساب مبيعات أركان ترافيل", "Arkan Travel WhatsApp")}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Fleet & Coverage */}
          <div>
            <h4 className="font-display font-bold text-base text-slate-800 mb-4">
              {t('أسطولنا وتغطيتنا', 'Fleet & Coverage')}
            </h4>
            <ul className="space-y-3 p-0 m-0 list-none text-start">
              {fleetItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo('fleet')}
                    className="font-body text-sm text-slate-600 hover:text-gold transition-colors text-start cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="font-display font-bold text-base text-slate-800 mb-4">
              {t('الشركة', 'Company')}
            </h4>
            <ul className="space-y-3 p-0 m-0 list-none text-start">
              {companyItems.map((item) => (
                <li key={item.label}>
                  {item.id ? (
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="font-body text-sm text-slate-600 hover:text-gold transition-colors text-start cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <span className="font-body text-sm text-slate-500">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="font-display font-bold text-base text-slate-800 mb-4">
              {t('تواصل معنا', 'Contact Us')}
            </h4>
            <ul className="space-y-3 p-0 m-0 list-none text-start">
              <li className="font-body text-sm text-slate-600">
                <a href={PHONE_LINK} className="hover:text-gold transition-colors inline-block" dir="ltr">
                  +20 10 50078365
                </a>
              </li>
              <li className="font-body text-sm text-slate-600">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-block" dir="ltr">
                  +20 11 19908096{t(' (واتساب)', ' (WhatsApp)')}
                </a>
              </li>
              <li className="font-body text-sm text-slate-600">
                <a href={EMAIL_LINK} className="hover:text-gold transition-colors break-all">
                  arkantransportation@gmail.com
                </a>
              </li>
              <li className="font-body text-sm text-slate-600">{t('القاهرة، مصر', 'Cairo, Egypt')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-body text-xs text-slate-400">
            {t('© 2025 أركان ترافيل. جميع الحقوق محفوظة.', '© 2025 Arkan Travel. All rights reserved.')}
          </span>
          <span className="font-body text-xs text-slate-400">
            {t('تصميم وتطوير', 'Designed & Developed by Arkan')}
          </span>
        </div>
      </div>
    </footer>
  )
}
