SELECT s.category, s.title, s.description, s.price, s.item_rating, s.media, s.post_id FROM store_product s
WHERE category ILIKE $1;