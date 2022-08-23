const express = require("express");
const User = require("../models/userModel");
const { loginUser, signUpUser } = require("../controllers/userController");
const router = express.Router();
//login route
router.post("/login", loginUser);

//signupp route
router.post("/signup", signUpUser);

module.exports = router;
