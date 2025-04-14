const express = require('express');
const app = express();

require('dotenv').config();
const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const AllOrder = require("../models/allOrderModel");
const Email = require('../models/emailModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const uniqid = require('uniqid');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Create a User
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    try {
        if(!findUser){
            const newUser = await User.create(req.body);
            console.log(newUser);
            const refreshToken = await generateRefreshToken(newUser?._id);
            const updateduser = await User.findByIdAndUpdate(
                newUser._id,
                {
                    refreshToken: refreshToken,
                },
                { new: true }
            );
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 72*60*60*1000,
            });
            // visitHome(req,res);
            res.redirect('/');
        } else{
            res.render('error' , {user: " ", error_msg: `User already exists with email: ${email} and mobile number: ${findUser.mobile}`});
        }
    } catch (error) {
        let message = 'An unexpected error occurred. Please try again.';
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const value = Object.values(error.keyValue)[0].toString();            
            message = `The ${field} "${value}" is already in use. Please choose a different ${field}.`;
          }
        res.render('error' , {user: " ", error_msg: `${message}`});
    }
});


// Login a User
const loginUserCtrl = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    console.log("User: ", email, password);
    // check if user exists or not
    const findUser = await User.findOne({ email });
    console.log("FindUser: ", findUser);
    // if(findUser && (await findUser.isPasswordMatched(password) || findUser.password === password)){
        if(findUser && findUser.password === password){
        const refreshToken = await generateRefreshToken(findUser?._id);
    console.log("Token: ", refreshToken);

        const updateduser = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000,
        });

        const user = {
            id : findUser?.id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?.id),
        };
        console.log(user);

        const product = await Product.find();

        // res.render('index', {user: user, Products: product});
        res.redirect('/');
        // res.json(user);
    }else{
        res.redirect("/myacc");
    }
});

// Login a User through phone number
const loginUserMobCtrl = asyncHandler(async (req,res) => {
    const {mobile, password} = req.body;
    console.log("User: ", mobile, password);
    // check if user exists or not
    const findUser = await User.findOne({ mobile });
    console.log("FindUser: ", findUser);
    // if(findUser && (await findUser.isPasswordMatched(password) || findUser.password === password)){
        if(findUser && findUser.password === password){
        const refreshToken = await generateRefreshToken(findUser?._id);
    console.log("Token: ", refreshToken);

        const updateduser = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000,
        });

        const user = {
            id : findUser?.id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?.id),
        };
        console.log(user);

        const product = await Product.find();

        // res.render('index', {user: user, Products: product});
        res.redirect('/');
        // res.json(user);
    }else{
        res.redirect("/myacc");
    }
});


const visitHome = asyncHandler( async(req,res) => {
    const token = req.cookies?.refreshToken;
    const user = await User.findOne({ 'refreshToken': token });
    const product = await Product.find();
    if(user){
        res.render('index', {user: user, Products: product});
    } else {
        res.render('index', {user: " ", Products: product});
    }
});

// Admin Login
const loginAdmin = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if(findAdmin.role !== 'admin') throw new Error("Not Authorised");
    if(findAdmin && await findAdmin.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateduser = await User.findByIdAndUpdate(
            findAdmin.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000,
        });

        const user = {
            id : findAdmin?.id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?.id),
        };
        console.log(user);
        res.json(user);
        // res.render('admin');
    }else{
        res.render('error' , {error_msg: "Invalid Credentials"});
    }
});

//  handle refresh token
const handleRefrehToken = asyncHandler(async (req,res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if(!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken);
    const user = await User.findOne({ refreshToken });
    if(!user) throw new Error("No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err || user.id !== decoded.id){
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});


// logout
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    const product = await Product.find();
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
    //   return res.sendStatus(204); // forbidden
    res.render('index', {user: " ", Products: product});
    }
    await User.findOneAndUpdate({ refreshToken: refreshToken }, {
      refreshToken: "",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    // res.sendStatus(204); // forbidden

    res.render('index', {user: " ", Products: product});
  });


// Forgot Password
const forgotPass = asyncHandler(async (req,res)=>{
    // const token = req.cookies?.refreshToken;
    const product = await Product.find();
    // if(token){
        // const user = await User.findOne({ 'refreshToken': token });
    res.render('forgotPassword', {user: ""});
    // } else {
    //     res.render('index', {user: user, Products: product});
    // }
});


