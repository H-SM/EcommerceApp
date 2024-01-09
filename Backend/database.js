// import User from './schemas/user.js';
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); 
const app = express();
const authRoutes = require('./routes/authRoutes.js'); 
const crudRoutes = require('./routes/crudRoutes.js');
// const paymentRoutes = require('./routes/paymentRoutes.js');

app.use(express.json());
app.use(cors());
const uri ="mongodb+srv://abhishekkothiyal002:Thedemonking101.@cluster0.aiccdxx.mongodb.net/ecomsitedb";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Successful connection.");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/crud',crudRoutes);
//app.use('/api/payment',paymentRoutes);
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
