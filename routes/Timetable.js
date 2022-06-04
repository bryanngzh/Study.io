const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")
const mongoose = require("mongoose")

const TimetableModel = require("../models/timetable");
const { request } = require("express");

//Initialise Timetable
router.post("/start", validateToken, async (req, res) => { 
  TimetableModel.create({
    email: req.user.email
  })
  res.json("SUCCESS")
})

//Change timetable info
router.put("/change/:id", validateToken, async (req, res) => {

  const target = req.params.id;
  const param1 = target + '.activity';
  const param2 = target + ".code";
  const param3 = target + '.location';
  const param4 = target + '.frequency';
  const param5 = target + '.nusmods';
  const param6 = target + '.color';
  const param7 = target + '.hasinput';

  await TimetableModel.updateOne(
    {email: req.user.email}
    , {
      $set: {
        [param1]: req.body.activity,
        [param2]: req.body.code,
        [param3]: req.body.location,
        [param4]: req.body.frequency,
        [param5]: req.body.nusmods,
        [param6]: req.body.color,
        [param7]: req.body.hasinput
      }
    }
  ).exec()
  
  res.json("SUCCESS")
})

//display timetable info
router.get("/info", validateToken, async (req, res) => { 
  const email = req.user.email
  TimetableModel.where({ email: email }).find((err, data) => {
    if (data) {
      data.filter()
        res.json(data)
    } else {
        res.json("Unable to show data")
    }
})
})

module.exports = router