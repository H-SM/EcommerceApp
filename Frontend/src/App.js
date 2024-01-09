import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import StripePayment from './Components/StripePage/StripePayment';
import { AuthProvider } from './AuthContext';
import UserState from './context/User/userState';
import Success from './Components/PayPages/Success';
import Cancel from './Components/PayPages/Cancel';


function App() {
  return (
    <>
    <UserState>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} /> 
          <Route path="/cancel" element={<Cancel />} /> 
          <Route path="/stripepayment" element={<StripePayment />} />
        </Routes>
    </Router>
    </UserState>
    </>
  );
}

export default App;
