const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const user = require("../models/user");

function verifyToken(req, res, next) {
  // check if header has authorization with correct token
  // get token from header
  const { authorization } = req.headers;
  if (authorization !== undefined) {
    const bearerToken = authorization.split(" ")[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, userData) => {
      if (err) {
        res.status(403).json({ err });
      } else {
        // store user in req.user to be accessible to route
        const user = {
          _id: userData._id,
          username: userData.username,
          blog: userData.blog,
        };
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}

// display all users***
exports.user_get = [
  verifyToken,
  async (req, res) => {
    const { page } = req.query;
    const options = {
      select: "username blog",
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
        activeUser: req.user,
      });
    });
  },
];

// create user account
exports.user_post = [
  body("username", "username is required")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value) => {
      // check if a username exists in database
      const existingUser = await User.findOne({ username: value });
      if (existingUser) throw new Error("This username is not available");
      return value;
    }),
  body("password", "password is required").trim().isLength({ min: 1 }).escape(),
  body("blog", "blog type is required").trim().isLength({ min: 1 }).escape(),
  (req, res) => {
    const { username, password, blog } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }
    // if there is no error, create user in database with hashed password
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
      try {
        const user = new User({
          username,
          password: hashedPassword,
          blog,
        });
        await user.save();
        res.json({ user, message: "User Created Successfully" });
      } catch (error) {
        res.status(500).json({ error });
      }
    });
  },
];

// login user to generate token
exports.user_login = [
  body("username", "username is required").trim().isLength({ min: 1 }).escape(),
  body("password", "password is required").trim().isLength({ min: 1 }).escape(),
  async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      // check if user exists
      const user = await User.findOne({ username });
      if (!user) throw new Error("Invalid Username or password");
      // check if password matches user hashed one
      const passwordcheck = await bcrypt.compare(password, user.password);
      if (!passwordcheck) throw new Error("Invalid Username or Password");
      // generate token
      jwt.sign(
        JSON.parse(JSON.stringify(user)),
        process.env.JWT_SECRET,
        { expiresIn: 60 },
        (err, token) => {
          if (err) throw new Error("Invalid Username or password");
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      res.status(400).json({ errors: [{ msg: error.message }] });
    }
  },
];
