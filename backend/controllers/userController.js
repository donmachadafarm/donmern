const jwt = require('jsonwebtoken') // webtoken
const bcrypt = require('bcryptjs') // encryp
const asyncHandler = require('express-async-handler') // async
const User = require('../models/userModel')

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body

    // check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Register users
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields!')
    }

    // find one using email
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exist!')
    }

    // hash pw
    const salt = await bcrypt.genSalt(10)
    const hashedPw = await bcrypt.hash(password,salt)

    // create the user
    const user = await User.create({
        name, 
        email,
        password: hashedPw
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req,res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name: name,
        email: email
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '30d',})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}