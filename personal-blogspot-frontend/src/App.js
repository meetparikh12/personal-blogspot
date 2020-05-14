import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import AllBlogs from './users-blogs/container/view-all-blogs';
import AuthorBlogs from './blogs/container/author-blogs';
import AddBlog from './blogs/container/add-blog';
import SingleBlog from './blogs/container/single-blog';
function App() {
  return (
    <Router>
      <MainNavigation/>
      <main>
        <Switch>
          <Route exact path="/all-blogs" component={AllBlogs}></Route>
          <Route exact path="/blogs/:userId" component={AuthorBlogs}></Route>
          <Route exact path="/blog/new" component={AddBlog}></Route>
          <Route exact path="/blog/:blogId/:userId" component={SingleBlog}></Route>
        </Switch>
      </main>
    </Router>
    
  );
}

export default App;
