SELECT date, category, title, description, media, price, item_rating FROM store_items i
JOIN user_info u ON u.user_id = i.user_id
WHERE u.user_id = $1;


