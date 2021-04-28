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

CREATE TABLE user_posts (
post_id SERIAL PRIMARY KEY,
user_id INT REFERENCES user_info(user_id),
category VARCHAR(50),
date DATE,
title VARCHAR(255),
description VARCHAR(255),
media TEXT
);

CREATE TABLE store_item (
post_id SERIAL PRIMARY KEY,
user_id INT REFERENCES user_info(user_id),
date DATE,
category VARCHAR(50),
title VARCHAR(255),
description VARCHAR(255),
media TEXT,
price INT,
item_rating INT
);

