const mongoose = require("mongoose")

const Note = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true,
        },
        type: {
          type: String,
          required: true,
        },
        content: {
          type: Array,
          required: true,
        },
    },
    { collection: "note-data" } 
)

const model = mongoose.model("NoteData", Note)

module.exports = model 