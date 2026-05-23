
const express = require('express');
const router = express.Router();

const userController = require("../controllers/authController");
const { routes } = require('../app');
// Import controller functions
routes.post("/register",userController.registerUser);
routes.post("/login",userController.loginUser);



module.exports = router;   