import React from "react";
import { Route, Link, Switch } from 'react-router-dom';
import Form from './Form.js';
import Home from './Home.js';
import './App.css';

const App = () => {
  return (
    <div>
      {/* Header for the webpage with link to homepage */}
      <div className='header'>
        <h1>Lambda Eats</h1>
        <Link to='/' >
          <button id='home-button'>Home</button>
        </Link>
      </div>
      
      {/* Use of Switch to alternate view between homepage and pizza order form */}
      <Switch>
        <Route exact path = '/' component={Home}/>
        <Route path = '/pizza' component={Form}/>
      </Switch>
 
    </div>
  );
};
export default App;
