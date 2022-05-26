const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")
const mongoose = require("mongoose")

// Models
const TaskModel = require("../models/task")

// Display Tasks
router.get("/", validateToken, async (req, res) => {
    const email = req.user.email
    TaskModel.where({ email: email }).find((err, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json("Unable to show data")
        }
    })
})

// Add Task
router.post("/addTask", validateToken, async (req, res) => {
    TaskModel.create({
        text: req.body.text,
        completed: req.body.completed,
        email: req.user.email,
    })
    res.json("SUCCESS")
})

// Delete Task
router.post("/deleteTask", validateToken, async (req, res) => {
    try {
        await TaskModel.findByIdAndRemove(req.body._id).exec()
        res.json("SUCCESS")
    } catch (error) {
        res.json("ERROR")
    }
})

// toggleComplete
router.post("/toggle", validateToken, async (req, res) => {
    
    TaskModel.findByIdAndUpdate(req.body._id, {
        completed: !req.body.completed
    }).exec()
    res.json("SUCCESS")
})

module.exports = router