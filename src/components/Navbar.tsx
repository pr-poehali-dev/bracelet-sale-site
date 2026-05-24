import { Page, User } from '../App';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  cartCount: number;
  user: User | null;
}

export default function Navbar({ page, setPage, cartCount, user }: NavbarProps) {
  const links: { label: string; id: Page }[] = [
    { label: 'Главная', id: 'home' },
    { label: 'Каталог', id: 'catalog' },
    { label: 'О бренде', id: 'about' },
    { label: 'Контакты', id: 'contact' },
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

        <div className="flex items-center gap-2">
          {/* User / Auth button */}
          {user ? (
            <button
              onClick={() => setPage('profile')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-display font-semibold uppercase tracking-wider transition-colors ${
                page === 'profile' ? 'bg-white/20 text-[#FFD600]' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #FF1564, #FFD600)', color: '#111' }}
              >
                {user.username.slice(0, 2).toUpperCase()}
              </div>
              <span className="hidden sm:inline">{user.username}</span>
            </button>
          ) : (
            <button
              onClick={() => setPage('auth')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-display font-semibold uppercase tracking-wider transition-colors ${
                page === 'auth' ? 'text-[#FFD600]' : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Войти</span>
            </button>
          )}

          {/* Cart */}
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
        <button
          onClick={() => setPage(user ? 'profile' : 'auth')}
          className={`flex-1 py-2 font-display text-xs font-semibold tracking-wider uppercase transition-colors ${
            page === 'auth' || page === 'profile' ? 'text-[#FFD600]' : 'text-white/60'
          }`}
        >
          {user ? user.username.slice(0, 8) : 'Войти'}
        </button>
      </div>
    </header>
  );
}