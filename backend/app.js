const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Post = require('./models/post');

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://memo:123580@cluster0-uqpty.mongodb.net/test?retryWrites=true&w=majority').then(() => {

  console.log('database connected');
}).catch(() => {

  console.log('failed to connect database ');
});
app.use(bodyParser.json());
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with,Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'Get,Post,DELETE,Options');
  res.setHeader('Access-Control-Allow-Origin', '*');

  next();

});

app.post("/api/posts", (req, res) => {
  const post = new Post({

    title: req.body.title,
    content: req.body.content


  });
  post.save().then(createdPost=>{

      res.status(201).json({
    message: "post saved succesfully",postId:createdPost._id
  });
  });


});

app.get('/api/posts', (req, res, next) => {

  Post.find().then(documents => {
    res.status(200).json({
      message: "delevired",
      posts: documents
    });
  });

});

app.delete('/api/posts/:id', (req, res, next) => {

Post.deleteOne({_id:req.params.id}).then(result=>
  {

console.log(result);

  });
  res.status(200).json({
    message: "deleted"
  });
});
module.exports = app;
