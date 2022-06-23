const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")
const mongoose = require("mongoose")

// Models
const NoteModel = require("../models/note")

// Display note
router.get("/", validateToken, async (req, res) => {
  const email = req.user.email
  NoteModel.where({ email: email }).find((err, data) => {
      if (data) {
          res.json(data)
      } else {
          res.json("Unable to show data")
      }
  })
})

// Add Note
router.post("/addNote", validateToken, async (req, res) => {
  NoteModel.create({
    _id: req.body._id,
    email: req.user.email,
    type: req.body.type,
    content: req.body.content
  })
  res.json("SUCCESS")
})

// Delete NoteFolder
router.post("/deleteNote", validateToken, async (req, res) => {
  try {
      await NoteModel.findByIdAndRemove(req.body._id).exec()
      res.json("SUCCESS")
  } catch (error) {
      res.json("ERROR")
  }
})

module.exports = router