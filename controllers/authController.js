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

exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(
        res.status(401).json({
          status: "fail",
          message: "Incorrect email",
        })
      );
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.password;
    await user.save();

    createSendToken(user, 200, req, res);
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
