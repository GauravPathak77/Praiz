const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Product = require('../controller/productCtrl');

const authMiddleware = asyncHandler(async (req,res, next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                // console.log(user);
                req.user = user;
                res.json(user);
                next();
                // console.log(decoded);
            }
        }catch(error){
            throw new Error("Not Authorized token or expired, Please Login again");
        }
    }else{
        // throw new Error("There is no token attached to header");
        res.redirect('/myacc');
    }
});

const isAdmin = asyncHandler(async (req,res, next)=>{
    // const { email } = req.user;
    const token = req.cookies?.refreshToken;
    const adminUser = await User.findOne({ 'refreshToken': token });
    try{
        if(adminUser.role !== "admin"){
            throw new Error("You are not an admin");
        }else{
            next();
        }
    } catch (error) {
        res.redirect('/');
    }
});

module.exports = { authMiddleware, isAdmin };