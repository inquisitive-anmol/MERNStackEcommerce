const mongoose = require("mongoose");
const validator = require("validator");

const sellerSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: [true, "Please enter your phone"],
        minlength: [10, "Name should have more than 10 characters"],
        maxlength: [10, "Name should not exceed 10 Characters"],
    },
    businessName: {
        type: String,
        required: [true, "Please enter your Business Name"],
        minlength: [2, "Name should have more than 2 characters"],
        maxlength: [80, "Name should not exceed 80 Characters"],
    },
    bankDetails: {
        accountName: {
            type: String,
            required: [true, "Please enter your Account Name"],
        },
        accountNumber: {
            type: Number,
            required: [true, "Please enter your Account Number"],
        },
        bankName: {
            type: String,
            required: [true, "Please enter your Account's bank name"],    
        },
        bankIfsc: {
            type: String,
            required: [true, "Please enter IFSC Code"],
        },
    }
}, {
    timestamps: true
})