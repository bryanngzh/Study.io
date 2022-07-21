const mongoose = require("mongoose")

const Notedescription = new mongoose.Schema(
    {
        folder: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true,
        }, 
        week: {
          type: String,
          required: false,
        },
        note: {
          type: String,
          required: false,
        },
        unit: {
          type: String,
          required: false,
        },
        type: {
          type: String,
          required: true,
        },
        content: {
          type: Array,
          required: true,
        },
        htmlContent: {
          type: String,
          required: false,
      },
        
        
    },
    { collection: "notedescription-data" }
)

const model = mongoose.model("NoteDescriptionData", Notedescription)

module.exports = model 