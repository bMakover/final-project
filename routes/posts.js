const express = require("express");
const bcrypt = require("bcrypt");
const { PostsModel, validPost } = require("../models/postsModel");
const { auth } = require("../middlewares/auth");

const router = express.Router();

//get by source and destination and quary isdisplay (isdisplay need to be true or false)
router.get("/getPostsByDesNSrc/:src/:des", async (req, res) => {
    try {
       
        let isdisplay=req.query.isdisplay
        if(isdisplay!="true" && isdisplay!="false"){ return res.status(500).json({ msg: "isdisplay must to be boolean" })}
        let src = req.params.src;
        let des = req.params.des
        let data;
        data = await PostsModel.find({ 'source.city': src, 'destination.city': des,isDisplay:isdisplay })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})
// get all open for display posts 
router.get("/getAllDisplay", async (req, res) => {
    try {
        let data;
        data = await PostsModel.find({ isDisplay: true })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})
// get all open for Undisplay posts 
router.get("/getAllUndisplay", async (req, res) => {
    try {
        let data;
        data = await PostsModel.find({ isDisplay: false })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

//add post by token-must be login
router.post("/", auth, async (req, res) => {
    let validBody = validPost(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let post = new PostsModel(req.body);
        post.idDriver = req.tokenData._id
        await post.save();
        res.status(201).json(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err })
    }
})


//delete post by token-must be login and id`s post in params
router.delete("/:delId", auth, async (req, res) => {
    try {
        let delId = req.params.delId;
        let data;
        if (req.tokenData.role == "admin")
            data = await PostsModel.deleteOne({ _id: delId })
        else
            data = await PostsModel.deleteOne({ _id: delId, idDriver: req.tokenData._id })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})


//update post by token-must be login and id`s post in params
router.put("/:editId", auth, async (req, res) => {
    let validBody = validPost(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let editId = req.params.editId;
        let data;
        if (req.tokenData.role == "admin")
            data = await PostsModel.updateOne({ _id: editId }, req.body)
        else {
            data = await PostsModel.updateOne({ _id: editId, idDriver: req.tokenData._id }, req.body)
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})
module.exports = router;