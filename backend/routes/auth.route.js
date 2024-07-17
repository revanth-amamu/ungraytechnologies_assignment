const express = require("express");
require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');

const loginApi = process.env.LOGIN_API;

const authRouter = express.Router();


authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let errors = ['Incorrect Password', 'Incorrect Username'];
    try {
        const response = await axios.post(loginApi, { username, password, email : '', phone_number : '', input_code : 0 });
        const token = jwt.sign({ user: username }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        if (errors.includes(response.data.message)) {
            res.status(400).json({ msg: response.data.message });
        } else {
            res.status(200).json({ msg: response.data.message, token });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = authRouter