import classes from "./CartItem.module.css";
import { useEffect,useState } from "react";
import CheckoutForm from"./CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";


const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  
    // In CartItem.js

// Fetch the publishable key
// Fetch the publishable key
useEffect(() => {
  fetch("http://localhost:5252/config")
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! Status: ${r.status}`);
      }
      const { publishableKey } = await r.json();
      console.log(publishableKey);
      setStripePromise(loadStripe(publishableKey));
    })
    .catch((error) => {
      console.error('Error fetching publishable key:', error);
    });
}, []);

// Fetch the client secret
// syncing the local-host with the create-payment-intent and 
//installing cors resolved the following error: "resolve the Unexpected token '<', "<!DOCTYPE "... is not valid JSON error"
//https://chatgpt.com/c/9ee67e01-0235-4f4d-a347-85446b813e47
useEffect(() => {
  fetch("http://localhost:5252/create-payment-intent", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! Status: ${r.status}`);
      }
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    })
    .catch((error) => {
      console.error('Error creating payment intent:', error);
    });
}, []);




  return (
    <>
        <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>    
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>  
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div> 
    </li>
     {stripePromise && clientSecret && (
      <Elements stripe={stripePromise} options={{clientSecret}}>
      <CheckoutForm/>
      </Elements>)} 
    </>
  );
};

export default CartItem;