const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51OWe1iSFEcHrO9KLdI5MFmlHPLeBoib53Fcbl9yaegyRy6VQp7z0tPGcYWCbbknUDo8WEd91zWcDZ3PcYzYyrcho00jUWFCv3T');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  return 1400;
};

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "inr",
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

app.post("/api/create-checkout-session", async (req, res) => { 
    const { product } = req.body; 
    const session = await stripe.checkout.sessions.create({ 
      payment_method_types: ["card"], 
      line_items: [ 
        { 
          price_data: { 
            currency: "inr", 
            product_data: { 
              name: product.name, 
            }, 
            unit_amount: product.price , 
          }, 
          quantity: product.quantity, 
        }, 
      ], 
      mode: "payment", 
      success_url: "http://localhost:3000/success", 
      cancel_url: "http://localhost:3000/cancel", 
    }); 
    res.json({ id: session.id }); 
  }); 


app.listen(8000, () => console.log("Node server listening on port 8000!"));