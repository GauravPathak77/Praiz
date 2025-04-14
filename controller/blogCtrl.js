const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asynchandler = require('express-async-handler');

const redirectToCreate = asynchandler(async(req, res) => {
    res.render('createBlog');
});

const createBlog = asynchandler(async(req, res) => {
    try{
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    } catch (error){
        throw new Error(error);
    }
});

const updateBlog = asynchandler(async(req, res) => {
    // const { id } = req.params;
    const id = "6606aee0c4cf332eeb33c99d";
    try{
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBlog);
    } catch (error){
        throw new Error(error);
    }
});

const getBlog = asynchandler(async(req, res) => {
    const { id } = req.params;
    try{
        const getBlog = await Blog.findById(id);
        const token = req.cookies.refreshToken;
        let user = " ";
        if(token){
            user = await User.findOne({ 'refreshToken': token});
        }
        //console.log("User: " + user);
        const updatedViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: {numViews: 1},
            },
            { new: true }
        );
        // res.json(updatedViews);
        res.render('singleBlog', {user: user, blog: getBlog})
    } catch (error){
        throw new Error(error);
    }
});

const getAllBlogs = asynchandler(async(req,res) => {
    try{
        const getBlogs = await Blog.find();
        const token = req.cookies.refreshToken;
        let user = " ";
        if(token){
            user = await User.findOne({ 'refreshToken': token});
        }
        //console.log("User: " + user);
        // res.json(getBlogs);
        res.render('blogPage', {user: user, Blogs: getBlogs});
    } catch (error){
        throw new Error(error);
    }
    // res.render('blogPage', {user: ''});
});

const deleteBlog = asynchandler(async(req, res) => {
    const { id } = req.params;
    // const id = "6606aee0c4cf332eeb33c99d";
    try{
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json(deletedBlog);
    } catch (error){
        throw new Error(error);
    }
});

module.exports = { redirectToCreate, createBlog, updateBlog ,getBlog, getAllBlogs, deleteBlog };