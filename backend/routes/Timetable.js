const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")
const mongoose = require("mongoose")

const TimetableModel = require("../models/timetable");

//add activity to timetable
router.post("/add", validateToken, async (req, res) => { 
  TimetableModel.create({
    email: req.user.email,
    name: req.body.name,
    day: req.body.day,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    frequency: req.body.frequency,
    additionalInfo: req.body.additionalInfo,
    colour: req.body.colour,
    code: req.body.code,
    nusmods: req.body.nusmods,
  })
  res.json("SUCCESS")
})

//delete activity from timetable
router.post("/delete", validateToken, async (req, res) => {
  try {
      await TimetableModel.findByIdAndRemove(req.body._id).exec()
      res.json("SUCCESS")
  } catch (error) {
      res.json("ERROR")
  }
})

//update timetable activity
router.post("/change", validateToken, async (req, res) => {
  try {
    await TimetableModel.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      day: req.body.day,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      location: req.body.location,
      frequency: req.body.frequency,
      additionalInfo: req.body.additionalInfo,
      colour: req.body.colour,
      code: req.body.code,
    }).exec()
    res.json("SUCCESS")
  } catch (error) {
    res.json("Error")
  }
})

//change timetable activity


// //Change timetable info
// router.put("/change/:id", validateToken, async (req, res) => {

//   const target = req.params.id;
//   const param1 = target + '.activity';
//   const param2 = target + ".code";
//   const param3 = target + '.location';
//   const param4 = target + '.frequency';
//   const param5 = target + '.nusmods';
//   const param6 = target + '.color';
//   const param7 = target + '.hasinput';

//   await TimetableModel.updateOne(
//     {email: req.user.email}
//     , {
//       $set: {
//         [param1]: req.body.activity,
//         [param2]: req.body.code,
//         [param3]: req.body.location,
//         [param4]: req.body.frequency,
//         [param5]: req.body.nusmods,
//         [param6]: req.body.color,
//         [param7]: req.body.hasinput
//       }
//     }
//   ).exec()
  
//   res.json("SUCCESS")
// })

//display timetable info
router.get("/info", validateToken, async (req, res) => { 
  const email = req.user.email
  TimetableModel.where({ email: email }).find((err, data) => {
    if (data) {
        res.json(data)
    } else {
        res.json("Unable to show data")
    }
  })
})

module.exports = router