import { CartItem, Page } from '../App';
import Icon from '@/components/ui/icon';

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  setPage: (p: Page) => void;
}

export default function CartPage({ cart, removeFromCart, updateQty, setPage }: CartPageProps) {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="text-8xl mb-6">🛍️</div>
        <h2 className="font-display text-4xl font-bold uppercase text-[#111] mb-4">
          Корзина пуста
        </h2>
        <p className="text-gray-500 font-body mb-8">Добавьте браслеты из каталога, чтобы оформить заказ</p>
        <button
          onClick={() => setPage('catalog')}
          className="btn-primary px-8 py-4 rounded-full text-base flex items-center gap-2 mx-auto"
        >
          Перейти в каталог
          <Icon name="ArrowRight" size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="tag-chip">Корзина</span>
        <h1 className="font-display text-5xl font-bold uppercase mt-3 text-[#111]">
          Мой заказ
        </h1>
        <p className="text-gray-500 font-body mt-1">
          {cart.reduce((s, i) => s + i.quantity, 0)} товар(а) в корзине
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm border border-gray-100"
            >
              {/* Color dot + image */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-xl overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                  style={{ background: item.color }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-bold uppercase text-[#111] leading-tight">
                  {item.name}
                </h3>
                <p className="font-body text-[#FF1564] font-semibold mt-0.5">
                  {item.price.toLocaleString('ru-RU')} ₽
                </p>
              </div>

              {/* Qty */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors font-bold text-[#111]"
                >
                  −
                </button>
                <span className="font-display font-bold text-[#111] w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors font-bold text-[#111]"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right flex-shrink-0">
                <div className="font-display font-bold text-[#111]">
                  {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-[#FF1564] transition-colors mt-1"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#111] rounded-2xl p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold uppercase text-white mb-6">
              Итого
            </h2>

            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm font-body">
                  <span className="text-gray-400">{item.name} × {item.quantity}</span>
                  <span className="text-white">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="font-display text-white font-semibold uppercase tracking-wide">Итого</span>
                <span className="font-display text-2xl font-bold" style={{ color: '#FFD600' }}>
                  {total.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <p className="text-gray-500 text-xs font-body mt-1">Доставка рассчитывается при оформлении</p>
            </div>

            <button className="btn-primary w-full py-4 rounded-full text-base text-center">
              Оформить заказ
            </button>

            <button
              onClick={() => setPage('catalog')}
              className="w-full mt-3 py-3 text-center text-gray-400 font-body text-sm hover:text-white transition-colors"
            >
              ← Продолжить покупки
            </button>

            {/* Badges */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
              {[
                { icon: 'Shield', text: 'Безопасная оплата' },
                { icon: 'RotateCcw', text: 'Возврат 30 дней' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-1.5 text-gray-500 text-xs font-body">
                  <Icon name={b.icon} size={13} fallback="Check" />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
