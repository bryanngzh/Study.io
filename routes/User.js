const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const { validateToken } = require("../middlewares/AuthMiddleware")
const { sign } = require("jsonwebtoken")
const { check, validationResult } = require('express-validator');

// Models
const UserModel = require("../models/user");


//custom function to check if password is good 
const validatePassword = (password) => {
    var haveSpecialCharacter = false;
    var containsSpace = false;
    for (var i = 0; i < password.length; i++) {
        let code = password.charCodeAt(i);
        if (code === 32) {
            containsSpace = true;
        }
        if ((code >= 33 && code <= 47) || (code >= 58 && code <= 64)
            || (code >= 91 && code <= 96) || (code >= 123 && code <= 126)) {
            haveSpecialCharacter = true;
        }
    }  
    if (containsSpace) {
        return 1;
    } else if (haveSpecialCharacter) {
        return 2;
    } else {
        return 3;
    }
}

// Register
router.post("/", [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ], async (req, res) => {
    const user = await UserModel.findOne({
        email: req.body.email
    })
    const errors = validationResult(req);
    if (req.body.username.length <= 0 || req.body.password.length <= 0
        || req.body.email.length <= 0 || req.body.confirmPassword.length <= 0) {
            res.json({ error: "Please fill in all fields in the form." })
    } else if (req.body.password !== req.body.confirmPassword) {
        res.json({ error: "Passwords do not match!" })
    } else if (req.body.password.length < 6) {
        res.json({ error: "Please enter a valid password with at least 6 characters." })
    } else if (!errors.isEmpty()) {
        res.json({ error: "Please enter a valid email address." });
    } else if (!user && req.body.username.length > 0 && req.body.password.length > 0 && req.body.email.length > 0) {
        const temp = validatePassword(req.body.password)
        if (temp === 1) {
            res.json({ error: "Password should not contain a space" });
        } else if (temp === 3) {
            res.json({ error: "Password must contain at least 1 special character. eg: !,?,@,$" });
        } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                UserModel.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                })
            })
            res.json("SUCCESS")
        }
    } else if (user) {
        res.json({ error: "User is already registered" })
    } else if (req.body.username.length === 0) {
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
            const temp = validatePassword(newPassword);
            if (temp === 1) {
                res.json({ error: "Password should not contain a space" });
            } else if (temp === 3) {
                res.json({ error: "Password must contain at least 1 special character. eg: !,?,@,$" });
            } else {
                bcrypt.hash(newPassword, 10).then((hash) => {
                    UserModel.findByIdAndUpdate(req.user.id, {password: hash}).exec()
                    res.json("SUCCESS")
                })
            }
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

//update profile picture
router.post("/updatePicture", validateToken, async (req, res) => {
    UserModel.findByIdAndUpdate(req.user.id, {image: req.body.image}).exec()
    res.json("SUCCESS")  
})

//get profile picture
router.get("/getPicture", validateToken, async (req, res) => {
    const user = await UserModel.findOne({
        email: req.user.email
    })
    res.json(user.image)  
})

//get token_id
router.get('/token', validateToken, async (req, res) => {
    const user = await UserModel.findOne({
        email: req.user.email
    })
    res.json(user._id);
})

//auth state
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = {
    router,
    validatePassword
}