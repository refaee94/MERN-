const express = require("express");
const router = express.Router();

const multer = require("multer");
const Post = require("../models/post");
const path=require('path');
const storage = multer.diskStorage({
  destination: (req, myfile, cd) => {
    cd(null, "backend/images");
  },
  filename: (req, myfile, cd) => {
    const name = myfile.fieldname.toLowerCase().split(" ").join("-");
    console.log(name);

    cd(null,name+ "-" + Date.now()+path.extname(myfile.originalname));
  },
});
var upload = multer({ storage: storage });


router.post("", upload.single('image'),(req, res) => {
  const url=req.protocol +'://'+req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath:url+'/images/'+req.file.filename
  });
  console.log(post.imagePath);

  post.save().then((createdPost) => {
      console.log(createdPost.imagePath);

    res.status(201).json({
      message: "post saved succesfully",
      post:{ id:createdPost._id,title:createdPost.title,content:createdPost.content,
        imagePath:createdPost.imagePath}
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "delevired",
      posts: documents,
    });
  });
});

router.put("/:id",  upload.single('image'),(req, res, next) => {
  let imagePath=req.body.imagePath;
  if(req.file){
    const url=req.protocol +"://"+req.get("host");

    imagePath=url+"/images/"+req.file.filename;


  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,imagePath:imagePath
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: "Updated succefully" });
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id,
  }).then((result) => {
    console.log(result);
  });
  res.status(200).json({
    message: "deleted",
  });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json("faild to update");
    }
  });
});

module.exports = router;
