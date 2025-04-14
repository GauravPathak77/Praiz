const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:true,
        trim:true,
    },
    slug:{
        type:String,
        // required:true,
        default:"",
        unique:false,
        lowercase:true,
    },
    description:{
        type:String,
        // required:true,
    },
    sellingPrice:{
        type:Number,
        // required:true,
    },
    price:{
        type:Number,
        // required:true,
    },
    discount:{
        type:Number,
        required:false,
        default:0
    },
    category:{
        type:String,
        // required: true,
        // ref:"Category",
    },
    brand: {
        type:String,
        default: "Praiz"
    },
    quantity: {
        type: Number,
        // required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    thumbnail: {
        type: String,
        // required: true,
    },
    images: [],
    color: [],
    style: [],
    ratings: [
        {
            star: Number,
            postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    totalrating: {
        type: String,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    weight: {
        type: String,
        default: 0,
    },
    material: {
        type: String,
        default: " ",
    },
    dimension: {
        type: String,
        default: " ",
    },
    productLabel:{
        type:String,
        default: null,
    },
},
{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);