const express = require('express');
require('dotenv').config();
const cors = require('cors');
const pool = require('./config/db');
const dashboardRouter = require('./routes/dashboard.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/dashboard', dashboardRouter);


const port = process.env.PORT || 8000;

app.listen(port, async () => {
    
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        console.log(result.rows);
        console.log('Connected to Database');
        console.log(`Server running on port ${port}`);
    } catch (err) {
        console.log({ msg: err.message })
    }
});