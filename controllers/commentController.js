const { validationResult, body } = require("express-validator");
const Comment = require("../models/comment");

exports.comment_post = [
  body("text", "comment text is required").trim().isLength({ min: 1 }).escape(),
  (req, res) => {
    const { text } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    // const comment = new Comment({
    //   text,
    // });
  },
];
