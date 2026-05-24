import { useState } from 'react';
import { register, login } from '@/lib/api';
import Icon from '@/components/ui/icon';
import { Page } from '../App';

interface AuthPageProps {
  setPage: (p: Page) => void;
  onAuth: (user: { id: number; username: string; email: string | null; phone: string | null }) => void;
}

export default function AuthPage({ setPage, onAuth }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let data;
      if (mode === 'register') {
        data = await register(username, loginValue, password);
      } else {
        data = await login(loginValue, password);
      }
      if (data.error) {
        setError(data.error);
      } else {
        onAuth(data.user);
        setPage('profile');
      }
    } catch {
      setError('Ошибка соединения. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(135deg, #111 0%, #1a0010 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={() => setPage('home')} className="font-display text-3xl font-bold tracking-widest uppercase" style={{ color: '#FF1564' }}>
            БРАСЛЕТ
          </button>
          <p className="text-gray-400 mt-2 font-body text-sm">
            {mode === 'login' ? 'Войдите в аккаунт' : 'Создайте аккаунт'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 rounded-2xl p-1 mb-6">
          {(['login', 'register'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl font-display font-semibold text-sm uppercase tracking-wider transition-all ${
                mode === m
                  ? 'bg-[#FF1564] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {m === 'login' ? 'Вход' : 'Регистрация'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-gray-400 text-xs font-body mb-1.5 uppercase tracking-wider">
                Имя пользователя
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Icon name="AtSign" size={16} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="например: cool_girl"
                  required
                  minLength={3}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 font-body focus:outline-none focus:border-[#FF1564] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-400 text-xs font-body mb-1.5 uppercase tracking-wider">
              Email или телефон
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon name="Mail" size={16} />
              </span>
              <input
                type="text"
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                placeholder="mail@example.ru или +79001234567"
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 font-body focus:outline-none focus:border-[#FF1564] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-body mb-1.5 uppercase tracking-wider">
              Пароль
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Icon name="Lock" size={16} />
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'Минимум 6 символов' : 'Ваш пароль'}
                required
                minLength={mode === 'register' ? 6 : 1}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-500 font-body focus:outline-none focus:border-[#FF1564] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <Icon name={showPass ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-xl px-4 py-3 flex items-center gap-2">
              <Icon name="AlertCircle" size={16} className="text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm font-body">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 rounded-xl text-base flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <><Icon name="Loader2" size={18} className="animate-spin" /> Подождите...</>
            ) : (
              <>{mode === 'login' ? 'Войти' : 'Создать аккаунт'}</>
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm font-body mt-6">
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-[#FF1564] hover:underline font-semibold"
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
}
