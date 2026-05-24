import { Page } from '../App';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  cartCount: number;
}

export default function Navbar({ page, setPage, cartCount }: NavbarProps) {
  const links: { label: string; id: Page }[] = [
    { label: 'Главная', id: 'home' },
    { label: 'Каталог', id: 'catalog' },
    { label: 'О бренде', id: 'about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#111111] text-white">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <button
          onClick={() => setPage('home')}
          className="font-display text-2xl font-bold tracking-widest uppercase"
          style={{ color: '#FF1564' }}
        >
          БРАСЛЕТ
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`font-display text-sm font-semibold tracking-widest uppercase transition-colors ${
                page === l.id ? 'text-[#FFD600]' : 'text-white hover:text-[#FF1564]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setPage('cart')}
          className="relative flex items-center gap-2 btn-primary px-4 py-2 rounded-full text-sm"
        >
          <Icon name="ShoppingBag" size={18} />
          <span className="hidden sm:inline font-display tracking-wider uppercase">Корзина</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FFD600] text-[#111] text-xs font-bold rounded-full flex items-center justify-center font-body">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-white/10 flex">
        {links.map(l => (
          <button
            key={l.id}
            onClick={() => setPage(l.id)}
            className={`flex-1 py-2 font-display text-xs font-semibold tracking-wider uppercase transition-colors ${
              page === l.id ? 'text-[#FFD600]' : 'text-white/60'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </header>
  );
}
