require("dotenv").config();
const express = require("express");
const worketoutRoutes = require("./routes/worketout");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");

// express app
const app = express();

//check if their is some data then pass in res
app.use(express.json());
//middlerware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//req -> req object contain information about req
//res -> res object use to send a res back to browser(client)
app.use("/api/workouts", worketoutRoutes);
app.use("/api/user", userRoutes);

//connect to db asyn in natur
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(4000, () => {
      console.log("listing on port" + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
