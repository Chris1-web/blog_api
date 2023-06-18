const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// display all users***
exports.user_get = async (req, res) => {
  const { page } = req.query;
  const options = {
    select: "username",
    page: parseInt(page, 10) || 1,
    limit: 3,
  };

  User.paginate({}, options).then((results, error) => {
    if (error) {
      res.status(500).json({ error });
    }
    // pass totalPages number along with the results
    res.status(200).json({
      users: results.docs,
      page_count: results.totalPages,
      current_page: results.page,
    });
  });
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
