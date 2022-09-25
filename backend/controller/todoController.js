const Todo = require('../model/todoModel');
const mongoose = require('mongoose');

exports.getTodo = async (req, res, next) => {
  const allTask = await Todo.find();
  res.status(200).json({
    status: 'success',
    data: allTask,
  });
};

exports.createTodo = async (req, res, next) => {
  // console.log(req.user)
  const newTodo = await Todo.create({
    title: req.body.title,
    desc: req.body.desc,
    userId:req.user._id
  });
  await newTodo.save();
  res.status(200).json({
    status: 'success',
    data: newTodo,
  });
};

exports.updateTodo = async (req, res, next) => {
  let updated;
  if(mongoose.Types.ObjectId.isValid(req.params.todoId)){
         updated = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {
            new: true,
            runValidators: true,
        });
    }
  if (!updated) {
    res.status(404).json({
      status: 'todo could not update',
    });
  }
  res.status(200).json({
    status: 'Todo updated',
  });
};

exports.deleteTodo = async (req, res, next) => {
    let del;
if(mongoose.Types.ObjectId.isValid(req.params.todoId)){
     del = await Todo.findByIdAndDelete(req.params.todoId);
}
if(!del){
    res.status(404).json({
        status: 'todo could not delete',
    });
}
  res.status(200).json({
    status: 'Deleted Successfully',
  });
};
