import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const signUp = async (userData) => {
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data); 

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
