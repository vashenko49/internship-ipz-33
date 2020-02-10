const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Customer = require('../models/Client');
const mongoose = require('mongoose');


module.exports = async passport => {
  const optsJWT = {};
  optsJWT.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  optsJWT.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    "jwt",
    new JwtStrategy(optsJWT, async (jwt_payload, done) => {
      try {
        const {_id} = jwt_payload.data;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
          return done(null, false);
        }
        let customer = await Customer.findById(_id);
        if (customer) {
          return done(null, customer);
        }
        return done(null, false);
      } catch (e) {
        return done(e, false, e.message);
      }

    })
  );
};
