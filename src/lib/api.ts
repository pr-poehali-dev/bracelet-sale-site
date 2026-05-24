const AUTH_URL = 'https://functions.poehali.dev/c3027278-86d9-49ed-8e09-f63cf3184324';

function getSession(): string {
  return localStorage.getItem('session_id') || '';
}

function saveSession(id: string) {
  localStorage.setItem('session_id', id);
}

function clearSession() {
  localStorage.removeItem('session_id');
  localStorage.removeItem('user');
}

async function authFetch(action: string, method: string, body?: object, session?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const sid = session ?? getSession();
  if (sid) headers['X-Session-Id'] = sid;

  const res = await fetch(`${AUTH_URL}/?action=${action}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export async function register(username: string, login: string, password: string) {
  const data = await authFetch('register', 'POST', { username, login, password });
  if (data.session_id) {
    saveSession(data.session_id);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

export async function login(loginValue: string, password: string) {
  const data = await authFetch('login', 'POST', { login: loginValue, password });
  if (data.session_id) {
    saveSession(data.session_id);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

export async function getProfile() {
  return authFetch('profile', 'GET');
}

export async function updateProfile(username: string) {
  const data = await authFetch('update_profile', 'PUT', { username });
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

export async function logout() {
  await authFetch('logout', 'POST');
  clearSession();
}

export function getStoredUser() {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isLoggedIn() {
  return !!getSession();
}
