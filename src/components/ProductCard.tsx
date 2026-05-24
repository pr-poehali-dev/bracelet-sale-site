import { useState } from 'react';
import { Product } from '../data/products';
import { CartItem } from '../App';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  product: Product;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Icon
          key={i}
          name="Star"
          size={14}
          className={i <= rating ? 'fill-[#FFD600] text-[#FFD600]' : 'text-gray-300 fill-gray-200'}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const [showReviews, setShowReviews] = useState(false);
  const [added, setAdded] = useState(false);

  const avgRating = Math.round(product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.color,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden card-hover shadow-sm border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div
          className="absolute top-3 left-3 w-4 h-4 rounded-full border-2 border-white shadow"
          style={{ background: product.color }}
        />
        {product.tag && (
          <span className="tag-chip absolute top-3 right-3">{product.tag}</span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-[#111]">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 font-body leading-snug line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <button
          onClick={() => setShowReviews(!showReviews)}
          className="flex items-center gap-2 mt-3 group"
        >
          <Stars rating={avgRating} />
          <span className="text-xs text-gray-400 font-body group-hover:text-[#FF1564] transition-colors">
            {product.reviews.length} отзыв{product.reviews.length > 1 ? 'а' : ''}
          </span>
          <Icon
            name={showReviews ? 'ChevronUp' : 'ChevronDown'}
            size={14}
            className="text-gray-400 group-hover:text-[#FF1564] transition-colors"
          />
        </button>

        {/* Reviews */}
        {showReviews && (
          <div className="mt-3 space-y-3 border-t border-gray-100 pt-3 animate-fade-in-up">
            {product.reviews.map(r => (
              <div key={r.id} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body font-semibold text-xs text-[#111]">{r.author}</span>
                  <Stars rating={r.rating} />
                </div>
                <p className="text-xs text-gray-600 font-body leading-relaxed">{r.text}</p>
                <p className="text-xs text-gray-400 mt-1">{r.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* Price + Buy */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="font-display text-xl font-bold text-[#111]">
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                {product.oldPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`btn-primary px-4 py-2 rounded-full text-sm flex items-center gap-1.5 ${added ? 'bg-green-500' : ''}`}
          >
            <Icon name={added ? 'Check' : 'ShoppingBag'} size={15} />
            <span>{added ? 'Добавлен!' : 'В корзину'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
