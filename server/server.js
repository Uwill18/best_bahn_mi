const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

//app.use(express.json())

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

//This is how we post the payment information on the backend
app.post("/create-payment-intent", async (req, res) => {

  try{
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'eur',
      amount: 1999,
      automatic_payment_methods:{
        enabled:true,
      },
    });
    res.send({clientSecret: paymentIntent.client_secret})
  } catch(e){
    return res.status(400).send({
      error:{
        message: e.message,
      },
    });
  }


  
});

//create a customer route
app.post("/create-customer", async(req,res)=>{
  try{
    const customer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name, //Customer's name
      description: req.body.description,
      phone: req.body.phone,
      address:{
        line1: req.body.addressLine1, //Street address
        line2: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postalCode,
        country: req.body.country
      }
    });
    res.json(customer);
  } catch(error){
    res.status(500).json({error: error.message})
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
