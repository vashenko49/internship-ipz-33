const express = require("express");
const router = express.Router();
const passport = require("passport");
const {check} = require('express-validator');

//Import controllers
const {
  createCustomer,
  loginCustomer,
  getCustomer
} = require("../controllers/client");


// @route   POST /customer
// @desc    Register customer
// @access  Public
router.post(
  "/",
  [
    check('firstName', 'firstName is require')
      .not()
      .isEmpty(),
    check('lastName', 'lastName is require')
      .not()
      .isEmpty(),
    check('password', 'password is require')
      .not()
      .isEmpty()
  ],
  createCustomer);

// @route   GET /customer
// @desc    Return current customer
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", {session: false}),
  getCustomer
);



module.exports = router;
