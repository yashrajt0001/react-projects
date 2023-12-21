const express = require('express');
const User = require('../model/User');
const router = express.Router()
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'yashraj85599'
const fetchuser = require('../middleware/fetchuser');

//Route 1: create new user endpoint

router.post('/createuser', [
    body('password', 'password invalid').isLength({ min: 3 }),
    body('name', 'name invalid').isLength({ min: 2 }),
    body('email', 'email invalid').isEmail()
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success, error: "email already exist" });
    }

    const salt = await bcrypt.genSalt(10)
    const encryptPass = await bcrypt.hash(req.body.password, salt)

    user = User.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptPass,
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success = true
    res.json({success, authToken})

  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured")
  }
})

//Route 2: login endpoint

router.post('/login', [
  body('email', 'email invalid').isEmail(),
  body('password', 'Password cant be blank').exists()
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body
  
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success, error: "email incorrect"})
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(400).json({ success, error: "password incorrect" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true
    res.json({ success, authToken })
  }

  catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
})

// route 3: get the user data

router.post("/getuser", fetchuser, async(req, res) => {
  const userId = req.user.id
  const userData = await User.findById(userId).select('-password')
  res.json(userData)
})


module.exports = router
 