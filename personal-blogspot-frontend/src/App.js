import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import AllBlogs from './users-blogs/container/view-all-blogs';
import AuthorBlogs from './blogs/container/author-blogs';
import AddBlog from './blogs/container/add-blog';
import SingleBlog from './blogs/container/single-blog';
import Register from './user-management/container/register';
import login from './user-management/container/login';
import UpdateBlog from './blogs/container/update-blog';
import store from './store/store';
import jwt_decode from 'jwt-decode';
import setJwtToken from './shared/securityUtils/setJwtToken';
import {USER_INFO} from './actions/actionTypes';
import ProtectedRoute from './shared/securityUtils/ProtectedRoute';

const token = localStorage.getItem('jwt-token')
if(token) {
  const decoded_token = jwt_decode(token);
  store.dispatch({
    type: USER_INFO,
    payload: decoded_token
  })

  const currentTime = Date.now()/1000;
  if(decoded_token.exp < currentTime) {
    localStorage.removeItem('jwt-token');
    setJwtToken(false);
    store.dispatch({
      type: USER_INFO,
      payload: {}
    });
    window.location.href = '/';
  }
}
function App() {
  return (
    <Router>
      <MainNavigation/>
      <main>
        <Switch>
          <Route exact path="/login" component={login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/" component={AllBlogs}></Route>
          <ProtectedRoute exact path="/blogs/:userId" component={AuthorBlogs}/>
          <ProtectedRoute exact path="/blog/new" component={AddBlog}/>
          <ProtectedRoute exact path="/blog/update/:blogId" component={UpdateBlog}/>
          <Route exact path="/blog/user/:blogId" component={SingleBlog}/>
          <Redirect to="/"/>
        </Switch>
      </main>
    </Router>
    
  );
}

export default App;
