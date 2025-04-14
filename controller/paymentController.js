const Razorpay = require('razorpay'); 
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
const Order = require("../models/orderModel");
const User = require("../models/userModel");

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});


// const renderProductPage = async(req,res)=>{

//     try {
        
//         res.render('product');

//     } catch (error) {
//         //console.log(error.message);
//     }

// }

const createOrder = async(req,res)=>{
    const refreshToken = req?.cookies?.refreshToken;
    const user = await User.findOne({ 'refreshToken': refreshToken });
    const newOrder = await Order.findOne({ 'orderby': user._id });
    try {
        const amount = req.body.amount*100;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        console.log("NewOrder: ", newOrder);
        console.log("Options: ", options);
        console.log("Body: ", req.body);

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    console.log("Order: ", order);
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        order: newOrder,
                        amount: newOrder.paymentIntent.amount,
                        key_id:RAZORPAY_ID_KEY,
                        product_name:req.body.name,
                        description: order,
                        contact: " ",
                        name: newOrder.address.firstname + newOrder.address.lastname,
                        email: " "
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        //console.log(error.message);
    }
}


module.exports = {
    // renderProductPage,
    createOrder
}