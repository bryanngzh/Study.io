const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const { validateToken } = require("../middlewares/AuthMiddleware")
const { sign } = require("jsonwebtoken")
const { check, validationResult } = require('express-validator');

// Models
const UserModel = require("../models/user");

// Register
router.post("/", [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ], async (req, res) => {
    const user = await UserModel.findOne({
        email: req.body.email
    })
    const errors = validationResult(req);
    if (req.body.password.length < 1) {
        res.json({ error: "Please enter a valid password" })
    } else if (!errors.isEmpty()) {
        res.json({ error: "Please enter a valid email address" });
    } else if (!user && req.body.username.length > 0 && req.body.password.length > 0 && req.body.email.length > 0) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            UserModel.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            })
        })
        res.json("SUCCESS")
    } else if (user) {
        res.json({ error: "User is already registered" })
    } else {
        res.json({ error: "Please enter a valid username" })
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
                res.json({ error: "Please enter a valid password" })
            } else {
                const accessToken = sign({username: user.username, 
                    email: user.email, id: user.id}, "secret")
                res.json({ token: accessToken, username: user.username, id: user.id })
            }
        })
    }
    
})

//Update User Password
router.post("/updatePassword", validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await UserModel.findOne({
            email: req.user.email
    })

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if (!match) {
            res.json({ error: "Wrong Password Entered!" });
        } else {
            bcrypt.hash(newPassword, 10).then((hash) => {
                UserModel.findByIdAndUpdate(req.user.id, {password: hash}).exec()
                res.json("SUCCESS")
            })
        }    
    })
})

//Update username
router.post("/updateUsername", validateToken, async (req, res) => {
    const { Password, newUsername } = req.body;
    const user = await UserModel.findOne({
        email: req.user.email
    })

    bcrypt.compare(Password, user.password).then(async (match) => {
        if (!match) {
            res.json({ error: "Wrong Password Entered!" });
        } else {
            UserModel.findByIdAndUpdate(req.user.id, {username: newUsername}).exec()
            res.json("SUCCESS")
        }   
    })
})

//auth state
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = router