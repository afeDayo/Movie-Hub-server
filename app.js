//import dotenv package and configure it
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//imports routes to app.js from authRouter in routes folder
const authRouter = require("./routes/authRouter");

const movieRouter = require("./routes/movieRouter");

const bookmarkRouter = require("./routes/bookmarkRouter");

//import the error file from middleware folder
const error = require("./middlewares/error");

//spins up a new express application
const app = express();

const port = 4000;

app.use(cors());

//a middleware that allows access to the req.body on all request (without this you cant test on postman)
app.use(express.json());

// middleware for login and register for authentication router
app.use("/api/auth", authRouter);

//middleware for movie router
app.use("/api/movie", movieRouter);

app.use("/api/bookmark", bookmarkRouter);

// custom middleware for errors
app.use(error);

//start listening on a given port
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");

    await app.listen(port, () => {
      console.log(`Server is runing on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};

start();

//afedayo
//W2lYg80vt9pBdrj7
//mongodb+srv://afedayo:W2lYg80vt9pBdrj7@cluster0.pq5mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
