const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")
const mongoose = require("mongoose")

// Models
const NusmodsModel = require("../models/nusmods")

// Display Modules
router.get("/info", validateToken, async (req, res) => {
  const email = req.user.email
  NusmodsModel.where({ email: email }).find((err, data) => {
      if (data) {
          res.json(data)
      } else {
          res.json("Unable to show data")
      }
  })
})

// Add Modules
router.post("/addModule", validateToken, async (req, res) => {
  NusmodsModel.create({
    email: req.user.email,
    moduleName: req.body.moduleName,
    class1: req.body.class1,
    class2: req.body.class2,
    class3: req.body.class3,
    class4: req.body.class4,
    class5: req.body.class5,
  })
  res.json("SUCCESS")
})


module.exports = router