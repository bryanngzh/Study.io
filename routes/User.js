const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const { validateToken } = require("../middlewares/AuthMiddleware")
const { sign } = require("jsonwebtoken")
const { check, validationResult } = require('express-validator');

// Models
const UserModel = require("../models/user");
const PasswordResetModel = require("../models/passwordreset")
const UserVerificationModel = require("../models/userverification")

// unique string
const {v4: uuidv4} = require("uuid")

// email handler
const nodemailer = require("nodemailer")

// nodemailer transporter
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "study.iobot@gmail.com",
        pass: "iipsuxrhdiversse"
    }
})

// testing nodemailer
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to mail out messages")
        console.log(success)
    }
})

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

// Send Verification Email
const sendVerificationEmail = ({id, email}, res) => {
    // url to be used in the mail - i think need to change when we upload to herkou
    const currentUrl = "http://localhost:3000/"

    const uniqueString = uuidv4() + id;

    // mail options
    const mailOptions = {
        from: "study.iobot@gmail.com",
        to: email,
        subject: "Verify your Email",
        html: `<p>Verify your email address to complete the signup and login into your account.</p>
               <p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${currentUrl + "verifyEmail/" + id + "/" + uniqueString}>here</a> to proceed.</p>`
    }

        // set values in userVerification collection
        const newVerification = new UserVerificationModel({
            userId: id,
            uniqueString: uniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000
        })
        newVerification
            .save()
            .then(() => {
                transporter
                    .sendMail(mailOptions)
            })
        
}

// Verify Email
router.post("/verify", async(req, res) => {
    const {userId, uniqueString} = req.body;

    UserVerificationModel
        .find( {userId: userId, uniqueString: uniqueString} )
        .then(result => {
            if (result.length > 0) {
                // user verification record exists so we proceed
                const {expiresAt} = result[0];
                // const storedUniqueString = result[0].uniqueString;

                // checking for expired unique string
                if (expiresAt < Date.now()) {
                    // record expired so we delete it
                    UserVerificationModel
                        .deleteOne({userId})    
                    UserModel
                        .find({_id: userId})
                        .then(result => {
                            if (result.isVerified === false) {
                                UserModel.deleteOne({_id: userId}).then(res.json({ error: "Link has expired. Please sign up again." }))
                            }
                        })          
                        
                } else {
                    // valid record exists so we validate the user string
                    
                    UserModel
                        .updateOne({_id: userId}, {isVerified: true})
                        .then(() => {
                            res.json("SUCCESS")
                        })
                
                }
            } else {
                res.json({ error: "Unable to verify."})
            }
        })
})


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
                const newUser = new UserModel({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    isVerified: false,
                })
                newUser.save().then((result => {
                    sendVerificationEmail(result, res);
                }))
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
    
    if (!user || !user.isVerified) { 
        res.json({ error: "User does not exist"})
    } else if (user && user.isVerified) {
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

// Password Reset Request
router.post("/requestPasswordReset", async (req, res) => {
    const { email, redirectUrl } = req.body;
    
    UserModel.find({email: email, isVerified: true}).then((data) => {
        if (data.length) {
            sendResetEmail(data[0], redirectUrl, res)
        } else {
            res.json({error: "Please enter a valid email address."})
        }
    })
})

// Send password reset email
const sendResetEmail = ({_id, email}, redirectUrl, res) => {
    const resetString = uuidv4() + _id;
    PasswordResetModel.deleteMany({ userId: _id }).then(result => {
        // Reset records deleted successfully
        // Now we send the email

        // mail options
        const mailOptions = {
            from: "study.iobot@gmail.com",
            to: email,
            subject: "Password Reset",
            html: `<p>We heard that you lost your password.</p>
                <p>Don't worry, use the link below to reset your password.</p>
                <p>This link <b>expires in 60 minutess</b>.</p><p>Press <a href=${redirectUrl + "/resetPassword" + "/" + _id + "/" + resetString}>here</a> to proceed.</p>`
        }

        // set values in password reset collection
        const newPasswordReset = new PasswordResetModel({
            userId: _id,
            resetString: resetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000
        })
        newPasswordReset
            .save()
            .then(() => {
                transporter
                    .sendMail(mailOptions)
                    .then(() => {
                        // reset email sent and password reset record saved
                        res.json("SUCCESS")
                    })
            })
    })
}

// Password Reset
router.post("/resetPassword", async (req, res) => {
    const { userId, resetString, newPassword, confirmNewPassword } = req.body;

    if (newPassword != confirmNewPassword) {
        res.json({ error: "Passwords do not match!" })
    } else if (newPassword.length < 6) {
        res.json({ error: "Please enter a valid password with at least 6 characters." })
    } else {
        const temp = validatePassword(newPassword)
        if (temp === 1) {
            res.json({ error: "Password should not contain a space" });
        } else if (temp === 3) {
            res.json({ error: "Password must contain at least 1 special character. eg: !,?,@,$" });
        } else {
                
    PasswordResetModel
    .find( {userId} )
    .then(result => {
        if (result.length > 0) {
            // password reset record exists so we proceed

            const { expiresAt } = result[0];
            // const hashedResetString = result[0].resetString

            if (expiresAt < Date.now()) {
                // expired
                PasswordResetModel
                    .deleteOne({userId})
                    .then(() => {
                        res.json({
                            status: "FAILED",
                            message: "Password reset link has expired."
                        })
                    })
            } else {
                // strings matched
                // hash password again
                const saltRounds = 10;
                bcrypt
                    .hash(newPassword, saltRounds)
                    .then(hashedNewPassword => {
                        // Update passowrd
                        UserModel
                            .updateOne({_id: userId}, {password: hashedNewPassword})
                            .then(() => {
                                // update complete, delete reset record
                                PasswordResetModel
                                    .deleteOne({userId})
                                    .then(() => {
                                        res.json("SUCCESS. Password reset complete.")
                                    })
                            })
                    })
            }
        } else {
            res.json({ error: "Unable to reset password" })
        }
    })
        }
    } 
})

// Get all reset password data
router.get('/getPasswordReset', async (req, res) => {
    PasswordResetModel.find((err, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json("Unable to show data")
        }
      });
})

// Get all verification data
router.get('/getVerification', async (req, res) => {
    UserVerificationModel.find((err, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json("Unable to show data")
        }
      });
})

module.exports = {
    router,
    validatePassword
}