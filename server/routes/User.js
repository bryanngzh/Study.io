const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const { sign } = require("jsonwebtoken")

// Models
const UserModel = require("../models/user")

// Register
router.post("/", async (req, res) => {
    const user = await UserModel.findOne({
        email: req.body.email
    })

    if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            UserModel.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            })
        })
        res.json("SUCCESS")
    } else {
        res.json("Email address is already in use")
    }
    
})

// Login
router.post("/login", async (req, res) => {
    const user = await UserModel.findOne({ 
        email: req.body.email, 
    }) 
    
    if (!user) { 
        res.json({ error: "User does not exist"})
    } else {
        bcrypt.compare(req.body.password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Username and Password Combination" })
            } else {
                const accessToken = sign({username: user.username, 
                    email: user.email, id: user.id}, "secret")
                res.json(accessToken)
            }
        })
    }
    
})

module.exports = router