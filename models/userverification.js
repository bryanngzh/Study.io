const mongoose = require("mongoose")

const UserVerification = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        }, 
        uniqueString: {
            type: String,
            required: true,
            unique: true
        }, 
        createdAt: {
            type: Date,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
        },  
    },
    { collection: "user-verification" }
)

const model = mongoose.model("UserVerification", UserVerification)

module.exports = model 