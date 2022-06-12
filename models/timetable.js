const mongoose = require("mongoose")

const Timetable = new mongoose.Schema(
  {
        
    email: {
      type: String,
      required: true,
    }, 
    name: {
      type: String,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    location: {
      type: String, 
      required: false,
    },
    frequency: {
      type: String,
      required: false,
    },
    additionalInfo: {
      type: String,
      required: false,
    },
    colour: {
      type: Number,
      required: true,
    }
    },
    { collection: "timetable-data" }
)

const model = mongoose.model("TimetableData", Timetable)

module.exports = model