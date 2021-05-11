const { searchCategory } = require("./exploreController");

module.exports = {
    newItem: async (req, res) => {
        console.log(req.body)
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {category, title, description, media, price, item_rating} = req.body;
        const date = new Date();
        console.log(user_id)
        if (user_id) {       
           const createNew = await db.store.create_item([user_id, date, category, title, description, media, price, item_rating])
                res.status(200).send(createNew)
        } else {
            res.sendStatus(403)
        }
    },
    getUserItems: async (req, res) => {
        const db = req.app.get('db');
        let {user_id} = req.session.user;
        if (user_id) {
             await db.store.get_user_items(user_id)
                .then(dbRes => res.status(200).send(dbRes))
        } else {
            res.sendStatus(403)
        }
    },
    openItem: async (req, res) => {
        await req.app.get('db').store.read_item(req.params.id)
        .then(item => item[0] ? res.status(200).send(item[0]) : res.status(200).send({}))
        .catch(err => console.log(err))
    },

    deleteItem: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        console.log('work', id)
        
        const updatedItemList = await db.store.delete_item(id)
        res.status(200).send(updatedItemList)
    },
    searchTitle: async (req, res) => {
        const { title } = req.body;

        const db = req.app.get('db');

        const searchResults = await db.store.search_item_title(`%${title}%`);

        res.status(200).send(searchResults);
    },
    searchCategory: async (req, res) => {
        const { category } = req.body;

        const db = req.app.get('db');

        const searchResults = await db.store.search_item_category(`%${category}%`);

        res.status(200).send(searchResults);
    },
    searchDescription: async (req, res) => {
        const { description } = req.body;

        const db = req.app.get('db');

        const searchResults = await db.store.search_item_description(`%${description}%`);

        res.status(200).send(searchResults);
    },
    searchStore: async (req, res) => {
        const { store } = req.body;

        const db = req.app.get('db');

        const searchResults = await db.store.search_store(`%${store}%`);
        console.log(searchResults);

        res.status(200).send(searchResults);
    }
}