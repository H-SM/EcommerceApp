// AuthContext.js
import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const signUp = async (userData) => {
    // Your code to call the signUp function
    // For example, you can use the fetch API to make a POST request to your server
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data); // Handle the response from the server

      // You can add additional logic here, such as updating the global state
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
