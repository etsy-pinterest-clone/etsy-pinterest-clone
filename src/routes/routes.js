import React from 'react'
import { Route, Switch} from 'react-router-dom'
import App from '../App'
import Login from '../components/Login'
import Register from '../components/Register'
import Contact from '../components/Contact'
import About from '../components/About'
import UserLanding from '../components/UserLanding'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'
import UserProfile from '../components/UserProfile'
import UserData from '../components/UserData'
import StoreData from '../components/StoreData'
import Cart from '../components/Cart'
import VisitUserProfile from '../components/VisitUserProfile';



export default (
    
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Register}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/about" component={About}/>
      <Route path='/user/dash' component={UserLanding} />
      <Route path='/user/createpost' component={CreatePost} />
      <Route path='/user/posts/:id' component={Post} />
      <Route path='/user/userprofile' component={UserProfile}/>
      <Route path='/user/userdata' component={UserData}/>
      <Route path='/user/storedata' component={StoreData}/>
      <Route path='/user/cart' component={Cart} />

      {/* socket io */}
      <Route path="/api/products" component={Products} exact />
      <Route path="/api/product/:id" component={DetailProduct} exact />

      <Route path='/visitUserProfile/:id' component={VisitUserProfile}/>
    </Switch>
  )