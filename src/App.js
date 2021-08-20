import React from "react";
import { Route, Link } from 'react-router-dom';
import Form from './Form.js';
import './App.css';

const App = () => {
  return (
    <div className='homepage'>
      <div className='header'>
        <h1>Lambda Eats</h1>
        <Link to='/' id='home-button' component={App}>Home</Link>
      </div>

      <div className='body_container'> 
        <h2>Hungry while coding?</h2> 
        <p>Lambda partners with local artisan pizza shops to deliver delicious food to your door at discounted rates!
        </p>

        <div className='pizza_pic'>
          <Link to='/pizza'id='order-pizza' component={Form}>Pizza?</Link>
        </div>
      </div>
     
    </div>
  );
};
export default App;
