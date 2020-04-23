const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const postsRouter=require('./routes/post');
const mongoose = require("mongoose");
const path=require('path');
mongoose.connect('mongodb+srv://memo:123580@cluster0-uqpty.mongodb.net/test?retryWrites=true&w=majority').then(() => {

  console.log('database connected');
}).catch(() => {

  console.log('failed to connect database ');
});
app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with,Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'Get,Post,PUT,DELETE,Options');
  res.setHeader('Access-Control-Allow-Origin', '*');

  next();

});

app.use('/api/posts',postsRouter);

module.exports = app;
