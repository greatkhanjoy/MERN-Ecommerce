import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import { generateToken } from '../utill/jwt.js'

//@desc Auth User & Get Token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('Invalid credentials')
  }
  const isMatch = await user.comparePassword(password)
  if (user && isMatch) {
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//@desc Get user profile
//@route Get /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }
  return res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
})
//@desc Register new user
//@route POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (!email || !password || !name || !confirmPassword) {
    res.status(400)
    throw new Error('Please fill out all fields')
  }

  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  if (password !== confirmPassword) {
    res.status(400)
    throw new Error('Passwords do not match')
  }

  const user = await User.create(req.body)
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
})

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }
  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  if (req.body.password) {
    if (
      req.body.confirmPassword &&
      req.body.password == req.body.confirmPassword
    ) {
      user.password = req.body.password
    } else {
      res.status(400)
      throw new Error('Passwords do not match')
    }
  }
  await user.save()

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
})

export { authUser, getUserProfile, registerUser, updateUser }
