import Icon from '@/components/ui/icon';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-32 flex items-center justify-center text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #111 0%, #1a0010 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #FF1564 0%, transparent 50%), radial-gradient(circle at 70% 50%, #00B8D9 0%, transparent 50%)' }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="tag-chip">О нас</span>
          <h1 className="font-display text-6xl font-bold text-white uppercase mt-4 mb-6">
            История<br /><span style={{ color: '#FF1564' }}>бренда</span>
          </h1>
          <p className="text-gray-300 font-body text-lg leading-relaxed">
            Мы создаём украшения для людей, которые не боятся быть собой. Каждый браслет — это маленькая история о смелости, стиле и свободе.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="w-full aspect-square rounded-3xl overflow-hidden"
              style={{ boxShadow: '8px 8px 0 #FF1564' }}
            >
              <img
                src="https://cdn.poehali.dev/projects/7c62b135-c02e-40db-8c8e-122bf400b652/files/0719274b-3340-45d7-acd1-b37af9feb698.jpg"
                alt="О бренде"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl font-bold uppercase text-[#111] mb-6">
              Как всё начиналось
            </h2>
            <div className="space-y-4 font-body text-gray-600 leading-relaxed">
              <p>
                Бренд БРАСЛЕТ родился в 2020 году из маленькой мастерской в Москве. Наша основательница Анна начала создавать украшения для себя — яркие, непохожие на всё, что можно было найти в магазинах.
              </p>
              <p>
                Подруги попросили сделать такие же. Потом — их подруги. Уже через год мы отправляли браслеты по всей России.
              </p>
              <p>
                Сегодня в нашей коллекции более 50 моделей. Каждый браслет создаётся вручную из натуральных материалов — с любовью и вниманием к деталям.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F0F0F0] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-4xl font-bold uppercase text-center text-[#111] mb-12">
            Наши ценности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: 'Heart', color: '#FF1564', title: 'Создаём с любовью', desc: 'Каждый браслет — ручная работа. Мы не гонимся за массовостью, нам важно качество.' },
              { icon: 'Leaf', color: '#00B8D9', title: 'Экологично', desc: 'Только натуральные материалы. Упаковка из переработанной бумаги.' },
              { icon: 'Zap', color: '#FFD600', title: 'Смело и ярко', desc: 'Мы верим, что украшение должно говорить о владельце — без слов.' },
              { icon: 'Users', color: '#9B59B6', title: 'Для всех', desc: 'Наши браслеты носят люди разного возраста, стиля и характера.' },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 flex gap-4 items-start">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: v.color + '20' }}
                >
                  <Icon name={v.icon} size={24} style={{ color: v.color }} fallback="Star" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase text-[#111] mb-1">{v.title}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-4xl font-bold uppercase text-[#111] mb-4">Команда</h2>
        <p className="text-gray-500 font-body mb-12">Небольшая, но очень страстная команда</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Анна', role: 'Основательница & дизайнер', emoji: '👩‍🎨' },
            { name: 'Марина', role: 'Мастер по украшениям', emoji: '💎' },
            { name: 'Катя', role: 'Фотограф & контент', emoji: '📸' },
          ].map(m => (
            <div key={m.name} className="text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl mb-4"
                style={{ background: 'linear-gradient(135deg, #FF1564, #FFD600)' }}
              >
                {m.emoji}
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#111]">{m.name}</h3>
              <p className="font-body text-gray-500 text-sm mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-gray-500 py-8 text-center font-body text-sm">
        © 2026 БРАСЛЕТ — украшения с характером
      </footer>
    </div>
  );
}
