const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
    {
        id : String,
        name : String,
        email : String,
        date : String,
        age : Number
    }
)
const userModel = mongoose.model('User' , userSchema)
module.exports = userModel