UPDATE user_data SET user_id = $1, number_of_posts = $2, number_posts_others_saved = $3, profile_visits = $4, revenue = $5, average_rating = $6, store_visits = $7
WHERE user_id = $8
RETURNING *;
