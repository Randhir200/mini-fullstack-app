const {Router} = require('express');
const todoRoute = Router();
const todoController = require('../controller/todoController')
const authController = require('../controller/authController');
todoRoute
    .route('/:todoId')
    .patch(todoController.updateTodo)
    .delete(todoController.deleteTodo)
todoRoute
         .route('/')
         .get(authController.protect, todoController.getTodo)
         .post(authController.protect, todoController.createTodo)

module.exports = todoRoute