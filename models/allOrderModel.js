const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var allOrderSchema = new mongoose.Schema({
    totalAmount: {
        type: Number
    },
    orderStatus: {
        type: String
    },
    orders: [
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
            orderStatus: {
                type: String,
                default: "Processing"
            },
        },
    ],
    address: {
        type: Object
    },
    isGiftWrap: {
          type: Boolean,
          default: false
    },  
    paymentIntent: {},
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
module.exports = mongoose.model('AllOrder', allOrderSchema);