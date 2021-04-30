SELECT p.category, p.title, p.description, p.post_id FROM user_posts p
WHERE category || ' ' || title || ' ' || description ILIKE $1;