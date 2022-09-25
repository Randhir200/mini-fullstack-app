const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  desc: { type: String, require: true },
  isCompleted: { type: Boolean, require: true, default: false },
  createdAt :{ type: Date, default: Date.now },
  userId:Object
});

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo;
