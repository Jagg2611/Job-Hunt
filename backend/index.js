// const express = require("express"); normal way for using express

import express from "express";
import cors from "cors"; //Cross Origin Resource Sharing, allows your Express server to handle requests from different origions
import cookieParser from "cookie-parser"; //cookie parsing from frontend
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config({});

const app = express();
// app.get("/home", (req, res) => { //define a simple API
//   return res.status(200).json({
//     message: "I am coming from backend",
//     success: true,
//   });
// });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parses url data typically during form submissions
app.use(cookieParser()); // Useful if you're dealing with cookies for
//user sessions, authentication, or other purposes.
const corsOptions = {
  origin: "http://localhost:5173", //link to frontend
  credentials: true,
}; // cors is basically used to ensure frontend communicates with backend.
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
// Start the server and listen on PORT 3000

//API's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

//http://localhost:8000/api/v1/user/register

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at PORT ${PORT}`);
});

//.listen is a function in express which is used to start a web server and make
// incoming HTTP requests on a specific port, it turns the code into an active web
//server.
