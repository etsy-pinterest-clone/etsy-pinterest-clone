require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const stripe = require('stripe')('sk_test_51In8T6KglDRdKQ3CSkCGIe9WzRntC1mEJrQfPIPJp3HHuqGipvyan4KgqrsZZKm2bthnHw1dg4BuWG549LlXbs1R00SoC0uM6n')

const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')
const storeCtrl = require('./controllers/storeController')
const userCtrl = require('./controllers/userController')
const exploreCtrl = require('./controllers/exploreController');
const path = require('path');
const contactController = require('./controllers/contactController')
const app = express();
app.use(express.static('.'));


const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const YOUR_DOMAIN = 'http://localhost:3000/user/cart';



app.use(express.json());
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4
    }
}));

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Stubborn Attachments',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    res.json({ id: session.id });
  });



// USER LOGIN/REGISTRATION ENDPOINTS

app.post('/auth/register', authCtrl.register);

app.post('/auth/login', authCtrl.login);

app.delete('/auth/logout', authCtrl.logout);

app.delete('/auth/user/:id', authCtrl.deleteAccount)

// not sure if we need this
app.get('/auth/session', authCtrl.getSession)



// USER CONTROLLER ENDPOINTS

// userCtrl.getUser
app.get('/user/:id')

// userCtrl.updateUser
app.put('/user/updateprofile', userCtrl.updateProfile)

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

app.get('/user/posts', postCtrl.getUserPosts)

// postCtrl.getSavedPosts
app.get('/user/savedposts')

app.post('/user/post/createpost', postCtrl.newPost)

app.get('/user/post/:id', postCtrl.readPost)

// postCtrl.commentPost
app.put('/user/post/:id')

// postCtrl.deleteComment
app.delete('/user/post/:id')

app.delete('/user/post/:id', postCtrl.deletePost)

// postCtrl.removeSavedPost
app.delete('/user/savedpost/:id')

// postCtrl.getRecommended
app.get('/user/recommended')



// STORE CONTROLLER ENDPOINTS

// storeCtrl.goToStore
app.get('/user/store')

app.post('/user/store/createitem', storeCtrl.newItem)

app.get('/user/store/items', storeCtrl.getUserItems)

app.get('/user/store/item/:id', storeCtrl.openItem)

app.get('/user/store/cart/:id', storeCtrl.getUserItems)

// storeCtrl.editItem
app.put('/user/store/item/:id')

app.delete('/user/store/item/:id', storeCtrl.deleteItem)

// storeCtrl.addToCart
app.put('/user/store/cart/item:id')

// storeCtrl.removeFromCart
app.delete('/user/store/cart/:id')

// storeCtrl.checkout
app.put('/user/store/cart/:id')

// storeCtrl.getStoreData
app.get('/user/store/storedata')

// app.put('/user/store', storeCtrl.searchStore)



// EXPLORE ( SEARCH ) CONTROLLER ENDPOINTS

    /* category ID */

// exploreCtrl.sortNew
app.get('/explore/new')

app.put('/explore/searchtitle', exploreCtrl.searchTitle)

app.put('/explore/searchcategory', exploreCtrl.searchCategory)

app.put('/explore/searchdescription', exploreCtrl.searchDescription)

app.put('/explore/searchpost', exploreCtrl.searchPost)

app.put('/explore/search', exploreCtrl.searchUser)
// using .put so that we have access to req.body

// exploreCtrl.savePost
app.put('/explore/post/:id')


// nodemailer/ contactCtrl
app.post('/api/email', contactController.email);


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
