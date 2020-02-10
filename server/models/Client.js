const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    urlImg: {
        type: String
    },
    description: {
        type: String
    },
    phone: [
        {
            type: String
        }
    ],
    password: {
        type: String,
        required: true
    },
    media: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedIn: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

CustomerSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = Customer = mongoose.model("client", CustomerSchema, "client");
