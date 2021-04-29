require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')
const storeCtrl = require('./controllers/storeController')
const userCtrl = require('./controllers/userController')
const exploreCtrl = require('./controllers/exploreController');
const path = require('path');
const app = express();

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;



app.use(express.json());
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4
    }
}));



// USER LOGIN/REGISTRATION ENDPOINTS

// authCtrl.register
app.post('/auth/register', authCtrl.register);

// authCtrl.login
app.post('/auth/login', authCtrl.login);

// authCtrl.logout
app.delete('/auth/logout', authCtrl.logout);

// authCtrl.deleteAccount
app.delete('/auth/user/:id', authCtrl.deleteAccount)

// not sure if we need this
app.get('/auth/session', authCtrl.getSession)



// USER CONTROLLER ENDPOINTS

// userCtrl.getUser
app.get('/user/:id')

// userCtrl.updateUser
app.put('/user/profile', userCtrl.updateProfile)

// userCtrl.followUser
app.put('/user/follow/:id')

// userCtrl.getUserMessages
app.get('/user/messages')

// userCtrl.readMessage
app.post('/user/messages/:id')

// userCtrl.messageUser
app.post('/user/message/:id')

// userCtrl.deleteMessage
app.delete('/user/message/:id')

// userCtrl.getUserData
app.get('/user/userdata')



// POST CONTROLLER ENDPOINTS

// postCtrl.getUserPosts
app.get('/user/posts', postCtrl.getUserPosts)

// postCtrl.getSavedPosts
app.get('/user/savedposts')

// postCtrl.createPost
app.post('/user/post/createpost', postCtrl.newPost)

app.get('/user/post/:id', postCtrl.readPost)

// postCtrl.commentPost
app.put('/user/post/:id')

// postCtrl.deleteComment
app.delete('/user/post/:id')

// postCtrl.deleteUserPost
app.delete('/user/post/:id', postCtrl.deletePost)

// postCtrl.removeSavedPost
app.delete('/user/savedpost/:id')

// postCtrl.getRecommended
app.get('/user/recommended')



// STORE CONTROLLER ENDPOINTS

// storeCtrl.goToStore
app.get('/user/store')

// storeCtrl.createItem
app.post('/user/store/createitem', storeCtrl.newItem)

// storeCtrl.getItems
app.get('/user/store/items', storeCtrl.getUserItems)

//storeCtrl.readItem
app.get('/user/store/item/:id', storeCtrl.openItem)
app.get('/user/store/cart/:id', storeCtrl.getUserItems)

// storeCtrl.editItem
app.put('/user/store/item/:id')

//storeCtrl.deleteItem
app.delete('/user/store/item/:id', storeCtrl.deleteItem)

// storeCtrl.addToCart
app.put('/user/store/cart/item:id')

// storeCtrl.removeFromCart
app.delete('/user/store/cart/:id')

// storeCtrl.checkout
app.put('/user/store/cart/:id')

// storeCtrl.getStoreData
app.get('/user/store/storedata')



// EXPLORE ( SEARCH ) CONTROLLER ENDPOINTS

    /* category ID */

// exploreCtrl.sortNew
app.get('/explore/new')

// exploreCtrl.sortPopular
app.get('/explore/popular')

// exploreCtrl.displayCategory
app.get('/explore/:id') /* category ID */

// exploreCtrl.searchCategory
app.get('/explore/search/:id') /* category ID */

// exploreCtrl.searchUser
app.put('/explore/search', exploreCtrl.searchUser) /* user ID */
// using .put so that we have access to req.body

// exploreCtrl.savePost
app.put('/explore/post/:id')




massive({
    connectionString:  CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
.then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))
})
.catch(err => {
    console.log(err)
});
