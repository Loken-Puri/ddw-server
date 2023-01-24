const router = require("express").Router();
const User = require("../models/Comments.model");
const Comment = require("../models/Comments.model")
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

router.post('/details/:Id/comment', isAuthenticated, async (req, res, next) => {
try {
    const { comment } = req.body;
    console.log("this is the new comment: ", req.body, req.payload)
    const newComment = await Comment.create({ author: req.payload._id, content });
    console.log ("newComment: ", newComment)
    const updatedExperience = await Experience.findByIdAndUpdate({_id: req.payload._id}, {$push: {comments: [newComment._id]}}, {new: true})
    res
    .status(201)
    .json({ message: "New comment created"}); 
    console.log("updated Comment:", updatedExperience);
} catch (error){
    console.log(error)
    res.status(500).json(error);
    }
}) 

module.exports = router;
