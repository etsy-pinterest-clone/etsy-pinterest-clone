module.exports = {
    searchUser: async (req, res) => {
        const { name } = req.body;
        // make sure frontend axios call is named 'name'
        const db = req.app.get('db');

        const searchResults = await db.explore.search_user(`%${name}%`);
        // console.log(searchResults)
        // if body is used, axios request must be .put or .post
        
        res.status(200).send(searchResults);
    },
    searchPost: async (req, res) => {
        const { post } = req.body;

        const db = req.app.get('db');

        const searchResults = await db.explore.search_post(`%${post}%`);
        // console.log(searchResults);

        res.status(200).send(searchResults);
    },
    searchCategory: async (req, res) => {
        const { category } = req.body;

        const db = req.app.get('db');

        const searchResults = await db.explore.search_category(`%${category}%`);
        // console.log(searchResults);

        res.status(200).send(searchResults);
    },
    searchTitle: async (req, res) => {
        const { title } = req.body;

        const db = req.app.get('db');

        const searchResults = await db.explore.search_title(`%${title}%`);
        // console.log(searchResults);

        res.status(200).send(searchResults);
    },
    searchDescription: async (req, res) => {
        const { description } = req.body;

        const db = req.app.get('db');

        const searchResults = await db.explore.search_description(`%${description}%`);
        // console.log(searchResults);

        res.status(200).send(searchResults);
    }
}
