/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")('********************************************************************'); //stripe key

// app config
const app = express();

// middlewares
app.use(cors({
  origin: true,
}));
app.use(express.json());

// api routes 
 
app.get('/', (req, res) => {
  return res.status(200).send('hello world');
});

app.post('/payments/create',async (req, res) => {
  return new Promise((resolve, reject) => {
    const total = req.query.total;
    console.log(total);
    const paymentIntent = stripe.paymentIntents.create({
      amount: total,
      currency: 'INR',
    });

    resolve(paymentIntent);
  })
      .then((paymentIntent) => {
        res.status(201).send({
          clientSecret: paymentIntent.client_secret, 
        });
      });
});

// listen

exports.api = functions.https.onRequest(app);


// http://localhost:5001/clone-4d3fd/us-central1/api

