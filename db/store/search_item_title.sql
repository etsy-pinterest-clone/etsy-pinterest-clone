SELECT s.category, s.title, s.description, s.price, s.item_rating, s.post_id FROM store_item s
WHERE title ILIKE $1;