const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

const connectDB = async() => {
    try{
        dns.setServers(["8.8.8.8"]);
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB Connected Successfull");
    }
    catch(error)
    {
        console.log("Database Connection Error",error);
        process.exit(1);
    }
}
module.exports= connectDB;