require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController')
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
app.post('/auth/register', authCtrl.Register);

// authCtrl.login
app.post('/auth/login', authCtrl.login);

// authCtrl.logout
app.delete('/auth/logout');

// authCtrl.deleteAccount
app.delete('/auth/user/:id')

// not sure if we need this
// app.get('/auth/session');



// USER CONTROLLER ENDPOINTS

// userCtrl.getUser
app.get('/user/:id')

// userCtrl.updateUser
app.put('/user/:id')

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
app.get('/user/posts')

// postCtrl.getSavedPosts
app.get('/user/savedposts')

// postCtrl.createPost
app.post('/user/post/createpost')

// postCtrl.commentPost
app.put('/user/post/:id')

// postCtrl.deleteComment
app.delete('/user/post/:id')

// postCtrl.deleteUserPost
app.delete('/user/post/:id')

// postCtrl.removeSavedPost
app.delete('/user/savedpost/:id')

// postCtrl.getRecommended
app.get('/user/recommended')



// STORE CONTROLLER ENDPOINTS

// storeCtrl.goToStore
app.get('/user/store')

// storeCtrl.createItem
app.post('/user/store/createitem')

// storeCtrl.getItems
app.get('/user/store/cart/:id')

// storeCtrl.editItem
app.put('/user/store/item/:id')

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
app.get('/explore/search/:id') /* user ID */

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
