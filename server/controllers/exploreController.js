module.exports = {
    searchUser: async (req, res) => {
        const { name } = req.body;
        // make sure frontend axios call is named 'name'
        const db = req.app.get('db');

        const searchResults = await db.explore.search(`%${name}%`)
        console.log(searchResults)
        // if body is used, axios request must be .put or .post
        

        res.status(200).send(searchResults);
    }
}