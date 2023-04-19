const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,
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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        res.status(401).json({
          status: "fail",
          message: "Incorrect email or password",
        })
      );
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in log in first",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "the user belong to this token does no longer exist",
      });
    }

    next();
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e,
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
  });
};
