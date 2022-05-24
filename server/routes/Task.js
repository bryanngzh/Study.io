const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware")

// Models
const TaskModel = require("../models/task")

// Display Tasks
router.post("/", validateToken, async (req, res) => {
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
    const email = req.user.email

    const user = await TaskModel.findOne({
        email: email
    })

    if (!user) {
        res.json("Unable to add data")
    } else {
        TaskModel.create({
            text: req.body.text,
            completed: req.body.completed,
            email: req.body.email,
        })
        res.json("SUCCESS")
    }
})

// Delete Task
router.post("/deleteTask", validateToken, async (req, res) => {
    const email = req.user.email

    const user = await TaskModel.findOne({
        email: email
    })

    if (!user) {
        res.json("Unable to delete data")
    } else {
        TaskModel.remove({
            text: req.body.text,
            completed: req.body.completed,
            email: req.body.email,
        })
        res.json("SUCCESS")
    }
})

// toggleComplete
router.post("/toggle", validateToken, async (req, res) => {
    const email = req.user.email

    const user = await TaskModel.findOne({
        email: email
    })

    if (!user) {
        res.json("Unable to toggle")
    } else {
        TaskModel.updateOne({
            text: req.body.text,
            completed: !req.body.completed,
            email: req.body.email,
        })
        res.json("SUCCESS")
    }
})

module.exports = router