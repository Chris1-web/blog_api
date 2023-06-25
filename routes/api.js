const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

router.get("/", (req, res) => {
  res.json({ message: "Api home page..." });
});

// user
router.get("/user", userController.user_get);
router.post("/user", userController.user_post);
router.post("/user/login", userController.user_login);

// post
router.get("/post", postController.post_list);
router.post("/post", postController.post_post);

module.exports = router;
