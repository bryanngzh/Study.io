const mongoose = require("mongoose")

const Notefolder = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true,
      }, 
    },
    { collection: "notefolder-data" }
)

const model = mongoose.model("NotefolderData", Notefolder)

module.exports = model 