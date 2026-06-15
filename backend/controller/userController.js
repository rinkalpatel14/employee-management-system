//import model
const USER = require("../model/userModel");

//bcrypt password
const bcrypt = require("bcrypt");

//import jwt
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
  try {

    const data = req.body

    //validation
    if (!data.name || !data.email || !data.password) {
      return res.status(400).json({
        status: 'Fail',
        message: 'All fields required'
      })
    }

    //check existing user
    const existUser = await USER.findOne({ email: data.email })

    //profile image
    if (req.file) {
      data.profileImage = req.file.filename
    }

    if (existUser) {
      return res.status(400).json({
        status: 'Fail',
        message: 'User Already exists'
      })
    }

    //hash password
    data.password = await bcrypt.hash(data.password, 10)

    //create User
    const createUser = await USER.create(data)

    createUser.password = undefined;

    return res.status(201).json({
      status: 'Success',
      message: "User registered successfully",
      data: createUser
    })

  } catch (error) {

    return res.status(500).json({
      status: 'Fail',
      message: error.message
    })

  }
}

//login api
exports.loginUser = async (req, res) => {

  try {

    const { email, password } = req.body

    //validation 
    if (!email || !password) {
      return res.status(400).json({
        status: 'Fail',
        message: "Email and Password are required"
      })
    }

    //check user
    const user = await USER.findOne({ email })

    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: 'User not found'
      })
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Invalid Password'
      })
    }

    //generate token
    const token = jwt.sign({ id: user._id, role: user.role }, 'aabbcc')

    //hide password
    user.password = undefined

    return res.status(200).json({
      status: 'Success',
      message: 'Login Successfully',
      token: token,
      data: user
    })

  } catch (error) {

    return res.status(500).json({
      status: 'Fail',
      message: error.message
    })

  }
}

//profile api
exports.profile = async (req, res) => {
  try {
    return res.status(200).json({
      status: 'Success',
      message: 'Profile Fetch Successfully',
      data: req.user

    })
  } catch (error) {
    return res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

//getEmployeeUsers
exports.getEmployeeUsers = async (req, res) => {
  try {

    const employeeUsers = await USER.find({role : "employee"}).select("-password") //password remove

    return res.status(200).json({
      status: 'Success',
      message: 'Data Fetch Successfully',
      total : employeeUsers.length,
      data : employeeUsers
    })

  } catch (error) {

    return res.status(400).json({
      status: 'Fail',
      message: error.message
    })

  }
}