"""
Авторизация пользователей: регистрация, вход, профиль, выход.
"""
import json
import os
import hashlib
import secrets
import re
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p86842677_bracelet_sale_site')
CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    h = hashlib.sha256((salt + password).encode()).hexdigest()
    return f"{salt}:{h}"

def verify_password(password: str, stored: str) -> bool:
    try:
        salt, h = stored.split(':')
        return hashlib.sha256((salt + password).encode()).hexdigest() == h
    except Exception:
        return False

def is_phone(value: str) -> bool:
    return bool(re.match(r'^\+?[0-9]{10,15}$', value.replace(' ', '').replace('-', '')))

def normalize_phone(phone: str) -> str:
    digits = re.sub(r'\D', '', phone)
    if digits.startswith('8') and len(digits) == 11:
        digits = '7' + digits[1:]
    return '+' + digits

def resp(status: int, body: dict) -> dict:
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'}, 'body': json.dumps(body, ensure_ascii=False)}

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            pass

    session_id = event.get('headers', {}).get('x-session-id') or event.get('headers', {}).get('X-Session-Id', '')

    if method == 'POST' and (path.endswith('/register') or action == 'register'):
        return register(body)

    if method == 'POST' and (path.endswith('/login') or action == 'login'):
        return login(body)

    if method == 'GET' and (path.endswith('/profile') or action == 'profile'):
        return get_profile(session_id)

    if method == 'PUT' and (path.endswith('/profile') or action == 'update_profile'):
        return update_profile(session_id, body)

    if method == 'POST' and (path.endswith('/logout') or action == 'logout'):
        return logout(session_id)

    return resp(404, {'error': 'Not found'})


def register(body: dict) -> dict:
    username = (body.get('username') or '').strip()
    login_value = (body.get('login') or '').strip()
    password = body.get('password', '')

    if not username or len(username) < 3:
        return resp(400, {'error': 'Имя пользователя должно быть не менее 3 символов'})
    if not re.match(r'^[a-zA-Z0-9_а-яА-ЯёЁ]+$', username):
        return resp(400, {'error': 'Имя пользователя может содержать только буквы, цифры и _'})
    if not login_value:
        return resp(400, {'error': 'Укажите email или номер телефона'})
    if not password or len(password) < 6:
        return resp(400, {'error': 'Пароль должен быть не менее 6 символов'})

    email, phone = None, None
    if is_phone(login_value):
        phone = normalize_phone(login_value)
    else:
        if '@' not in login_value:
            return resp(400, {'error': 'Введите корректный email или номер телефона'})
        email = login_value.lower()

    pw_hash = hash_password(password)
    session_id = secrets.token_hex(32)

    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            f"INSERT INTO {SCHEMA}.users (username, email, phone, password_hash) VALUES (%s, %s, %s, %s) RETURNING id, username, email, phone, created_at",
            (username, email, phone, pw_hash)
        )
        row = cur.fetchone()
        cur.execute(
            f"INSERT INTO {SCHEMA}.sessions (user_id, session_id) VALUES (%s, %s)",
            (row[0], session_id)
        )
        conn.commit()
        return resp(200, {
            'session_id': session_id,
            'user': {'id': row[0], 'username': row[1], 'email': row[2], 'phone': row[3]}
        })
    except psycopg2.errors.UniqueViolation as e:
        conn.rollback()
        msg = str(e)
        if 'username' in msg:
            return resp(409, {'error': 'Это имя пользователя уже занято'})
        if 'email' in msg:
            return resp(409, {'error': 'Этот email уже зарегистрирован'})
        if 'phone' in msg:
            return resp(409, {'error': 'Этот номер телефона уже зарегистрирован'})
        return resp(409, {'error': 'Пользователь уже существует'})
    finally:
        cur.close()
        conn.close()


def login(body: dict) -> dict:
    login_value = (body.get('login') or '').strip()
    password = body.get('password', '')

    if not login_value or not password:
        return resp(400, {'error': 'Введите логин и пароль'})

    conn = get_conn()
    cur = conn.cursor()
    try:
        if is_phone(login_value):
            phone = normalize_phone(login_value)
            cur.execute(f"SELECT id, username, email, phone, password_hash FROM {SCHEMA}.users WHERE phone = %s", (phone,))
        else:
            cur.execute(f"SELECT id, username, email, phone, password_hash FROM {SCHEMA}.users WHERE email = %s", (login_value.lower(),))

        row = cur.fetchone()
        if not row or not verify_password(password, row[4]):
            return resp(401, {'error': 'Неверный логин или пароль'})

        session_id = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {SCHEMA}.sessions (user_id, session_id) VALUES (%s, %s)", (row[0], session_id))
        conn.commit()
        return resp(200, {
            'session_id': session_id,
            'user': {'id': row[0], 'username': row[1], 'email': row[2], 'phone': row[3]}
        })
    finally:
        cur.close()
        conn.close()


def get_profile(session_id: str) -> dict:
    if not session_id:
        return resp(401, {'error': 'Не авторизован'})
    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            f"SELECT u.id, u.username, u.email, u.phone, u.created_at FROM {SCHEMA}.users u JOIN {SCHEMA}.sessions s ON s.user_id = u.id WHERE s.session_id = %s",
            (session_id,)
        )
        row = cur.fetchone()
        if not row:
            return resp(401, {'error': 'Сессия недействительна'})
        return resp(200, {'user': {
            'id': row[0], 'username': row[1], 'email': row[2],
            'phone': row[3], 'created_at': str(row[4])
        }})
    finally:
        cur.close()
        conn.close()


def update_profile(session_id: str, body: dict) -> dict:
    if not session_id:
        return resp(401, {'error': 'Не авторизован'})

    username = (body.get('username') or '').strip()
    if not username or len(username) < 3:
        return resp(400, {'error': 'Имя пользователя должно быть не менее 3 символов'})
    if not re.match(r'^[a-zA-Z0-9_а-яА-ЯёЁ]+$', username):
        return resp(400, {'error': 'Недопустимые символы в имени'})

    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute(f"SELECT user_id FROM {SCHEMA}.sessions WHERE session_id = %s", (session_id,))
        row = cur.fetchone()
        if not row:
            return resp(401, {'error': 'Сессия недействительна'})
        user_id = row[0]
        cur.execute(
            f"UPDATE {SCHEMA}.users SET username = %s, updated_at = NOW() WHERE id = %s RETURNING id, username, email, phone",
            (username, user_id)
        )
        u = cur.fetchone()
        conn.commit()
        return resp(200, {'user': {'id': u[0], 'username': u[1], 'email': u[2], 'phone': u[3]}})
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        return resp(409, {'error': 'Это имя пользователя уже занято'})
    finally:
        cur.close()
        conn.close()


def logout(session_id: str) -> dict:
    if not session_id:
        return resp(400, {'error': 'Нет сессии'})
    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute(f"DELETE FROM {SCHEMA}.sessions WHERE session_id = %s", (session_id,))
        conn.commit()
        return resp(200, {'ok': True})
    finally:
        cur.close()
        conn.close()