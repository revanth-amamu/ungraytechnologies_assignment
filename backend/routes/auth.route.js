const express = require("express");
require("dotenv").config();
const axios = require("axios");
const jwt = require("jsonwebtoken");

const loginApi = process.env.LOGIN_API;

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let errors = ["Incorrect Password", "Incorrect Username"];
  try {
    const response = await axios.post(loginApi, {
      username,
      password,
      email: "",
      phone_number: "",
      input_code: 0,
    });
    const token = jwt.sign({ user: username }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    if (errors.includes(response.data.message)) {
      res.status(400).json({ msg: response.data.message });
    } else {
      res.status(200).json({ msg: response.data.message, token });
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = authRouter;
