import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';



function Login() {
  const loginRef = useRef();

  const [signupdata, setsignupdata] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [isSigningUp, setIsSigningUp] = useState(false);

  const sendSignup = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupdata),
      });

      const data = await response.json();
      console.log(data);

      // resets the form after successful sign-up
      setsignupdata({
        email: '',
        username: '',
        password: ''
      });

    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  const handleSignup = (e) => {
    const { name, value } = e.target;
    setsignupdata({ ...signupdata, [name]: value });
  };

  return (
    <div className="modal-container" ref={loginRef}>
      <div className="login-container">
        <h2>{isSigningUp ? 'Sign Up' : 'Login'}</h2>

        {/* Render email field only if it's a sign-up */}
        {isSigningUp && (
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={signupdata.email}
            onChange={handleSignup}
          />
        )}

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={signupdata.username}
          onChange={handleSignup}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signupdata.password}
          onChange={handleSignup}
        />
        <button onClick={sendSignup}>
          {isSigningUp ? 'Sign Up' : 'Login'}
        </button>
        <p>
          {isSigningUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <span onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