const getRegOTP = asyncHandler(async(req, res) => {
    const otp = req.body.otp;
    // Replace with recipient's number
    const number = String(req.body.mobile);

        // Custom message
    const message = `Your One Time Password is: ${otp}. Greetings from PRAIZ`;
    // Create SMS data
    const smsdata = {
        sender_id: "FSTSMS",
        message: message,
        langauage: "english",
        route: "p",
        // p is for regular message charge 0.23INR && q is for quick sms charge 3.5INR
        numbers: number,
    };

// send SMS
axios.post("https://www.fast2sms.com/dev/bulkV2", smsdata, {
    headers: { 
        Authorization: process.env.Fast2smsAPI,
    },
})
.then((result) => {
    console.log(result);
    console.log("SMS Sent Success", result.data);
    res.json(result.data);
})
.catch((err) => {
console.log("Error", err); 
res.json(err);
});
});

const getOTP = asyncHandler(async(req, res) => {
    const otp = req.body.otp;
    // Replace with recipient's number
    const number = String(req.body.mobile);

    const user = await User.findOne({ 'mobile': number });

    if(user){
        // Custom message
    const message = `Your One Time Password is: ${otp}. Greetings from PRAIZ`;
    // Create SMS data
    const smsdata = {
        sender_id: "FSTSMS",
        message: message,
        langauage: "english",
        route: "p",
        // p is for regular message charge 0.23INR && q is for quick sms charge 3.5INR
        numbers: number,
    };

// send SMS
axios.post("https://www.fast2sms.com/dev/bulkV2", smsdata, {
    headers: { 
        Authorization: process.env.Fast2smsAPI,
    },
})
.then((result) => {
    console.log(result);
    console.log("SMS Sent Success", result.data);
    res.json(result.data);
})
.catch((err) => {
console.log("Error", err); 
res.json(err);
});
    } else {
        res.json("Wrong number");
    } 
});

// Get Updated user
const getUpdatedUser = asyncHandler(async (req,res)=>{
    const mobile = req.body.mobile;
    const user = await User.findOne({ 'mobile': mobile });
    // validateMongoDbId(_id);
    if(user){
    res.json(user);
    }
    else{
        res.json("Wrong Number!");
    }
});

// Get New Password
const getNewPass = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ '_id': id });
    res.render('updateUser', {user: user});
});

// Set New Password
const setNewPass = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const pass = req.body.pass[0];
    console.log("Password: ", pass);
    const product = await Product.find();
    try{
        const user = await User.findByIdAndUpdate(id, {
            password: pass
        },
        {
            new: true
        }
    );
    const u2 = await User.findOne({ '_id': id});
    console.log(u2);
    res.render('index', {user: user, Products: product});
    }
    catch(error){
        throw new Error(error);
    }
});

// Update a user
const updateaUser = asyncHandler(async (req,res)=>{
    const mobile = req.body.mobile;
    const user = await User.findOne({ 'mobile': mobile });
    const _id = user._id;
    console.log("user: ", user);
    // validateMongoDbId(_id);
    try{
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },
        {
            new: true,
        }
        );
        res.render('myAccount', {user: user});
    }catch(error){
        throw new Error(error);
    }
    res.json(user);
});


// save user address
const saveAddress = asyncHandler(async (req,res) => {
    const { id } = req.params;
    const user = await User.findOne({ '_id': id });
    console.log("Address: ", req?.body);
    try{
        if(user){
            const updatedUser = await User.findByIdAndUpdate(id, {
                $push: {address: req?.body} 
            }, 
            { new: true },
            );
            res.json(updatedUser);
        } else {
            res.status(404).json({ 'message': 'User not found' });
        }
    }catch(error){
        console.error(error); // Log the error for debugging
        res.status(500).json({ 'message': 'Internal server error' }); // Send a generic error response
    }
});

// Update Profile
const updateProfile = asyncHandler(async(req,res) => {
    try{
        const token = req?.cookies?.refreshToken;
        const field = req.body.field;
        const data = req.body.data;
        console.log("Field: ", field, ", Data: ", data);

        const user = await User.findOne({'refreshToken': token});

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { [field]: data }, // Using object property shorthand to set the field dynamically
            { new: true } // Return the updated document after the update
        );
        console.log(updatedUser);
        res.redirect('/viewAccount');
        // res.render('myAccount', {user: user, Products: ""});
        // res.json(updatedUser);
        res.render()
    } catch(error){
        res.json(error);
    }
});


