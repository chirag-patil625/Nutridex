const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const{body, validationResult} = require('express-validator');

const User = require('../model/User');
const { findOne } = require('../model/Card');
const JWT_SECRET = 'nutridex';

const validateSignup = [
    body('fullName').isLength({ min: 3 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 })
];

const validateLogin = [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
];

router.post('/signup', validateSignup, async (req, res)=>{
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            console.log(errors);
            return res.status(400).json({
                errors: errors.array(),
                message : 'Validation Error'
            });
        }

        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();

        const token = jwt.sign({user: user._id}, JWT_SECRET);
        res.status(201).json({
            token,
            user:{
                fullName: user.fullName,
                email: user.email
            }
        });
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({
            message: 'Server error during signup'
        });
    }
})

router.post('/login', validateLogin, async (req, res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message : 'Validation Error'
            })
        }

        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign({user: user._id}, JWT_SECRET);
        res.status(200).json({
            token,
            user:{
                fullName: user.fullName,
                email: user.email
            }
        });

    }catch(err){
        console.error(err.message);
        res.status(500).json({
            message: 'Server error during login'
        });
    }
});

module.exports = router;