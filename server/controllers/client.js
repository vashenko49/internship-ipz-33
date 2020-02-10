const {validationResult} = require("express-validator");


// Controller for creating customer and saving to DB
exports.createCustomer = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};

// Controller for customer login
exports.loginCustomer = async (req, res) => {
    try {


    } catch (e) {
        return res.status(400).json({message: e.message});
    }
};

// Controller for getting current customer
exports.getCustomer = (req, res) => {
    try {


    } catch (e) {
        return res.status(400).json({message: e.message});
    }
};

