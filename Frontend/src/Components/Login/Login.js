import React, { useState, useRef, useEffect, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import userContext from "../../context/User/userContext";
import {message} from 'antd';

let userIdentifier = '';
let currCart = [];


function Login(props) {

  const closeLogin=()=>{
    props.onLogin();
  }

  const [userCart, setUserCart] = useState(null);
  const [isLoggedin,setLoggedin]=useState(false);

  const handleLoginDone =()=>{
    setLoggedin(true);
  }
  const loginRef = useRef();
  const [credentails, setCredentails] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isSigningUp, setIsSigningUp] = useState(false);

  const fetchUserCart = async (credentails) => {
    try {
      const response = await fetch('https://localhost:8000/', {
        method: 'POST',
        body: JSON.stringify(credentails),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Process the response and extract cart data
      const data = await response.json();
      return data.user.cart; // Assuming user's cart data is nested within the response
    } catch (error) {
      console.error('Error fetching user cart:', error);
      return null; // Return null or handle error as needed
    }
  };

  const context = useContext(userContext);
  const { login, signin } = context;
  const handleClick = async (e) => {
    e.preventDefault();
    let json;
    if (isSigningUp) {
      json = await signin({
        name: credentails.name,
        email: credentails.email,
        password: credentails.password,
        cartList:[],
      });
      if (json.success) {
        //save the auth_token and redirect
        localStorage.removeItem("token");
        localStorage.setItem("token", json.jwt_token);
        message.success("Account created successfully!");

      } else {
        message.error('This email is already associated with an account.');
      }
    } else {
      json = await login({
        email: credentails.email,
        password: credentails.password,
      });
      if (json.success) {
        localStorage.setItem("token", json.auth_token);
        message.success("Logged in successfully!");
        handleLoginDone();
        userIdentifier = credentails.email;
        closeLogin();
      } else {
        message.error("Invalid Credentials! Please check again.");
      }
    }
  };
  const onChange = (e) => {
    setCredentails({ ...credentails, [e.target.name]: e.target.value });
  };


  return (
    <div className="modal-container" ref={loginRef}>
      <div className= "login-container">
        <h2>{isSigningUp ? "Sign Up" : "Login"}</h2>

        {isSigningUp && (
          <input
          type="text"
          placeholder="name"
          name="name"
          id="name"
          onChange={onChange}
        />
        )}
        <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            onChange={onChange}
            required
          />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          onChange={onChange}
          required
        />
        <button onClick={handleClick}>
          {isSigningUp ? "Sign Up" : "Login"}
        </button>
        <p>
          {isSigningUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <span onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default {Login,userIdentifier}; 
