CREATE TABLE user_info (
user_id SERIAL PRIMARY KEY,
first_name VARCHAR(255),
last_name VARCHAR(255),
birthday DATE,
phone_number INTEGER,
email VARCHAR(200),
profile_pic TEXT,
username VARCHAR(255),
password VARCHAR(255)
);

