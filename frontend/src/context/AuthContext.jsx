import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_LOGIN_API;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const login = async (username, password) => {
    let isValid = true;
    let errors = ['Incorrect Password', 'Incorrect Username'];
    try {
      const response = await axios.post(apiUrl, { 
        username, 
        password,
        email: '', 
        phone_number: '', 
        input_code: 0
      });

      if (errors.includes(response.data.message)) {
        isValid = false;
      }

      if (response.status === 200 && isValid) {
        setIsAuthenticated(true);
        setUser(username);
        navigate('/dashboard');
        toast.success('Login successful');
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser('');
    toast.success('Logout successful');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
