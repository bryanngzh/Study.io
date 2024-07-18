const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")
const mongoose = require("mongoose")

// Models
const NoteFolderModel = require("../models/notefolder")

// Display notefolders
router.get("/", validateToken, async (req, res) => {
  const email = req.user.email
  NoteFolderModel.where({ email: email }).find((err, data) => {
      if (data) {
          res.json(data)
      } else {
          res.json("Unable to show data")
      }
  })
})

// Add NoteFolder
router.post("/addNoteFolder", validateToken, async (req, res) => {
  NoteFolderModel.create({
      title: req.body.title,
      email: req.user.email,
  })
  res.json("SUCCESS")
})

// Delete NoteFolder
router.post("/deleteNoteFolder", validateToken, async (req, res) => {
  try {
      await NoteFolderModel.findByIdAndRemove(req.body._id).exec()
      res.json("SUCCESS")
  } catch (error) {
      res.json("ERROR")
  }
})

module.exports = router