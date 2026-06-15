//import mongoose
const mongoose = require('mongoose')

//create employee Schema
const employeeSchema = mongoose.Schema({

    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    department: {
        type: String,
        required: true
    },

    designation: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})

//export module
module.exports = mongoose.model('employee', employeeSchema)