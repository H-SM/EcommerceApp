const express = require('express');
const router = express.Router();
//const fetchuser = require('../middleware/fetchuser');
const User = require("../models/user");


router.get('/getuser', async (req, res) => {
    try {
      const { email } = req.body;
  
      if (email) {
        const userByEmail = await User.findOne({ email });
        if (userByEmail) {
          return res.send(userByEmail);
        }
        return res.status(404).send('User not found by email');
      }
      return res.status(404).send('User not found');
    } catch (err) {
      console.error(err);
      return res.status(500).send('INTERNAL SERVER ERROR: Some error occurred');
    }
  });





router.put('/updatecart', async(req, res) => {
    const { email, crt } = req.body;
  
    if (!email || !crt) {
      return res.status(400).json({ message: 'Email and cart data required' });
    }
  
     await User.findOneAndUpdate(
      { email: email },
      { $set: { cartList: crt } },
      { new: true }

    );
    res.status(200).json({message:'Successfull'});
  });

module.exports = router;