const express = require('express');
const router = express.Router();
//const fetchuser = require('../middleware/fetchuser');
const User = require("../models/user");


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