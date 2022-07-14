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
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        event: req.body.event,
        tags: req.body.tags,
        notes: req.body.notes,
        isExpired: req.body.isExpired,
        email: req.user.email,
    })
    res.json("SUCCESS")
})

// Delete Reminder
router.post("/deleteReminder", validateToken, async (req, res) => {
    try {
        await ReminderModel.findByIdAndRemove(req.body._id).exec()
        res.json("SUCCESS")
    } catch (error) {
        res.json("ERROR")
    }
})

module.exports = router