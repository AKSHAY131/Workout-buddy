const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  //verify Authentication
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(404).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select({ _id }); //find with _id , return only _id and set at req
    next();
  } catch (error) {
    res.status(404).json({ error: "Not Authorized" });
  }
};
module.exports = requireAuth;
