const express = require('express');
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, redirectToCreate } = require('../controller/blogCtrl');
const router = express.Router();

router.get("/create_blog", redirectToCreate)
router.post("/saveBlog", createBlog);
router.post("/update", updateBlog);
router.get("/", getAllBlogs);
router.get("/getBlog/:id", getBlog);
router.delete("/deleteBlog/:id", deleteBlog);


module.exports = router;