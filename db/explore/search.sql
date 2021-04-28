SELECT * FROM users
WHERE first_name || ' ' || last_name ILIKE $1,
-- [`%${name}%`]