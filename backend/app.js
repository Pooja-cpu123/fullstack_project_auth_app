
const express = require("express");
const cors = require("cors");

const userRoutes = require('./routes/authRoutes');

const app=express();
app.use(express.json());

app.use(cors());
app.use("/api/v1/user", userRoutes);

module.exports = app;