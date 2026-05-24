import Icon from '@/components/ui/icon';

const MAX_PHONE = '+79372093865';
const MAX_LINK = `https://max.ru/im?phone=${MAX_PHONE.replace(/\D/g, '')}`;

const faqs = [
  { q: 'Сколько идёт доставка?', a: 'По России — 2–5 рабочих дней. Москва и СПб — 1–2 дня.' },
  { q: 'Можно ли вернуть браслет?', a: 'Да, в течение 30 дней без вопросов. Напишите нам — оформим возврат.' },
  { q: 'Из каких материалов браслеты?', a: 'Натуральные камни, жемчуг, кожа, металл. Без пластика и синтетики.' },
  { q: 'Как выбрать размер?', a: 'Большинство браслетов универсальные. Напишите нам — подберём под ваше запястье.' },
];

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-28 flex items-center justify-center text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #111 0%, #1a0010 100%)' }}
      >
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #FF1564 0%, transparent 55%), radial-gradient(circle at 75% 50%, #FFD600 0%, transparent 55%)' }} />
        <div className="relative max-w-2xl mx-auto px-4">
          <span className="tag-chip">Поддержка</span>
          <h1 className="font-display text-6xl font-bold text-white uppercase mt-4 mb-4 leading-none">
            Связаться<br /><span style={{ color: '#FF1564' }}>с продавцом</span>
          </h1>
          <p className="text-gray-300 font-body text-lg leading-relaxed">
            Есть вопросы по заказу, размеру или доставке? Напишите нам в MAX — ответим быстро!
          </p>
        </div>
      </section>

      {/* Main CTA */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        {/* MAX Card */}
        <div
          className="rounded-3xl p-10 text-center mb-12 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #111 0%, #1a0020 100%)', border: '2px solid rgba(255,21,100,0.3)' }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #FF1564 0%, transparent 60%)' }} />
          <div className="relative">
            {/* MAX logo area */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-display font-black"
              style={{ background: 'linear-gradient(135deg, #FF1564, #FF6B35)', color: 'white', fontSize: '1.6rem' }}
            >
              MAX
            </div>

            <h2 className="font-display text-3xl font-bold uppercase text-white mb-3">
              Написать в MAX
            </h2>
            <p className="text-gray-400 font-body mb-2">
              Мессенджер MAX от VK — быстро и удобно
            </p>
            <p className="text-[#FFD600] font-display font-semibold text-lg mb-8 tracking-wider">
              {MAX_PHONE}
            </p>

            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 btn-primary px-10 py-4 rounded-full text-lg"
            >
              <Icon name="MessageCircle" size={22} />
              Открыть MAX
            </a>

            <p className="text-gray-600 text-xs font-body mt-6">
              Нажав кнопку, вы перейдёте в приложение MAX
            </p>
          </div>
        </div>

        {/* Working hours */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: 'Clock', title: 'Время ответа', desc: 'До 30 минут в рабочее время' },
            { icon: 'Calendar', title: 'Мы работаем', desc: 'Пн–Вс, 9:00–21:00 МСК' },
            { icon: 'Smile', title: 'Всегда рады', desc: 'Любые вопросы о заказах' },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(255,21,100,0.1)' }}
              >
                <Icon name={item.icon} size={22} className="text-[#FF1564]" fallback="Star" />
              </div>
              <p className="font-display font-semibold uppercase text-sm text-[#111] mb-1">{item.title}</p>
              <p className="font-body text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-[#111] mb-6">
            Частые вопросы
          </h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-display font-bold text-sm"
                    style={{ background: '#FF1564', color: 'white' }}
                  >
                    ?
                  </div>
                  <div>
                    <p className="font-display font-semibold uppercase text-sm text-[#111] mb-1">{item.q}</p>
                    <p className="font-body text-gray-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 rounded-3xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #FFD600, #FF6B35)' }}
        >
          <p className="font-display text-2xl font-bold uppercase text-[#111] mb-2">
            Не нашли ответ?
          </p>
          <p className="text-[#111]/70 font-body mb-6">
            Напишите нам — разберёмся вместе
          </p>
          <a
            href={MAX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#111] text-white px-8 py-3 rounded-full font-display font-bold uppercase tracking-wider text-sm hover:bg-[#333] transition-colors"
          >
            <Icon name="MessageCircle" size={18} />
            Написать в MAX
          </a>
        </div>
      </section>

      <footer className="bg-[#111] text-gray-500 py-8 text-center font-body text-sm">
        © 2026 БРАСЛЕТ — украшения с характером
      </footer>
    </div>
  );
}
