const express = require('express');
const app = express();
const connection = require('./config/db');
const port = process.env.PORT || 8080;
const todoRoute = require('./routes/todoRoutes');
const userRoute = require('./routes/userRoutes');
app.use(express.json());
app.use('/todos', todoRoute);
app.use('/users', userRoute);
app.listen(port, async () => {
  try {
    connection();
    console.log(`database is connected to ${port}`);
  } catch (err) {
    console.log(`trouble to connect to database \n ${err}`);
  }
});
