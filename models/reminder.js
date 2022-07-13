const mongoose = require("mongoose")

const Reminder = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true
        }, 
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },  
        event: {
            type: String,
            required: true
        }, 
        tags: {
            type: String,
        }, 
        notes: {
            type: String,
        }, 
        isExpired: {
            type: Boolean,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },  
    },
    { collection: "reminder-data" }
)

const model = mongoose.model("ReminderData", Reminder)

module.exports = model 