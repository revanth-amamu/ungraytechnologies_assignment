import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  console.log(user);
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, { 
        username, 
        password,
      });
      
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', username);
        toast.success('Logout successful');
        navigate('/dashboard');
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error('Login failed');
      console.log(error.message);
    }
  };

  const logout = () => {
    setToken(null);
    setUser('');
    localStorage.removeItem('token');
    toast.success('Logout successful');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
