CREATE TABLE t_p86842677_bracelet_sale_site.sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p86842677_bracelet_sale_site.users(id),
    session_id VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_session_id ON t_p86842677_bracelet_sale_site.sessions(session_id);
CREATE INDEX idx_sessions_user_id ON t_p86842677_bracelet_sale_site.sessions(user_id);
