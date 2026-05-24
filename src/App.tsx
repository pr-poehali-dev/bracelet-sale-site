import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import { getStoredUser, isLoggedIn } from '@/lib/api';

export type Page = 'home' | 'catalog' | 'about' | 'cart' | 'auth' | 'profile' | 'contact';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
}

export interface User {
  id: number;
  username: string;
  email: string | null;
  phone: string | null;
  created_at?: string;
}

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isLoggedIn()) {
      const stored = getStoredUser();
      if (stored) setUser(stored);
    }
  }, []);

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
      <Navbar page={page} setPage={setPage} cartCount={cartCount} user={user} />
      {page === 'home' && <HomePage setPage={setPage} addToCart={addToCart} />}
      {page === 'catalog' && <CatalogPage addToCart={addToCart} />}
      {page === 'about' && <AboutPage />}
      {page === 'cart' && <CartPage cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} setPage={setPage} />}
      {page === 'auth' && <AuthPage setPage={setPage} onAuth={setUser} />}
      {page === 'profile' && user && (
        <ProfilePage
          user={user}
          setPage={setPage}
          onLogout={() => setUser(null)}
          onUserUpdate={setUser}
        />
      )}
      {page === 'profile' && !user && <AuthPage setPage={setPage} onAuth={setUser} />}
      {page === 'contact' && <ContactPage />}
    </div>
  );
}