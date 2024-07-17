const express = require('express');
const pool = require('../config/db');

const dashboardRouter = express.Router();

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


module.exports = dashboardRouter