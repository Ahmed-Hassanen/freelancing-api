const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  //check if the user already exists
  try {
    const user = await User.find({
      email: req.body.email,
    });

    if (user && user.length > 0) {
      return next(
        res.status(400).json({
          status: "fail",
          message: "This user already exists",
        })
      );
    }

    //save user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    //send token
    createSendToken(newUser, 201, req, res);
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
