const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")
const mongoose = require("mongoose")

// Models
const NoteDescriptionModel = require("../models/notedescription")

// Display noteDescriptions
router.get("/", validateToken, async (req, res) => {
  const email = req.user.email
  NoteDescriptionModel.where({ email: email }).find((err, data) => {
      if (data) {
          res.json(data)
      } else {
          res.json("Unable to show data")
      }
  })
})

// Add NoteDescription
router.post("/addNoteDescription", validateToken, async (req, res) => {
  NoteDescriptionModel.create({
    folder: req.body.folder,
    email: req.user.email,
    week: req.body.week,
    note: req.body.note,
    unit: req.body.unit,
    type: "doc",
    content: [
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Type here..."
          }
        ]
      }
    ]
  })
  res.json("SUCCESS")
})

// Delete NoteDescription
router.post("/deleteNoteDescription", validateToken, async (req, res) => {
  try {
      await NoteDescriptionModel.findByIdAndRemove(req.body._id).exec()
      res.json("SUCCESS")
  } catch (error) {
      res.json("ERROR")
  }
})

//edit NoteDescription
router.post("/editNoteDescription", validateToken, async (req, res) => {
  try {
      await NoteDescriptionModel.findByIdAndUpdate(req.body._id, {
        week: req.body.week,
        note: req.body.note,
        unit: req.body.unit,
    }).exec()
      res.json("SUCCESS")
  } catch (error) {
      res.json("ERROR")
  }
})

//getSpecificNote
router.get("/:id", validateToken, async (req, res) => {
  const ans = await NoteDescriptionModel.findById(req.params.id);
  if (ans !== null) {
    res.json(ans);
  } else {
    res.json("ERROR");
  }
})

//edit the note 
router.post("/editNote", validateToken, async (req, res) => {
  try {
      await NoteDescriptionModel.findByIdAndUpdate(req.body.id, {
        content: req.body.content
    }).exec()
      res.json("SUCCESS")
  } catch (error) {
      res.json("ERROR")
  }
})

module.exports = router