import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';

export type Page = 'home' | 'catalog' | 'about' | 'cart';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
}

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Toaster />
      <Navbar page={page} setPage={setPage} cartCount={cartCount} />
      {page === 'home' && <HomePage setPage={setPage} addToCart={addToCart} />}
      {page === 'catalog' && <CatalogPage addToCart={addToCart} />}
      {page === 'about' && <AboutPage />}
      {page === 'cart' && <CartPage cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} setPage={setPage} />}
    </div>
  );
}
