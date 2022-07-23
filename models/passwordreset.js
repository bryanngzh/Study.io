const mongoose = require("mongoose")

const PasswordReset = new mongoose.Schema(
    {
        userId: {
            type: String
        }, 
        resetString: {
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
    { collection: "password-reset" }
)

const model = mongoose.model("PasswordReset", PasswordReset)

module.exports = model 