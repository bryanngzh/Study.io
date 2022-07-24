const mongoose = require("mongoose")

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true,
            unique: true
        }, 
        password: {
            type: String,
            required: true
        }, 
        image: {
            type: String, 
            required: false,
            default: "https://i.postimg.cc/Kjqfbv2m/Screenshot-2022-05-28-at-5-59-42-PM.png"
        },
        isVerified: {
            type: Boolean,
            required: true
        },
    },
    { collection: "user-data" }
)

const model = mongoose.model("UserData", User)

module.exports = model 