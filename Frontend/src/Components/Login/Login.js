import React, { useState, useRef, useEffect, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import userContext from "../../context/User/userContext";

function Login() {
  const loginRef = useRef();
  const [credentails, setCredentails] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isSigningUp, setIsSigningUp] = useState(false);

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
      });
      if (json.success) {
        //save the auth_token and redirect
        localStorage.removeItem("token");
        localStorage.setItem("token", json.jwt_token);
        alert("Account created successfully!");
      } else {
        alert("Invalid Credentials! Please check again.");
      }
    } else {
      // If signup is false, call the login context
      json = await login({
        email: credentails.email,
        password: credentails.password,
      });
      if (json.success) {
        localStorage.setItem("token", json.auth_token);
        alert("Logged in successfully!");
      } else {
        alert("Invalid Credentials! Please check again.");
      }
    }
  };
  const onChange = (e) => {
    setCredentails({ ...credentails, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-container" ref={loginRef}>
      <div className="login-container">
        <h2>{isSigningUp ? "Sign Up" : "Login"}</h2>

        {/* Render email field only if it's a sign-up */}
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

export default Login;
