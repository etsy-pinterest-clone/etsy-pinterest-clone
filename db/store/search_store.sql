SELECT s.category, s.title, s.description, s.price, s.item_rating, s.post_id FROM store_product s
WHERE category || ' ' || title || ' ' || description || ' ' || price || ' ' || item_rating ILIKE $1;