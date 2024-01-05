const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'abh_first_repo';
const cors = require('cors');
const fetchuser = require('../middleware/fetchuser');

router.post('/signup',[
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors : errors.array()});
    }
    try{
    const salt =await bcrypt.genSalt(10);
    const secPass =await bcrypt.hash(req.body.password, salt);

    const user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        cart: []
    });
    const data = { 
        user :{ 
            id : user.id
        }
    }
    const jwt_token = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, jwt_token});

    }catch(err){
        if(err.code=== 11000){
            //Duplicate key error 
            return res.status(400).json({success, error : "Email Already Exist"});
        }
        console.error(err);
        res.status(500).json({success, error : "server error", message : err.message});
    }
});

router.post('/login',[
    body('email', "Enter a valid Email").isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],async (req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({success , errors : errors.array()});
    }
    const { email , password} = req.body;

    try{
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error :"Check over your credentials again"});
        }
        const passwordCompare =await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error :"Check over your credentials again"});
        }
        const payload = { 
            user :{ 
                id : user.id
            }
        }
        const auth_token = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({success, auth_token});
    }catch(err){
        console.error(err);
        res.status(500).send("INTERNAL SERVER ERROR : Some error occured");
    }

});

router.get('/getuser', fetchuser, async (req, res) => {
   
  try{
      // If no email parameter is provided, fetch currently authenticated user
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      if (user) {
        return res.send(user);
      }
      return res.status(404).send('User not found');
    } catch (err) {
      console.error(err);
      return res.status(500).send('INTERNAL SERVER ERROR: Some error occurred');
    }
  });

 




module.exports = router;


