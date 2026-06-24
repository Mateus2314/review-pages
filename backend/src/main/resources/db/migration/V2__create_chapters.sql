CREATE TABLE chapters (
    id BIGSERIAL PRIMARY KEY,
    reading_id BIGINT NOT NULL REFERENCES readings(id),
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    chapter_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(reading_id, chapter_order)
);
