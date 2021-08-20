import { Route } from 'react-router-dom';

const Form = () => {
    return(
        <div className='form_page'>
          {/* Pizza order form */}
          <Route path='/pizza'>
            <form id='pizza-form'>
              <label>
                  Name for Order:
                  <input type='text'
                         name='user'
                         id='name-input'
                  />
              </label>

              <label>
                Pizza size: 
                <select id='size-dropdown'>
                  <option> - Pick a size - </option>
                  <option> Personal - 8" </option>
                  <option> Medium - 10" </option>
                  <option> Large - 12" </option>
                </select>
              </label>

       
                  <h4>Toppings:</h4>
                  <p> All pizzas come with our signature tomato sauce and fresh mozzarella straight from Italy </p>
                  <label>
                      Salami:
                      <input type='checkbox'
                      />
                  </label>
                  <label>
                      Spicy Peppers
                      <input type='checkbox'
                      />
                  </label>
                  <label>
                      Basil:
                      <input type='checkbox'
                      />
                  </label>
                  <label>

                  </label>

            </form>
          </Route>
        </div>
    );
}

export default Form;