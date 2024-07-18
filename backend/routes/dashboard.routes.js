const express = require('express');
const pool = require('../config/db');
const axios = require('axios');
require('dotenv').config();

const apiOne = process.env.API_ONE;
const apiThree = process.env.API_THREE;
const apiFive = process.env.API_FIVE;

const dashboardRouter = express.Router();

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint, {
      auth: {
        username: 'trial',
        password: 'assignment123',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      throw error;
    }
};


dashboardRouter.get('/comparison', async (req, res) => {  
    try {
        const result = await pool.query('SELECT * FROM comparison');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error in /comparison route:', err.message);
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/top-products', async (req, res) => { 
    try {
        const result = await pool.query('SELECT * FROM top_products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error in /top-products route:', err.message);
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/customers-by-device', async (req, res) => {  
    try {
        const result = await pool.query('SELECT * FROM customers_by_device');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error in /customers-by-device route:', err.message);
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/summary-cards', async (req, res) => {  
    try {
        const data = await fetchData(apiOne);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error in /summary-cards route:', err.message);
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/performance-score', async (req, res) => {  
    try {
        const data = await fetchData(apiThree);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error in /performance-score route:', err.message);
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/community-feedback', async (req, res) => {  
    try {
        const data = await fetchData(apiFive);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error in /community-feedback route:', err.message);
        res.status(500).json({ msg: err.message });
    }
});


module.exports = dashboardRouter