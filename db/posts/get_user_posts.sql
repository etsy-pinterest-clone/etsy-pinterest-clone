SELECT category, date, title, description, media FROM user_posts p
JOIN user_info u ON u.user_id = p.user_id
WHERE u.user_id = $1;


