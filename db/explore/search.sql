SELECT u.first_name, u.last_name FROM user_info u
WHERE first_name || ' ' || last_name ILIKE $1;
