const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")
const mongoose = require("mongoose")

// Models
const ReminderModel = require("../models/reminder")

// Display Reminders
router.get("/", validateToken, async (req, res) => {
    const email = req.user.email
    ReminderModel.where({ email: email }).find((err, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json("Unable to show data")
        }
    })
})

// Add Reminder
router.post("/addReminder", validateToken, async (req, res) => {
    ReminderModel.create({
        remindAt: req.body.remindAt,
        reminderMsg: req.body.reminderMsg,
        tag: req.body.tag,
        notes: req.body.notes,
        isReminded: req.body.isReminded,
        email: req.user.email,
    })
    res.json("SUCCESS")
})

// Delete Reminder
router.post("/deleteTask", validateToken, async (req, res) => {
    try {
        await ReminderModel.findByIdAndRemove(req.body._id).exec()
        res.json("SUCCESS")
    } catch (error) {
        res.json("ERROR")
    }
})

module.exports = router