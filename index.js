// Imports
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

// MongoDB
mongoose.connect("mongodb+srv://bryan:bryan@cluster0.fmdfb.mongodb.net/studyio?retryWrites=true&w=majority") 

// Middleware
app.use(express.json()) // to allow json change to parse for API calls
app.use(cors()); // to connect FE to BE

// Models
const UserModel = require("./models/user")

var path = require('path')

// Routes
const userRoute = require("./routes/User")
app.use("/api/auth", userRoute)
const taskRoute = require("./routes/Task")
app.use("/api/task", taskRoute)
const timetableRoute = require("./routes/Timetable")
app.use("/api/timetable", timetableRoute)
const nusmodsRoute = require("./routes/Nusmods")
app.use("/api/nusmods", nusmodsRoute)
const notefolderRoute = require("./routes/Notefolder")
app.use("/api/notefolder", notefolderRoute)
const notedescriptionRoute = require("./routes/Notedescription")
app.use("/api/notedescription", notedescriptionRoute)

// Production
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
   }

const port = process.env.PORT || '3001'

//Needs this at the start, BE server runs on port 3001, then FE runs on 3000
app.listen(port, () => {
    console.log("SERVER RUNNING");
});