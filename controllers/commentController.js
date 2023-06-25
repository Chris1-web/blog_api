const { validationResult, body } = require("express-validator");
const verifyToken = require("../verifyToken");
const Comment = require("../models/comment");
const Post = require("../models/post");

exports.comment_post = [
  verifyToken,
  body("text", "comment text is required").trim().isLength({ min: 1 }).escape(),
  async (req, res) => {
    const { postid } = req.params;
    const { text } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const post = await Post.findById(postid);
      //  check if post exist in database
      //  create comment in database
      const comment = new Comment({
        post: postid,
        author: req.user,
        text,
      });
      await comment.save();
      res.status(200).json({ comment });
    } catch (error) {
      res.status(500).json({ error: { message: "Error getting post" } });
    }
  },
];
