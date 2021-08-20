import { Route } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import React, {useState,useEffect} from 'react';

//schema to define filling form out properly
const schema = yup.object().shape({
    name: yup.string().required('name is required').min(2, 'name must be at least 2 characters'),
    size: yup.string().required('size is required').oneOf(['8','10','12'], 'you must pick a size'),
    salami: yup.boolean(),
    peppers: yup.boolean(),
    chokes:yup.boolean(),
    glaze:yup.boolean(),
    special: yup.string(),
})

//empty form values for setting and resetting state
const emptyForm = {
    name:'',
    size:'',
    salami:false,
    peppers:false,
    chokes:false,
    glaze:false,
    special:''
}


const Form = () => {
    //using state to set variables and functions that control: the form, errors, orders and enabling submission button
    const [form,setForm] = useState(emptyForm);
    const [errors,setErrors] = useState(emptyForm);
    const [orders,setOrders] = useState([]);
    const [disabled,setDisabled] = useState(true);

   
    //function for validating form entries according to schema
    const setFormErrors = (name,value) => {
        yup.reach(schema,name).validate(value)
           .then(() => setErrors({...errors, [name]:''}))
           .catch(err => setErrors({...errors, [name]: err.errors[0]}))
    }
    
    //function that handles form update upon changes made
    const change = event => {
        const { checked, value, name, type } = event.target;
        const valueToUse = type === 'checkbox' ? checked:value;
        setFormErrors(name, valueToUse);
        setForm({ ...form, [name]: valueToUse});
    }

    //function that enables submit button if form is valid
    useEffect(() => {
        schema.isValid(form)
              .then(valid => setDisabled(!valid))
    },[form]);


    //function that handles form submission
    const submitForm = (event) => {
        event.preventDefault();

        const newOrder = {
            name: form.name.trim(),
            size: form.size,
            salami: form.salami,
            peppers: form.peppers,
            chokes: form.chokes,
            glaze: form.glaze,
            special: form.special.trim()
        }

        axios.post(`https://reqres.in/api/orders`, newOrder)
             .then(res => {
                setOrders([res.data, ...orders])
                setForm(emptyForm)
             })
             .catch(err => {
                 console.error('uh-oh, there was an error sending your order',err)
             })
    }

    return(
        <div>
          
          <Route path='/pizza'>
           <div className='form_page'>

            {/* Pizza order form */}
            <form id='pizza-form'
                  onSubmit={submitForm}>
              <label>
                  Name for Order:
                  <input type='text'
                         name='name'
                         value={form.name}
                         id='name-input'
                         onChange={change}
                  />
                {errors.name}
              </label>
              

              <label>
                Pizza size: 
                <select id='size-dropdown'
                        name='size'
                        value={form.size}
                        onChange={change}>
                  <option> - Pick a size - </option>
                  <option value='8'> Personal - 8" </option>
                  <option value='10'> Medium - 10" </option>
                  <option value='12'> Large - 12" </option>
                </select>
                {errors.size}
              </label>

                <div className='Toppings description'>
                  <h4>Toppings:</h4>
                  <p> All pizzas come with our signature tomato sauce, slow roasted garlic, handmade mozzarella from Italian cows, and basil fresh from our gardens - a classic Margherita. If you desire to add more toppings, choose from the options below: </p>
                </div>

                <label>
                  Salami:
                  <input type='checkbox'
                         name='salami'
                         value={form.salami}
                         onChange={change}
                  />
                </label>
                <label>
                  Spicy Peppers:
                  <input type='checkbox'
                         name='peppers'
                         value={form.peppers}
                         onChange={change}
                  />
                </label>
                <label>
                  Artichokes:
                  <input type='checkbox'
                         name='chokes'
                         value={form.chokes}
                         onChange={change}
                  />
                </label>
                <label>
                  Balsamic Glaze:
                  <input type='checkbox'
                         name='glaze'
                         value={form.glaze}
                         onChange={change}
                  />
                </label>

                <label>
                    Any special delivery requests?
                    <input type='text'
                           id='special-text'
                           name='special'
                           value={form.special}
                           onChange={change}
                    />
                </label>

                <label>
                    <button type='submit'
                            id='order-button'
                            disabled={disabled}> Add to Order </button>
                </label>

            </form>

            {/* uses ternary expression to display orders if there are some, else a no orders message */}
            <div className='the_orders'>
            {(orders.length !== 0) ? orders.map(order => 
              <div>
                <h2>{order.name}'s Order:</h2>
                <p> A {order.size} inch pizza </p>
              </div>)
              :
              <h2> No order yet! </h2>
            }
            </div>

            </div>
          </Route>
        </div>
    );
}

export default Form;