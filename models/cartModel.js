const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: String,
        image: String,
        count: {
          type: Number,
          default: 1
        },
        color: String,
        price: Number,
        sellingPrice: Number,
        discount: Number,
        size: {
          type: String,
          default: "adjustable",
        },
      },
    ],
    totalAmount: Number,                            //Total actual Price
    deliveryCharge: Number,                        //Delivery Charge
    cartTotal: Number,                            //Total Selling Price
    couponDiscount: {
      type: Number,
      default: 0,
    },
    isGiftWrap: {
          type: Boolean,
          default: false
    },          
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique:true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
