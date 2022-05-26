const mongoose = require("mongoose")

const Task = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        }, 
        completed: {
            type: Boolean,
            default: false,
            required: true
        }, 
        email: {
            type: String,
            required: true,
        }, 
    },
    { collection: "task-data" }
)

const model = mongoose.model("TaskData", Task)

module.exports = model 