// Get all users

const getallUser = asyncHandler(async(req,res) => {
    try{
        const getUsers = await User.find();
        res.json(getUsers);
    }catch(error){
        console.error(error); // Log the error for debugging
        res.status(500).json({ 'message': 'Internal server error' }); // Send a generic error response
    }
});

// Get a single user

const getaUser = asyncHandler(async(req,res)=>{
    console.log(req.params);
    const { id } = req.params;
    validateMongoDbId(id);
    try{
        const getUser = await User.findById(id);
        res.json({
            getUser,
        });
    }
    catch(error){
        throw new Error(error);
    }
});


// Delete a user

const deleteaUser = asyncHandler(async(req,res)=>{
    console.log(req.params);
    const { id } = req.params;
    validateMongoDbId(id);
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({
            deleteUser,
        });
    }
    catch(error){
        throw new Error(error);
    }
});

// Block user
const blockUser = asyncHandler(async (req,res)=>{
    // const { id } = req.params;
    const { id } = req.body;
    // validateMongoDbId(id);
    try{
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User Blocked"
        });
    }catch(error){
        throw new Error(error);
    }
});

// Unblock user
const unblockUser = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    validateMongoDbId(id);
    try{
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User unblocked"
        });
    }catch(error){
        throw new Error(error);
    }
});

const getWishlist = asyncHandler(async (req,res) => {
    // const { _id } = req.user;
    const token = req.cookies?.refreshToken;
    const user = await User.findOne({ 'refreshToken': token });
    try{
        if(user){
            const _id = user._id;
            const findUser = await User.findById(_id).populate("wishlist");
            res.json(findUser);
        } else {
            res.redirect('/myacc');
        }
    }catch(error){
        throw new Error(error);
    }
});


const userCart = asyncHandler(async (req, res) => {
    const cart = req.body;
    const token = req.cookies?.refreshToken;
    console.log("cart is: ", cart);

    try {
        // Find the user by refresh token
        let user = await User.findOne({ 'refreshToken': token });
        // let cartLength = user?.cart?.length;
        // let uId = user?._id;

        if (!user) {
            // If user not found, create a guest user
            const uuid = uuidv4();
            const num = uuid.replace(/-/g, '').slice(0, 10);
            const guestUser = {
                "firstname": " ",
                "lastname": " ",
                "email": " ",
                "mobile": num,
                "password": " ",
                "role": "guest",
                "cart": [],
            };
            const newUser = await User.create(guestUser);
            const refreshToken = generateRefreshToken(newUser?._id);
            const updatedUser = await User.findByIdAndUpdate(
                newUser._id,
                { refreshToken: refreshToken },
                { new: true }
            );
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 72 * 60 * 60 * 1000 });
            // uId = newUser._id; // Set user ID for guest user
            // newUser.cart.push(cart);
            await newUser.save();
            user = newUser;
        }

        // Check if user already has a cart
        let existingCart = await Cart.findOne({ orderby: user._id });

        if (existingCart) {
            // If cart exists, update it with the new product
            const productExistsInCart = existingCart.products.some(item => item._id.toString() === cart._id.toString());
            if (productExistsInCart) {
                return res.json({ "message": "Already Added!", "stat": true, "cart_length": user?.cart?.length });
            }
            existingCart.products.push(cart);
            existingCart.totalAmount += cart.price * cart.count;
            existingCart.cartTotal += cart.sellingPrice * cart.count;
            await existingCart.save();
            console.log("Cart updated successfully");
        } else {
            // If cart doesn't exist, create a new one
            existingCart = await new Cart({
                slug: cart.slug,
                products: [cart],
                totalAmount: cart.price * cart.count,
                deliveryCharge: 40,
                cartTotal: cart.sellingPrice * cart.count,
                orderby: user._id,
            }).save();
            console.log("New Cart created successfully");
            // res.json({ "message": "Added to Cart", "cart_length": user?.cart?.length });

        }

        // Add cart product to user's cart if not already added
        const productExistsInUserCart = user.cart.some(item => item._id.toString() === cart._id.toString());
        if (!productExistsInUserCart) {
            user.cart.push(cart);
            await user.save();
            console.log("Product added to user's cart");
        }

        res.json({ "message": "Added to Cart", "cart_length": user?.cart?.length });
    } catch (error) {
        console.error("Error handling user cart:", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
});


