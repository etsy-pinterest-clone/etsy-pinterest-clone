SELECT u.first_name, u.last_name, u.username, u.user_id FROM user_info u
WHERE first_name || ' ' || last_name ILIKE $1;
