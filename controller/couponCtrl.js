const Coupon = require('../models/couponModel');
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async(req, res) => {
    //console.log(req.body);
    try{
        const newCoupon = await Coupon.create(req.body);
        //console.log(newCoupon);
        res.redirect('/admin?success=true&message=Coupon added successfully!'); 
    } catch(error){
        res.redirect(`/admin?error=true&message=Coupon already exist!`);
        // throw new Error(error);
    }
});

const getAllCoupon = asyncHandler(async(req, res) => {
    try{
        const coupons = await Coupon.find();
        //console.log("Server: ", coupons);
        // return coupons;
        // res.render('admin', {coupons: coupons});
        res.json(coupons);
    } catch(error){
        throw new Error(error);
    }
});

const updateCoupon = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try{
        const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatecoupon);
    } catch(error){
        throw new Error(error);
    }
});

const deleteCoupon = asyncHandler(async(req, res) => {
    const coupon_name = req.body.name;
    //console.log("COUPON NAME: ", coupon_name);

    const coupon = await Coupon.findOne({name: coupon_name});

    if(coupon){
        const id = coupon._id;
        try{
            const deletecoupon = await Coupon.findByIdAndDelete(id, req.body, {
                new: true,
            });
            //console.log(deletecoupon);
            res.redirect('/admin?success=true&message=Coupon deleted successfully!');
        } catch(error){
            res.redirect(`/admin?error=true&message=${error}`);
            // throw new Error(error);
        }
    }
    else{
        res.redirect('/admin?error=true&message=Coupon does not exist');
    }
});


module.exports = { createCoupon, getAllCoupon, updateCoupon, deleteCoupon };