const getUserCart = asyncHandler(async (req,res) => {
    // const { _id } = req.user;
    const token = req?.cookies?.refreshToken;
    const user = await User.findOne({ 'refreshToken': token });
    // validateMongoDbId(_id);
    try{
        if(user){
            const _id = user._id;
            const cart = await Cart.findOne({ orderby: _id });

            if(cart){
                // await Cart.findByIdAndUpdate(cart._id, { 
                //     $set: {
                //         couponDiscount: 0
                //     },
                //  }, 
                //  { new: true });
                if(cart.cartTotal === 0){
                    await Cart.findByIdAndUpdate(cart._id, { 
                        $set: {
                            deliveryCharge: 0,
                            couponDiscount: 0
                        },
                    }, 
                    { new: true });
                }
            }
        // const cart = await Cart.findOne({ orderby: _id }).populate(
        //     "products.product"
        // );
        console.log("Cart Products: ", cart);
        // const token = req.cookies?.refreshToken;
        // console.log("----", token, "---------");
        res.render('cartPage', {Cart: cart, user, bearerToken: token});
        } else {
            res.render('cartPage', {Cart: "", user: "", bearerToken: ""});
        }
    } catch(error){
        res.render('error' , {error_msg: `${error}`});
    }
});

const removeCart = asyncHandler(async (req, res) => {
    const cart = req.body;
    const token = req.cookies?.refreshToken;
    const user = await User.findOne({ 'refreshToken': token });

    console.log("cart is: ", cart);

    try {
        let products = [];
        const alreadyExistCart = await Cart.findOne({ orderby: user._id });

        if (alreadyExistCart) {
            try {
                products = alreadyExistCart.products.filter(item => item._id.toString() !== cart._id.toString());

                alreadyExistCart.products = products;
                alreadyExistCart.totalAmount = 0;
                alreadyExistCart.cartTotal = 0;

                for (let i = 0; i < products.length; i++) {
                    alreadyExistCart.totalAmount += products[i].price * products[i].count;
                    alreadyExistCart.cartTotal += products[i].sellingPrice * products[i].count;
                }

                if(alreadyExistCart.cartTotal === 0){
                    alreadyExistCart.deliveryCharge = 0;
                }
                alreadyExistCart.couponDiscount = 0;

                await alreadyExistCart.save();
                console.log("Cart updated successfully");

                // Remove cart item from user's cart as well
                user.cart = user.cart.filter(item => item._id.toString() !== cart._id.toString());
                await user.save();
                console.log("Item removed from user's cart");
            } catch (error) {
                console.error("Error updating cart:", error);
            }
        }

        console.log("Already: ", products);
        res.json(alreadyExistCart);
    } catch (error) {
        console.error("Error handling cart removal:", error);
        throw new Error(error);
    }
});


const emptyCart = asyncHandler(async (req,res) => {
    const { _id } = req.user;
    // validateMongoDbId(_id);
    try{
        const user = await User.findOne({ _id });
        const cart = await Cart.findOneAndDelete({ orderby: user._id });
        res.json(cart);
    } catch(error){
        throw new Error(error);
    }
});

const toggleQuantity = asyncHandler(async (req, res) => {
    const cartId = req.body.cartId;
    const productId = req.body.productId;
    const newCount = Number(req.body.count);
    let totalCount = 0;

    const product = await Product.findOne({ '_id': productId });
    const cart = await Cart.findById(cartId);
    if(cart){
        const newProducts = cart.products.map((cart_product) => {
            if(cart_product._id.toString() === productId.toString()){
                if(cart_product.count + newCount <= product.quantity){
                    cart_product.count = (cart_product.count + newCount > 0) ? (cart_product.count + newCount) : 0;
                }
                totalCount = cart_product.count;
                if(totalCount === 0){
                    cart_product.count = 1;
                }     
            }
            return cart_product;
        });
         
        console.log("New Count:", newCount, ", Total count: ", totalCount);
        let newTotalAmount = 0;
        let newCartTotal = 0;

        if(totalCount === 0){
            newTotalAmount = cart.totalAmount;
            newCartTotal = cart.cartTotal;
        } else {
            newTotalAmount = product.price*totalCount + cart.couponDiscount;
            newCartTotal = product.sellingPrice*totalCount + cart.couponDiscount;

        if(newCount === 1){
            newTotalAmount = newTotalAmount + (cart.totalAmount - product.price*(totalCount-1));
            newCartTotal = newCartTotal + (cart.cartTotal - product.sellingPrice*(totalCount-1));
        } else if(newCount === -1){
            newTotalAmount = newTotalAmount + (cart.totalAmount - product.price*(totalCount+1));
            newCartTotal = newCartTotal + (cart.cartTotal - product.sellingPrice*(totalCount+1));
        }
        }

        const newDeliveryCharge = (newCartTotal > 0) ? cart.deliveryCharge : 0;

        await Cart.findByIdAndUpdate(cartId, { 
            $set: {
                products: newProducts,
                totalAmount: newTotalAmount,
                cartTotal: newCartTotal,
                deliveryCharge: newDeliveryCharge,
                couponDiscount: 0
            },
         }, 
         { new: true })
        .then(updatedCount => {
            console.log("Count updated successfully", updatedCount);
            res.json({"newCount": totalCount});
        })
        .catch(err => {
            console.log('Error updating count', err);
            res.json(err);
        });

    } else {
        res.json(1);
    }
});

