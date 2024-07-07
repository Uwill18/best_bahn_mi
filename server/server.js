const express = require("express");
const cors = require("cors"); // Add this line
const app = express();
const { resolve } = require("path");
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(cors()); // Add this line
app.use(express.json());
app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'eur',
      amount: 1999,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.setHeader('Content-Type', 'application/json');
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).setHeader('Content-Type', 'application/json').send({
      error: {
        message: e.message,
      },
    });
  }
});

app.post("/create-customer", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name,
      description: req.body.description,
      phone: req.body.phone,
      address: {
        line1: req.body.addressLine1,
        line2: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postalCode,
        country: req.body.country,
      },
    });
    res.setHeader('Content-Type', 'application/json');
    res.json(customer);
  } catch (error) {
    res.status(500).setHeader('Content-Type', 'application/json').json({ error: error.message });
  }
});

app.listen(5252, () => console.log(`Node server listening at http://localhost:5252`));
