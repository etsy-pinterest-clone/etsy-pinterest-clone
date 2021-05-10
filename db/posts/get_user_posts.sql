SELECT p.post_id, p.user_id, p.category, p.date, p.title, p.description, p.media, p.username FROM user_posts p
JOIN user_info u ON u.user_id = p.user_id
WHERE u.user_id = $1;
