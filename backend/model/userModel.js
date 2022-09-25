const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: {
    type: String,
    require: [true, 'must be enter valid email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide valid email'],
  },
  password: { type: String, require: true, minLength: 6 },
  passwordConfirm: { type: String, require: true },
  passwordChangedAt: { type: Date, default: Date.now },
  age: Number,
  photo: String,
});

userSchema.pre('save', async function (next) {
  //if password is not modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
});
userSchema.methods.correctPassword = (candidatePassword, userPassword) => {
  return bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  const changedTimestamp = +this.passwordChangedAt.getTime() / 1000;
  if (this.passwordChangedAt) {
    console.log(this.passwordChangedAt, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
