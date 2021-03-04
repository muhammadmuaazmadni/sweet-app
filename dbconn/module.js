var mongoose = require("mongoose");

// let dbURI = "mongodb+srv://dbjahan:dbjahan@cluster0.8ric4.mongodb.net/test?retryWrites=true&w=majority";
let dbURI = "mongodb+srv://root:root@cluster0.s5oku.mongodb.net/twitterdb?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function() {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function() {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function(err) { //any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function() {
    console.log("app is terminating");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
var foodUserSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "phone": String,
    "role": { "type": String, "default": "user" },
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});

var foodUserModel = mongoose.model("fooduser", foodUserSchema);

var foodResetPassword = new mongoose.Schema({
    "email": String,
    "otp": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var foodOtpModel = mongoose.model("foodotp", foodResetPassword);

var foodOrderSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "phone": String,
    "address": String,
    "total": String,
    "orders": Array,
    "createdOn": { "type": Date, "default": Date.now },
});
var foodOrderModel = mongoose.model("orders", foodOrderSchema);
var foodProductSchema = new mongoose.Schema({
    "productName": String,
    "productImage": String,
    "stock": Number,
    "price": String,
    "description": String,
    "isAvailable": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var foodProductModel = mongoose.model("products", foodProductSchema);

module.exports = {
    foodUserModel: foodUserModel,
    foodOtpModel: foodOtpModel,
    foodOrderModel: foodOrderModel,
    foodProductModel: foodProductModel
}