// Apply Coupon
const applyCoupon = asyncHandler(async(req, res) => {
    const coupon = req.body.coupon;
    console.log("IN ApplyCoupon", coupon);
    const id = req.body.id;
    
    try{
        const validCoupon = await Coupon.findOne({ 'name' : coupon });
        console.log(validCoupon);

        const user = await User.findOne({ '_id': id });
        const cart = await Cart.findOne({ 'orderby': user._id });
        console.log("CartTotal: ", cart);

        if(validCoupon){
            let afterDiscount = 0;
            if(validCoupon.name === 'PRAIZ10'){
                afterDiscount = (Number(cart.cartTotal * validCoupon.discount)/100).toFixed(2);
            }
            // else if(validCoupon.name === 'FESTIVE15' && (cart.products.length >=2 || cart.products[0].count > 1)){
                else if(validCoupon.name === 'FESTIVE15' && (cart.cartTotal > 1499)) {
                afterDiscount = (Number(cart.cartTotal * validCoupon.discount)/100).toFixed(2);
            }
            // else if(validCoupon.name === 'PRAIZ25' && (cart.products.length >=3 || cart.products[0].count > 2 || (cart.products[0].count + cart.products[1].count > 2))){
                else if(validCoupon.name === 'FESTIVE25' && (cart.cartTotal > 1999)) {
                afterDiscount = (Number(cart.cartTotal * validCoupon.discount)/100).toFixed(2);
            }
            // let  = (Number(cart.cartTotal) + percentDiscount).toFixed(2);
            let newDeliveryCharge = cart.deliveryCharge;
            if(cart.cartTotal-afterDiscount < 599) {
                newDeliveryCharge = 40;
            } else {
                newDeliveryCharge = 0
            }
            console.log("AfterDiscount: ", afterDiscount);
            console.log("New Delivery Charge: ", newDeliveryCharge);
            await Cart.findOneAndUpdate( { orderby: user._id }, {
                $set: { couponDiscount:  afterDiscount,
                        deliveryCharge: newDeliveryCharge
                    }
            },
                { new: true }
            );
            const newCart = await Cart.findOne({ orderby: user._id });
            console.log("New Cart: ", newCart);
            res.json({ 'discount': afterDiscount });
        }
        // const user = await User.findOne({ '_id': id });
        // const cartTotal = await Cart.findOne({ 'orderby' : user._id }).populate("products.product");

        // let totalAfterDiscount = ( cartTotal - (cartTotal * validCoupon.discount)/100).toFixed(2);

        // await Cart.findOneAndUpdate(
        //     { orderby: user._id }, 
        //     { totalAfterDiscount },
        //     { new: true }
        //     );
        //     res.json(totalAfterDiscount);
        else {
            const afterDiscount = 0;
            console.log("AfterDiscount: ", afterDiscount);
            let newDeliveryCharge = cart.deliveryCharge;
            if(cart.cartTotal-afterDiscount < 599) {
                newDeliveryCharge = 40;
            } else {
                newDeliveryCharge = 0
            }
            await Cart.findOneAndUpdate( { orderby: user._id }, {
                $set: { couponDiscount:  afterDiscount,
                        deliveryCharge: newDeliveryCharge
                 }
            },
                { new: true }
            );
            const newCart = await Cart.findOne({ orderby: user._id });
            console.log("Not Cart: ", newCart);
            res.json({'discount': 0 });
        }
    }catch(error){
        throw new Error(error);
    }
});

