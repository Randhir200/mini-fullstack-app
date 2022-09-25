const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { decode } = require('querystring');
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  newUser.save();
  const token = generateToken(newUser._id);
  if (!newUser) {
    res.status(404).json({
      status: 'failed to create user',
      data: null,
    });
  }

  res.status(200).json({
    status: 'user has been created',
    token,
    data: newUser,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check email or password is exist
  if (!email || !password) {
    res.status(404).json({
      status: 'failed',
      message: 'Please provide email and password',
    });
  }
  const user = await User.findOne({ email }).select('+password');
  console.log(user);
  // check if valid user
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid email and password',
    });
    return;
  }
  const token = generateToken(user._id);
  // everything is ok
  res.status(200).json({
    status: 'user has been loged in',
    token,
  });
};

exports.protect = async (req, res, next) => {
  let token;
  //  1. getting token and check of its there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    res.status(403).json({
      status: 'failed',
      message: 'Invalid authorization',
    });
  }
  //  2. token verification
  let decoded = await verifyToken(token);
  // 3. check if user is still exist
  const newUser = await User.findById(decoded.id);
  if (!newUser) {
    res.status(403).json({
      status: 'failed',
      message: 'you are not authorized to access',
    });
  }

  // 4. check if user changed password after the token was issued
  // if (newUser.changePasswordAfter(decoded.iat)) {
  //   return next();
  // }

  req.user = newUser;
  next();
};
