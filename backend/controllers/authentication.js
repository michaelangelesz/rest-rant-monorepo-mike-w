const router = require("express").Router()
const db = require("../models")
const bcrypt = require("bcrypt")

const { User } = db

router.post("/", async (req, res) => {
    // find user by email
    let user = await User.findOne({
    where: { email: req.body.email },
  })

// check the user's password using bcrypt
  if (
    !user ||
    !(await bcrypt.compare(req.body.password, user.passwordDigest))
  ) {
    res.status(404).json({
      message: `Could not find a user with the provided username and password`,
    })
  } else {
    res.json({ user })
  }
  // console.log(user)
  // console.log('IN HERE')
})

module.exports = router