// // Add Delivery
// const addDelivery = asyncHandler(async(req, res) => {
//     const uId = req.body.id;
//     try{
//         const cart = await Cart.findOne({'orderby': uId});
//         if(cart) {
//             const id = cart._id;
//             await Cart.findByIdAndUpdate(id, {
//                 cartTotal : cartTotal + 40,
//             },
//             { new: true }
//         );
//         res.json(true);
//         } else {
//             res.json(false);
//         }
//     } catch(error){
//         throw new Error(error);
//     }
// });


const getCheckout = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // const token = req.cookies?.refreshToken;
    
    try{
        const user = await User.findOne({ '_id': id });
        const order = await Order.findOne({ 'orderby': id });
        if(user){
        res.render('checkout-page', {user: user, order});
        } else {
            res.redirect('/');
        }
    } catch (error){
        throw new Error(error);
    }
});

const createOrder = asyncHandler(async(req, res) => {
    const cartId = req?.body?.id;
    const userId = req?.body?.uId;
    // const { _id } = req.user;
    // validateMongoDbId(_id);
    try {
    const cart = await Cart.findById({ '_id': cartId });

    //   if (!COD) throw new Error("Create cash order failed");
      const user = await User.findOne({ '_id': userId });
      let finalAmout = 0;
      if (cart.cartTotal < 599) {
        if(cart.couponDiscount > 0){
        finalAmout = ((cart.cartTotal + cart.deliveryCharge) - cart.couponDiscount).toFixed(1);
        } else {
            finalAmout = (cart.cartTotal + cart.deliveryCharge).toFixed(1);
        }
    } else {
        if(cart.couponDiscount > 0){
            finalAmout = (cart.cartTotal - cart.couponDiscount).toFixed(1);
        } else {
            finalAmout = (cart.cartTotal).toFixed(1);
        }
      }

      let newAmount = 0;
        if(cart.cartTotal - cart.couponDiscount < 599){
            newAmount = (cart.cartTotal + cart.deliveryCharge) - cart.couponDiscount;
        } else {
            newAmount = cart.cartTotal - cart.couponDiscount;
        }

        // Add amount to existing Order
        const order = await Order.findOne({ 'orderby': cart.orderby });
        if(order){
            await Order.findByIdAndUpdate(order._id, { 
                $set: {
                    "products": cart.products,
                    paymentIntent: {
                        id: order.paymentIntent.id,
                        method: "RazorPay",
                        amount: newAmount,
                        status: "Initiated",
                        currency: "INR"
                    },
                    "isGiftWrap": cart.isGiftWrap
                },
             }, 
             { new: true }
            );
            // .then(updatedCount => {
                console.log("ExistingOrder: ", order);
                // res.json(totalCount);
            // })
            // .catch(err => {
                // console.log('Error updating order', err);
                // res.json(err);
            // });
        }
        else{
            const newOrder = await new Order({
                "products": cart.products,
                "paymentIntent": {
                  "id": uniqid(),
                  "method": "RazorPay",
                  "amount": finalAmout,
                  "status": "Initiated",
                //   created: Date.now(),
                  "currency": "INR",
                },
                "orderby": user._id,
                "isGiftWrap": cart.isGiftWrap,
                "orderStatus": "Processing",
              }).save();
              console.log("Order: ", newOrder);

        }
      res.json({ message: "success" });
    } catch (error) {
        throw new Error(error);
    }
});


// Add address to Order
const updateOrder = asyncHandler(async(req, res) => {
    const token = req.cookies?.refreshToken;
    const user = await User.findOne({ 'refreshToken': token });
    console.log("Address: ", req?.body);

    const orderId = req?.body?.oId;
    console.log(orderId);
    try{
        if(user){
            const updatedOrder = await Order.findByIdAndUpdate(orderId, {
                address: req?.body
            }, 
            { new: true },
            );

            res.json(updatedOrder);
        } else {
            res.status(404).json({ 'message': 'User not found' });
        }
    }catch(error){
        console.error(error); // Log the error for debugging
        res.status(500).json({ 'message': 'Internal server error' }); // Send a generic error response
    }
});

