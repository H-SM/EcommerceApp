import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { AuthProvider } from './AuthContext';
import UserState from './context/User/userState';

function App() {
  return (
    <>
    <UserState>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
    </UserState>
    </>
  );
}

export default App;
