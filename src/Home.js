import React from "react";
import { Route, Link } from 'react-router-dom';
import './App.css';

const Home = () => {
    return(
      <div>
      {/* Homepage display */}
      <Route exact path='/'>
        <div className='body_container'> 
          <h2>Hungry while coding?</h2> 
          <p>Lambda partners with local artisan pizza shops to deliver delicious food to your door at discounted rates!
          </p>

          {/* Div that has pizza photo and button link to pizza order form */}
          <div className='pizza_pic'>
            <Link to='/pizza'>
              <button id='order-pizza'>Pizza?</button>
            </Link>
          </div>
        </div>
      </Route>

      </div>
    )
}

export default Home;