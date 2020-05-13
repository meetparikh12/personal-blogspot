import React from 'react';
import './App.css';
import {BrowserRouter as Router } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
function App() {
  return (
    <Router>
      <MainNavigation/>
    </Router>
    
  );
}

export default App;
