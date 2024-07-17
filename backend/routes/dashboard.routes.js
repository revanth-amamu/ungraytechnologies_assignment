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
    console.error('Error fetching data:', error.message);
    throw error;
  }
};


dashboardRouter.get('/comparison', async (req, res) => {  
    try {
        const result = await pool.query('SELECT * FROM comparison');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/top-products', async (req, res) => { 
    try {
        const result = await pool.query('SELECT * FROM top_products');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/customers-by-device', async (req, res) => {  
    try {
        const result = await pool.query('SELECT * FROM customers_by_device');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/summary-cards', (req, res) => {  
    try {
        fetchData(apiOne).then((data) => {
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/performance-score', async (req, res) => {  
    try {
        fetchData(apiThree).then((data) => {
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

dashboardRouter.get('/community-feedback', async (req, res) => {  
    try {
        fetchData(apiFive).then((data) => {
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});


module.exports = dashboardRouter