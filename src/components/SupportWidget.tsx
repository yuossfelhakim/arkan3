import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Phone, MessageSquare, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react'

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  actions?: {
    label: string
    url?: string
    anchorId?: string
    whatsappText?: string
    onClickAction?: string
  }[]
}

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'مرحباً بك في أركان ترافيل لنقل الموظفين! 🚌 يسعدني مساعدتك والإجابة على أي استفسارات لديكم. كيف يمكنني إفادتك اليوم؟',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the bottom of the chat window
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const WHATSAPP_NUMBER = '201119908096' // Configured WhatsApp number

  const generateWhatsAppLink = (text: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  };

  const menuOptions = [
    {
      id: 'contract',
      label: '📄 طلب شراكة أو خدمات تعاقد سنوي',
    },
    {
      id: 'quote',
      label: '💰 الحصول على دراسة وعرض أسعار',
    },
    {
      id: 'coverage',
      label: '📍 المدن والمناطق الجغرافية التي نغطيها',
    },
    {
      id: 'fleet_info',
      label: '🚌 تفاصيل ومواصفات أسطول الحافلات',
    },
  ]

  const handleOptionClick = (optionId: string, label: string) => {
    // Add user message selection to list
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: label,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    setTimeout(() => {
      let reply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      }

      if (optionId === 'contract') {
        reply.text = 'يسعدنا جداً تقديم خدمات النقل التعاقدي لشركتكم أو مصنعكم بعقود سنوية مرنة وأسعار منافسة. لتحديد موعد ومناقشة بنود العقد، تفضل بالتحدث مع مدير التعاقدات مباشرة عبر واتساب.'
        reply.actions = [
          {
            label: '💬 تواصل مع مدير المسؤول عن التعاقدات عبر واتساب',
            url: generateWhatsAppLink('السلام عليكم، نود الاستفسار عن تفاصيل التعاقد السنوي لنقل الموظفين والعمال في مؤسستنا وعقد شراكة مع أركان ترافيل.')
          }
        ]
      } else if (optionId === 'quote') {
        reply.text = 'أهلاً بك! يمكنك الحصول على دراسة مسارات وعرض أسعار فني ومالي مدرب ومفصل. لنسهل عليك، يمكنك ملء نموذج المعاينة في موقعنا أو النقر للتحدث فوراً مع مبيعات واتس اب.'
        reply.actions = [
          {
            label: '✍️ ملء نموذج المعاينة المخصص في الموقع',
            anchorId: 'contact'
          },
          {
            label: '💬 اطلب عرض أسعار فوري عبر واتساب الآن',
            url: generateWhatsAppLink('السلام عليكم، نود الحصول على عرض سعر مخصص ودراسة مسارات لنقل موظفي شركتنا من أركان ترافيل.')
          }
        ]
      } else if (optionId === 'coverage') {
        reply.text = 'نحن نقدم تغطية تشغيلية شاملة لكافة المدن الكبرى والمناطق الصناعية في مصر، مثل: القاهرة الكبرى، الجيزة، الإسكندرية والساحل، العاشر من رمضان، السادس من أكتوبر، مدينة بدر، العبور، الشروق ومدينتي، والتجمع بالقاهرة الجديدة. هل تود تنسيق مسار مخصص لموظفيك؟'
        reply.actions = [
          {
            label: '💬 استفسر عن مسار خاص لموظفيك على واتساب',
            url: generateWhatsAppLink('السلام عليكم، أود الاستعلام عن إمكانية تغطية مسار ونقل موظفينا إلى المنطقة المحددة لدينا.')
          }
        ]
      } else if (optionId === 'fleet_info') {
        reply.text = 'يمتلك أسطولنا حافلات حديثة ومكيفة بموديلات تبدأ من ٢٠٢٢ إلى ٢٠٢٦، وتتسع لعدد (١٤، ٢٩، ٣٣، أو ٥٠) راكب، ومجهزة كلياً بأنظمة تتبع GPS ذكية لمراقبة حركة سير الحافلات لضمان راحتكم وأمن عمالكم التام.'
        reply.actions = [
          {
            label: '💬 اطلب صور الحافلات وسعاتها المتوفرة على واتساب',
            url: generateWhatsAppLink('السلام عليكم، أود الحصول على صور وتفاصيل الحافلات المتوفرة وسعاتها لنقل الموظفين.')
          }
        ]
      }

      setMessages((prev) => [...prev, reply])
      setIsTyping(false)
    }, 850)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userText = inputValue.trim()
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate smart support response redirecting to WhatsApp
    setTimeout(() => {
      const replyText = `نشكرك جزيل الشكر على استفسارك المكتوب: "${userText}".\n\nللإجابة على هذا الاستفسار بدقة متناهية من قبل فريق خدمة العملاء والعمليات لدينا، يرجى التحدث المباشر معنا عبر واتس اب؛ حيث سيقوم أحد ممثلينا بخدمتك وإرسال كافة المستندات والملفات المطلوبة فوراً!`
      
      const reply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        actions: [
          {
            label: '🟢 تحدث معنا مباشرة وأرسل استفسارك عبر واتساب',
            url: generateWhatsAppLink(`بخصوص استفساري: ${userText}`)
          }
        ]
      }

      setMessages((prev) => [...prev, reply])
      setIsTyping(false)
    }, 1000)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed bottom-6 left-6 md:left-8 z-50 flex flex-col items-start" dir="rtl">
      {/* Chat Window Container */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-4 transition-all duration-300 ease-out origin-bottom-left animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-display font-black text-gold text-lg">
                  أ
                </div>
                {/* Active Status Indicator */}
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900" />
              </div>
              <div className="text-right">
                <span className="font-display font-bold text-sm text-white block">مساعد أركان الذكي</span>
                <span className="font-body text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                  نشط الآن لمساعدتكم
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
              aria-label="إغلاق نافذة المساعدة"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Stats bar inside chat */}
          <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 flex justify-between items-center text-[11px] text-slate-500 font-body">
            <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-gold" /> ردود عقود وفيرة</span>
            <span className="flex items-center gap-1"><Clock size={12} className="text-gold" /> تواصل فوري ٢٤ ساعة</span>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm font-body leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gold text-white rounded-tl-none text-right'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tr-none text-right'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {msg.text}

                  {/* Attachment Actions inside bot bubbles */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col gap-2">
                      {msg.actions.map((act, idx) => (
                        act.url ? (
                          <a
                            key={idx}
                            href={act.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-95 text-white font-medium text-xs py-2.5 px-3 rounded-lg text-center transition-all shadow-sm"
                          >
                            <Phone size={13} fill="currentColor" />
                            <span>{act.label}</span>
                          </a>
                        ) : act.anchorId ? (
                          <button
                            key={idx}
                            onClick={() => scrollToSection(act.anchorId!)}
                            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-medium text-xs py-2.5 px-3 rounded-lg text-center transition-all cursor-pointer shadow-sm active:scale-95"
                          >
                            <MessageSquare size={13} />
                            <span>{act.label}</span>
                          </button>
                        ) : null
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 font-body">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-end">
                <div className="bg-white text-slate-500 border border-slate-200 p-3.5 rounded-2xl rounded-tr-none text-xs font-body shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span>يقوم جاري صياغة الاستجابة...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Menu Options (Fixed at bottom above input as scroll shortcuts) */}
          <div className="px-4 py-2 border-t border-slate-100 bg-white">
            <span className="text-[11px] text-slate-400 block mb-1.5 font-body">استفسارات شائعة لسرعة الرد:</span>
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 snap-x scrollbar-thin scrollbar-thumb-slate-200">
              {menuOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt.id, opt.label)}
                  className="flex-shrink-0 snap-right bg-slate-50 hover:bg-gold/10 hover:text-gold border border-slate-200 hover:border-gold/30 text-slate-600 px-3 py-1.5 rounded-full text-xs font-body transition-all duration-200 cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اكتب استفسارك المخصص هنا..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 font-body text-sm text-slate-800 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all text-right"
              dir="rtl"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-xl bg-gold text-white flex items-center justify-center hover:bg-gold-light disabled:opacity-50 disabled:hover:bg-gold transition-colors flex-shrink-0 cursor-pointer"
              aria-label="إرسال رسالة"
            >
              <Send size={16} className="rotate-180" />
            </button>
          </form>
        </div>
      )}

      {/* Flashing WhatsApp & Support Entry Button */}
      <div className="relative group">
        {/* Pulsing Backlight Ring for immediate visual luxury and professional call to action */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold/50 to-gold opacity-75 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 flex items-center gap-3.5 px-5 py-4 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer text-white border border-white/15 ${
            isOpen
              ? 'bg-slate-900 hover:bg-slate-800'
              : 'bg-gradient-to-l from-gold to-gold-light hover:from-gold-light hover:to-gold'
          }`}
          aria-label="دردش معنا على واتساب للاستفسارات والعقود"
        >
          {isOpen ? (
            <>
              <X size={22} className="animate-spin-once" />
              <span className="font-display font-bold text-sm hidden sm:inline">إغلاق المساعد</span>
            </>
          ) : (
            <>
              {/* Double Icon Badge */}
              <div className="relative">
                <MessageCircle size={24} className="animate-bounce" style={{ animationDuration: '3s' }} />
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-gold border border-white rounded-full flex items-center justify-center text-[8px] font-bold text-white leading-none">
                  1
                </span>
              </div>
              <div className="text-right flex flex-col">
                <span className="font-display font-bold text-xs leading-none text-white">استفسار وعقد مباشر؟</span>
                <span className="font-body text-xs font-semibold mt-1">تواصل مع خدمة العملاء</span>
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
