const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.user_get = (req, res) => {
  res.json({ message: "User List gotten successfully!..." });
};

exports.user_post = [
  body("username", "username is required").trim().isLength({ min: 1 }).escape(),
  body("password", "password is required").trim().isLength({ min: 1 }).escape(),
  (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }
    // if there is no error, create user in database and
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
      try {
        const user = new User({
          username,
          password: hashedPassword,
        });
        await user.save();
        res.json({ user, message: "User Created Successfully" });
      } catch (error) {
        res.status(500).json({ error });
      }
    });
  },
];
