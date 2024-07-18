const mongoose = require("mongoose")

const Nusmods = new mongoose.Schema(
    {
        email: {
          type: String,
          required: true,
        }, 
        moduleName: {
            type: String,
            required: true
        }, 
        class1: {
            type: String,
            required: false
        }, 
        class2: {
          type: String,
          required: false
        }, 
        class3: {
          type: String,
          required: false
        }, 
        class4: {
          type: String,
          required: false
        }, 
        class5: {
          type: String,
          required: false
        }, 
        
    },
    { collection: "nusmods-data" }
)

const model = mongoose.model("NusModsData", Nusmods)

module.exports = model 