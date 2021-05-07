module.exports = {
    newPost: async (req, res) => {
        console.log(req.body)
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {title, category, description, media} = req.body;
        const date = new Date();
        
        console.log(user_id)
        if (user_id) {       
           const createNew = await db.posts.create_post([user_id, category, date, title, description, media])
                res.status(200).send(createNew)
        } else {
            res.sendStatus(403)
        }
    },
    getUserPosts: async (req, res) => {
        const db = await req.app.get('db');
        let {user_id} = req.session.user;
        if (user_id) {
             db.posts.get_user_posts(user_id)
                .then(dbRes => res.status(200).send(dbRes))
        } else {
            res.sendStatus(403)
        }
    },
    readPost: async (req, res) => {
        await req.app.get('db').posts.read_post(req.params.id)
        .then(post => post[0] ? res.status(200).send(post[0]) : res.status(200).send({}))
        .catch(err => console.log(err))
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        console.log('work', id)
        
        const updatedPostList = await db.posts.delete_post(id)
        res.status(200).send(updatedPostList)
    },
    getVisitedUserPosts: async (req, res) => {
        const db = await req.app.get('db');
        let { id: user_id } = req.params;
        
        if (user_id) {
             db.posts.get_user_posts(user_id)
                .then(dbRes => res.status(200).send(dbRes))
        } else {
            res.sendStatus(403)
        }
    }
}