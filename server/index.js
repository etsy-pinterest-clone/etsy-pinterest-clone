require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const cors = require("cors");
const authCtrl = require("./controllers/authController");
const postCtrl = require("./controllers/postController");
const storeCtrl = require("./controllers/storeController");
const userCtrl = require("./controllers/userController");
const exploreCtrl = require("./controllers/exploreController");
const path = require("path");
const contactController = require("./controllers/contactController");
const socket = require("socket.io");
const app = express();
app.use(express.static("."));
const Comments = require("../models/commentModel");
//mongoDb
const mongoose = require("mongoose");

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  STRIPE_KEY,
  MONGODB_URL,
  SOCKET_PORT
} = process.env;

const stripe = require("stripe")(STRIPE_KEY);

const YOUR_DOMAIN = "http://localhost:3000/user/cart";

app.use(express.json());
app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 4
    }
  })
);

app.use(express.static(`${__dirname}/../build`));


//SOCKET.IO

// TEST SOCKET Routes
app.use("/api", require("../src/routes/productRouter"));
app.use("/api", require("../src/routes/commentRouter"));

app.use(cors());

const http = require('http').createServer(app)
const io = socket(
  app.listen(SERVER_PORT, () =>
    console.log(`Server is running on ${SERVER_PORT}`)
  )
);

let users = [];
io.on("connection", (socket) => {
  console.log(socket.id + " connected.");

  socket.on("joinRoom", (id) => {
    const user = { userId: socket.id, room: id };

    const check = users.every((user) => user.userId !== socket.id);

    if (check) {
      users.push(user);
      socket.join(user.room);
    } else {
      users.map((user) => {
        if (user.userId === socket.id) {
          if (user.room !== id) {
            socket.leave(user.room);
            socket.join(id);
            user.room = id;
          }
        }
      });
    }
  });

  socket.on("createComment", async (msg) => {
    const { username, content, product_id, createdAt, rating, send } = msg;

    const newComment = new Comments({
      username,
      content,
      product_id,
      createdAt,
      rating
    });

    if (send === "replyComment") {
      const { _id, username, content, product_id, createdAt, rating } =
        newComment;

      const comment = await Comments.findById(product_id);

      if (comment) {
        comment.reply.push({ _id, username, content, createdAt, rating });

        await comment.save();
        io.to(comment.product_id).emit("sendReplyCommentToClient", comment);
      }
    } else {
      await newComment.save();
      io.to(newComment.product_id).emit("sendCommentToClient", newComment);
    }
  });

  socket.on("disconnect", () => {
    // console.log(socket.id + ' disconnected.')
    users = users.filter((user) => user.userId !== socket.id);
  });
});

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Stubborn Attachments",
            images: ["https://i.imgur.com/EHyR2nP.png"]
          },
          unit_amount: 2000
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`
  });
  res.json({ id: session.id });
});

// USER LOGIN/REGISTRATION ENDPOINTS

app.post("/auth/register", authCtrl.register);

app.post("/auth/login", authCtrl.login);

app.delete("/auth/logout", authCtrl.logout);

app.delete("/auth/user/:id", authCtrl.deleteAccount);

app.get("/auth/session", authCtrl.getSession);

// USER CONTROLLER ENDPOINTS

// userCtrl.getUser
app.get("/user/:id");

// userCtrl.updateUser
app.put("/user/updateprofile", userCtrl.updateProfile);

// userCtrl.followUser
app.put("/user/follow/:id");

// userCtrl.getUserMessages
app.get("/user/messages");

// userCtrl.readMessage
app.post("/user/messages/:id");

// userCtrl.messageUser
app.post("/user/message/:id");

// userCtrl.deleteMessage
app.delete("/user/message/:id");

// userCtrl.getUserData
app.get("/user/userdata/:id", userCtrl.getUserData);

// userCtrl.updateUserData
app.put("/user/userdata/:id", userCtrl.updateUserData);

// POST CONTROLLER ENDPOINTS

app.get("/user/posts", postCtrl.getUserPosts);

app.get("/user/posts/:id", postCtrl.getVisitedUserPosts);

// postCtrl.getSavedPosts
app.get("/user/savedposts");

app.post("/user/post/createpost", postCtrl.newPost);

app.get("/user/post/:id", postCtrl.readPost);

// postCtrl.commentPost
app.put("/user/post/:id");

// postCtrl.deleteComment
app.delete("/user/post/:id");

app.delete("/user/post/:id", postCtrl.deletePost);

// postCtrl.removeSavedPost
app.delete("/user/savedpost/:id");

// postCtrl.getRecommended
app.get("/user/recommended");

// STORE CONTROLLER ENDPOINTS

// storeCtrl.goToStore
app.get("/user/store");

app.post("/user/store/createitem", storeCtrl.newItem);

app.get("/user/store/items", storeCtrl.getUserItems);

app.get("/user/store/item/:id", storeCtrl.openItem);

app.get("/user/store/cart/:id", storeCtrl.getUserItems);

app.put("/user/store/searchtitle", storeCtrl.searchTitle);

app.put("/user/store/searchcategory", storeCtrl.searchCategory);

app.put("/user/store/searchdescription", storeCtrl.searchDescription);

app.put("/user/store/searchitem", storeCtrl.searchStore);

// storeCtrl.editItem
app.put("/user/store/item/:id");

app.delete("/user/store/item/:id", storeCtrl.deleteItem);

// storeCtrl.addToCart
app.put("/user/store/cart/item:id");

// storeCtrl.removeFromCart
app.delete("/user/store/cart/:id");

// storeCtrl.checkout
app.put("/user/store/cart/:id");

// storeCtrl.getStoreData
app.get("/user/store/storedata");

// app.put('/user/store', storeCtrl.searchStore)

// EXPLORE ( SEARCH ) CONTROLLER ENDPOINTS

// exploreCtrl.sortNew
app.get("/explore/new");

//Explore to get all posts
app.get("/explore", exploreCtrl.getAll);

// using .put so that we have access to req.body
app.put("/explore/searchtitle", exploreCtrl.searchTitle);

app.put("/explore/searchcategory", exploreCtrl.searchCategory);

app.put("/explore/searchdescription", exploreCtrl.searchDescription);

app.put("/explore/searchpost", exploreCtrl.searchPost);

app.put("/explore/search", exploreCtrl.searchUser);

// exploreCtrl.savePost
app.put("/explore/post/:id");

// nodemailer/ contactCtrl
app.post("/api/email", contactController.email);

// Connection to mongodb
const URI = MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})
  .then((db) => {
    app.set("db", db);
    // app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))
  })
  .catch((err) => {
    console.log(err);
  });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'))
//   })
