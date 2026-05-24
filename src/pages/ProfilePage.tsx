import { useState } from 'react';
import { logout, updateProfile } from '@/lib/api';
import Icon from '@/components/ui/icon';
import { Page } from '../App';

interface User {
  id: number;
  username: string;
  email: string | null;
  phone: string | null;
  created_at?: string;
}

interface ProfilePageProps {
  user: User;
  setPage: (p: Page) => void;
  onLogout: () => void;
  onUserUpdate: (u: User) => void;
}

export default function ProfilePage({ user, setPage, onLogout, onUserUpdate }: ProfilePageProps) {
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const data = await updateProfile(username);
      if (data.error) {
        setError(data.error);
      } else {
        onUserUpdate(data.user);
        setSuccess('Имя успешно обновлено!');
        setEditMode(false);
      }
    } catch {
      setError('Ошибка соединения.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onLogout();
    setPage('home');
  };

  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <span className="tag-chip">Аккаунт</span>
        <h1 className="font-display text-5xl font-bold uppercase mt-3 text-[#111]">Профиль</h1>
      </div>

      {/* Avatar + name */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-display font-bold text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #FF1564, #FFD600)' }}
          >
            {initials}
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-[#111]">
              @{user.username}
            </h2>
            <p className="text-gray-500 font-body text-sm mt-1">
              {user.email || user.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-display text-lg font-semibold uppercase text-[#111] mb-6">
          Данные аккаунта
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <Icon name="AtSign" size={20} className="text-[#FF1564] flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 font-body uppercase tracking-wider">Имя пользователя</p>
              <p className="font-body font-semibold text-[#111] mt-0.5">@{user.username}</p>
            </div>
          </div>

          {user.email && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <Icon name="Mail" size={20} className="text-[#FF1564] flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-body uppercase tracking-wider">Email</p>
                <p className="font-body font-semibold text-[#111] mt-0.5">{user.email}</p>
              </div>
            </div>
          )}

          {user.phone && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <Icon name="Phone" size={20} className="text-[#FF1564] flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-body uppercase tracking-wider">Телефон</p>
                <p className="font-body font-semibold text-[#111] mt-0.5">{user.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Edit username */}
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="mt-6 flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-wider text-[#FF1564] hover:opacity-70 transition-opacity"
          >
            <Icon name="Pencil" size={15} />
            Изменить имя пользователя
          </button>
        ) : (
          <form onSubmit={handleSave} className="mt-6 space-y-3">
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              minLength={3}
              required
              className="w-full border-2 border-gray-200 focus:border-[#FF1564] rounded-xl px-4 py-3 font-body text-[#111] outline-none transition-colors"
              placeholder="Новое имя"
            />
            {error && <p className="text-red-500 text-sm font-body">{error}</p>}
            {success && <p className="text-green-600 text-sm font-body">{success}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-6 py-2.5 rounded-full text-sm flex items-center gap-2"
              >
                {loading ? <Icon name="Loader2" size={15} className="animate-spin" /> : null}
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => { setEditMode(false); setUsername(user.username); setError(''); }}
                className="btn-outline-dark px-6 py-2.5 rounded-full text-sm"
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setPage('catalog')}
          className="bg-white rounded-2xl p-5 text-left shadow-sm border border-gray-100 hover:border-[#FF1564] transition-colors group"
        >
          <Icon name="ShoppingBag" size={24} className="text-[#FF1564] mb-3" />
          <p className="font-display font-semibold uppercase text-[#111] group-hover:text-[#FF1564] transition-colors">
            Каталог
          </p>
          <p className="text-gray-400 text-xs font-body mt-0.5">Выбрать браслеты</p>
        </button>
        <button
          onClick={() => setPage('cart')}
          className="bg-white rounded-2xl p-5 text-left shadow-sm border border-gray-100 hover:border-[#FF1564] transition-colors group"
        >
          <Icon name="Heart" size={24} className="text-[#FF1564] mb-3" />
          <p className="font-display font-semibold uppercase text-[#111] group-hover:text-[#FF1564] transition-colors">
            Корзина
          </p>
          <p className="text-gray-400 text-xs font-body mt-0.5">Мои товары</p>
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-400 transition-colors font-display font-semibold uppercase tracking-wider text-sm"
      >
        <Icon name="LogOut" size={18} />
        Выйти из аккаунта
      </button>
    </div>
  );
}
