const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

router.get("/", (req, res) => {
  res.json({ message: "Api home page..." });
});

// user
router.get("/user", userController.user_get);
router.post("/user", userController.user_post);
router.post("/user/login", userController.user_login);
router.get("/user/:userid", userController.user_detail);

// post
router.get("/post", postController.post_list);
router.post("/post", postController.post_post);
router.get("/post/:postid", postController.post_detail);

// comment
router.post("/post/:postid/comment", commentController.comment_post);
router.get("/post/:postid/comment", commentController.comment_list);

module.exports = router;
