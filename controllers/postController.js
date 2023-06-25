const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const verifyToken = require("../verifyToken");

exports.post_list = [
  verifyToken,
  async (req, res) => {
    const { page } = req.query;
    const options = {
      populate: {
        path: "author",
        select: "username blog",
      },
      page: parseInt(page, 10) || 1,
      limit: 3,
    };
    Post.paginate({}, options).then((results, error) => {
      if (error) {
        res.status(500).json({ error });
      }
      // pass totalPages number along with the results
      res.status(200).json({
        posts: results.docs,
        page_count: results.totalPages,
        current_page: results.page,
        activeUser: req.user,
      });
    });
  },
];

exports.post_post = [
  verifyToken,
  body("title", "title is requires").trim().isLength({ min: 3 }).escape(),
  body("description", "description is required")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("published", "published is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res) => {
    const { title, description, published } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    // if there are no errors, create new post in the database
    try {
      const post = new Post({
        title,
        description,
        date: Date.now(),
        author: req.user,
        published,
      });
      await post.save();
      res.json({ post, message: "Post created successfully" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
];
