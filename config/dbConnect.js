const {default:mongoose } = require("mongoose");
require('dotenv').config();

const dbConnect = () => { 
    mongoose.connect(process.env.CONN_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch(()=>{
        console.log("Failed to connect MongoDB", err);
    });
};

module.exports = dbConnect;