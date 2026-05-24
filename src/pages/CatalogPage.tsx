import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { CartItem } from '../App';
import Icon from '@/components/ui/icon';

interface CatalogPageProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

const tags = ['Все', 'Хит', 'Новинка', 'Лимитед', 'Скидка', 'Топ'];

export default function CatalogPage({ addToCart }: CatalogPageProps) {
  const [activeTag, setActiveTag] = useState('Все');
  const [sort, setSort] = useState<'default' | 'asc' | 'desc'>('default');

  let filtered = activeTag === 'Все' ? products : products.filter(p => p.tag === activeTag);

  if (sort === 'asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="tag-chip">Каталог</span>
        <h1 className="font-display text-5xl font-bold uppercase mt-3 text-[#111]">
          Все браслеты
        </h1>
        <p className="text-gray-500 mt-2 font-body">{products.length} моделей в наличии</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-display font-semibold uppercase tracking-wider transition-all border-2 ${
                activeTag === t
                  ? 'bg-[#FF1564] text-white border-[#FF1564]'
                  : 'bg-white text-[#111] border-gray-200 hover:border-[#FF1564]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setSort(sort === 'asc' ? 'default' : 'asc')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase tracking-wider border-2 transition-all ${
              sort === 'asc' ? 'bg-[#111] text-white border-[#111]' : 'bg-white text-[#111] border-gray-200 hover:border-[#111]'
            }`}
          >
            <Icon name="ArrowUp" size={13} />
            Дешевле
          </button>
          <button
            onClick={() => setSort(sort === 'desc' ? 'default' : 'desc')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase tracking-wider border-2 transition-all ${
              sort === 'desc' ? 'bg-[#111] text-white border-[#111]' : 'bg-white text-[#111] border-gray-200 hover:border-[#111]'
            }`}
          >
            <Icon name="ArrowDown" size={13} />
            Дороже
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400 font-body">
          <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-40" />
          <p>Ничего не найдено</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
