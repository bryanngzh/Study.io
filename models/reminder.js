const mongoose = require("mongoose")

const Reminder = new mongoose.Schema(
    {
        remindAt: {
            type: String,
            required: true
        }, 
        reminderMsg: {
            type: String,
            required: true
        }, 
        tag: {
            type: String,
        }, 
        notes: {
            type: String,
        }, 
        isReminded: {
            type: Boolean,
            required: true,
        }, 
    },
    { collection: "reminder-data" }
)

const model = mongoose.model("ReminderData", Reminder)

module.exports = model 