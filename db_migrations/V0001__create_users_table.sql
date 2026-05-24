CREATE TABLE t_p86842677_bracelet_sale_site.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT users_email_or_phone CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE INDEX idx_users_email ON t_p86842677_bracelet_sale_site.users(email);
CREATE INDEX idx_users_phone ON t_p86842677_bracelet_sale_site.users(phone);
CREATE INDEX idx_users_username ON t_p86842677_bracelet_sale_site.users(username);