const getOrders = asyncHandler(async (req, res) => {
    try {
        const allOrders = await AllOrder.find();

        // Use Promise.all to wait for all promises to resolve
        const newOrders = await Promise.all(allOrders.map(async (item) => {
            const user_id = item.orderby;

            // Log user_id to check what IDs are being queried
            console.log(`Querying user with ID: ${user_id}`);

            // Ensure user_id is a valid ObjectId
            // if (!mongoose.Types.ObjectId.isValid(user_id)) {
            //     console.log(`Invalid ObjectId: ${user_id}`);
            //     return { ...item._doc, user: null };
            // }

            const user = await User.findById(user_id);

            // Log the result of the user query
            console.log(`User found: ${user}`);

            // Return the merged object
            return { ...item._doc, user };
        }));
        newOrders.reverse();
        res.json(newOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


const updateOrderStatus = asyncHandler(async(req, res) => {
    const id = req.body.orderId;
    const status = req.body.orderStatus;

    try{
        const updatedOrderStatus = await AllOrder.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
                paymentIntent: {
                status: status,
                },
            },
            { new: true }
        );
        res.json({ 'message': 'Order status updated successfully' });
    } catch(error) {
        res.json({ 'message': 'Failed to update order status' });
    }
});

const giftCtrl = asyncHandler(async(req, res) => {
    const usermail = req.body.mail;
    console.log('UserMail: ', usermail);
    try{
        const findUser = await User.findOne({email: usermail});
        const findOrder = await AllOrder.findOne({ 'orderby': findUser?._id });
        if(!findOrder){

            const findProduct = await Product.findOne({ slug: 'scrunchie-red' });
            const findCart = await findUser?.cart?.reduce(item => item?._id === findProduct?._id);

            if(findCart){
                res.json({'checkUser': false});
            } else {
                const giftData = {
                    "_id": findProduct?._id,
                    "title": findProduct?.title,
                    "image": findProduct?.thumbnail,
                    "count": 1,
                    "price": 0,
                    "sellingPrice": 0,
                    "discount": 0,
                    "quantity": 1,
                    "color": findProduct?.color[0],
                    "size": "adjustable"
                }
                console.log("Gift: ", findProduct);
                res.json({ 'checkUser': true, "gift" : giftData });
            }
        } else {
            res.json({'checkUser': false});
        }
    } catch (error){
        console.log("Error adding gift: ", error);
        res.redirect("/");
    }
});

const storeEmail = asyncHandler(async(req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
          return res.status(400).send({ message: 'Email is required' });
        }
    
        const newEmail = new Email({ email });
        await newEmail.save();
        res.status(201).json({ message: 'Email stored successfully' });
      } catch (error) {
        if (error.code === 11000) {
          res.status(400).json({ message: 'Email already exists' });
        } else {
          res.status(500).json({ message: 'Internal Server Error', error });
        }
      }
});

const giftWrap = asyncHandler(async(req, res) => {
    try {
        const { addon } = req.body;
        const token = req.cookies.refreshToken;
        const user = await User.findOne({'refreshToken': token});
        if (user) {
            const cart = await Cart.findOne({'orderby': user._id});
            let checkGiftWrap = false;
            if(Number(addon) > 0) {
                checkGiftWrap = true;
            }
            const updatedCart = await Cart.findOneAndUpdate( 
                {'orderby': user._id},
                { $set: { cartTotal: cart.cartTotal + addon },
                isGiftWrap: checkGiftWrap
                }
            );
            console.log("Updated Cart: ", updatedCart, "\nAddon: ", addon);
            res.json({ message: "Gift wrapped successfully" });

        } else {
            res.status(400).json({ message: "Invalid User" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
});


module.exports = { 
    createUser, 
    loginUserCtrl,
    loginUserMobCtrl,
    visitHome,
    getallUser, 
    getaUser, 
    deleteaUser, 
    forgotPass,
    getRegOTP,
    getOTP,
    getUpdatedUser,
    updateaUser,
    updateProfile,
    getNewPass,
    setNewPass,
    blockUser, 
    unblockUser,
    handleRefrehToken,
    logout,
    loginAdmin,
    saveAddress,
    userCart,
    getUserCart,
    removeCart,
    emptyCart,
    toggleQuantity,
    applyCoupon,
    // addDelivery,
    getCheckout,
    createOrder,
    updateOrder,
    getOrders,
    updateOrderStatus,
    giftCtrl,
    storeEmail,
    giftWrap
};