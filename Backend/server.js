const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT;
const DB_URI =process.env.DB_URI


console.log(require('./model/userModel'));

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user_router = require("./routes/user");
const cors = require('cors')
app.use(cors())
mongoose.connect(DB_URI);
const DataBase = mongoose.connection;
DataBase.on("err", (err) => console.log(err.message))
DataBase.once("open", () => console.log('CONNECTED TO DATABSE :)'));
app.use('/api/user' , user_router)
app.listen(PORT , () => console.log('SERVER IS RUNING ON PORT',PORT))
