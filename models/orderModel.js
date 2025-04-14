const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            title: String,
            image: String,
            count: Number,
            color: String,
            price: Number,
            sellingPrice: Number,
            discount: Number,
        },
    ],
    paymentIntent: {},
    isGiftWrap: {
          type: Boolean,
          default: false
    },  
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered",
        ],
    },
    address: {
        type: Object
    },
    orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // unique:false,
    },
},
{
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('Order', orderSchema);