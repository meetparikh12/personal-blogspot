import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import AllBlogs from './users-blogs/container/view-all-blogs';
import MyBlogs from './blogs/container/view-blogs';
import AddBlog from './blogs/container/add-blog';
function App() {
  return (
    <Router>
      <MainNavigation/>
      <main className="App">
        <Route exact path="/all-blogs" component={AllBlogs}></Route>
        <Route exact path="/my-blogs" component={MyBlogs}></Route>
        <Route exact path="/blog/new" component={AddBlog}></Route>

      </main>
    </Router>
    
  );
}

export default App;
