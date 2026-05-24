import { Page, CartItem } from '../App';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  setPage: (p: Page) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

const marqueeItems = ['БРАСЛЕТЫ', 'УКРАШЕНИЯ', 'СТИЛЬ', 'НОВИНКИ', 'КОЛЛЕКЦИИ', 'ТРЕНДЫ'];

export default function HomePage({ setPage, addToCart }: HomePageProps) {
  const hits = products.filter(p => p.tag === 'Хит' || p.tag === 'Топ' || p.tag === 'Новинка').slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1a0010 60%, #0a001a 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FF1564, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #00B8D9, transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-24">
          {/* Text */}
          <div className="animate-fade-in-up">
            <div className="tag-chip inline-block mb-6">Новая коллекция 2026</div>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-none uppercase">
              НОСИ<br />
              <span style={{ color: '#FF1564' }}>СМЕЛО.</span>
            </h1>
            <p className="text-gray-300 mt-6 text-lg font-body leading-relaxed max-w-md">
              Браслеты, которые говорят о тебе громче слов. Яркие цвета, смелые формы — украшения для тех, кто не боится быть собой.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={() => setPage('catalog')}
                className="btn-primary px-8 py-4 rounded-full text-base flex items-center gap-2"
              >
                Смотреть каталог
                <Icon name="ArrowRight" size={18} />
              </button>
              <button
                onClick={() => setPage('about')}
                className="btn-outline-dark px-8 py-4 rounded-full text-base"
                style={{ borderColor: 'white', color: 'white' }}
              >
                О бренде
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[
                { num: '2 000+', label: 'довольных клиентов' },
                { num: '4.9', label: 'средний рейтинг' },
                { num: '50+', label: 'моделей' },
              ].map(s => (
                <div key={s.num}>
                  <div className="font-display text-2xl font-bold" style={{ color: '#FFD600' }}>{s.num}</div>
                  <div className="text-gray-400 text-xs font-body mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative flex justify-center">
            <div
              className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4"
              style={{ borderColor: '#FF1564', boxShadow: '0 0 60px rgba(255,21,100,0.4)' }}
            >
              <img
                src="https://cdn.poehali.dev/projects/7c62b135-c02e-40db-8c8e-122bf400b652/files/0719274b-3340-45d7-acd1-b37af9feb698.jpg"
                alt="Браслеты"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating chips */}
            <div className="absolute top-4 -left-4 bg-white rounded-2xl px-4 py-2 shadow-xl font-display text-sm font-bold text-[#111]">
              ✨ 50+ моделей
            </div>
            <div className="absolute bottom-8 -right-4 bg-[#FF1564] text-white rounded-2xl px-4 py-2 shadow-xl font-display text-sm font-bold">
              🚀 Доставка 2 дня
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#FF1564] py-3 overflow-hidden">
        <div className="marquee-track whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-display font-bold text-white text-sm tracking-widest uppercase mx-8">
              {item} ✦
            </span>
          ))}
        </div>
      </div>

      {/* Hit products */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="tag-chip">Bestsellers</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 text-[#111]">
              Хиты продаж
            </h2>
          </div>
          <button
            onClick={() => setPage('catalog')}
            className="btn-outline-dark px-6 py-3 rounded-full text-sm flex items-center gap-2"
          >
            Весь каталог
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hits.map(p => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-[#111] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-4xl font-bold uppercase text-center mb-12">
            Почему <span style={{ color: '#FF1564' }}>БРАСЛЕТ?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'Gem', title: 'Только натуральные материалы', desc: 'Натуральные камни, жемчуг, кожа и металл — никакого пластика.' },
              { icon: 'Truck', title: 'Доставка за 2 дня', desc: 'Отправляем по всей России. Быстро и с заботой об упаковке.' },
              { icon: 'RotateCcw', title: 'Возврат 30 дней', desc: 'Не подошло? Вернём деньги без вопросов в течение 30 дней.' },
            ].map(f => (
              <div key={f.title} className="bg-white/5 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(255,21,100,0.2)' }}
                >
                  <Icon name={f.icon} size={28} className="text-[#FF1564]" fallback="Star" />
                </div>
                <h3 className="font-display text-lg font-semibold uppercase mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm font-body leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFD600, #FF6B35)' }}
      >
        <h2 className="font-display text-5xl md:text-6xl font-bold uppercase text-[#111] mb-4">
          Готова блистать?
        </h2>
        <p className="text-[#111]/70 font-body mb-8 text-lg">
          Найди свой браслет в каталоге прямо сейчас
        </p>
        <button
          onClick={() => setPage('catalog')}
          className="bg-[#111] text-white px-10 py-4 rounded-full font-display font-bold text-base tracking-widest uppercase hover:bg-[#333] transition-colors"
        >
          Открыть каталог
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-gray-500 py-8 text-center font-body text-sm">
        © 2026 БРАСЛЕТ — украшения с характером
      </footer>
    </div>
  );
}
