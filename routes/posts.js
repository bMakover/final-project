const express = require("express");
const bcrypt = require("bcrypt");
const { PostsModel, validPost } = require("../models/postsModel")

const router = express.Router();

router.get("/getPostsByDesNSrc/:src/:des", async (req, res) => {
    try {
        let src = req.params.src;
        let des=req.params.des
        let data;
        data = await PostsModel.find({ source:src,destination:des })
        //when i hava a accsess to users
       // data = await PostsModel.deleteOne({_id:delId,user_id:req.tokenData._id})
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

router.get("/getAllDisplay", async (req, res) => {
    try {
        let data;
        data = await PostsModel.find({ isDisplay:true })
        //when i hava a accsess to users auth
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})
router.get("/getAllUndisplay", async (req, res) => {
    try {
        let data;
        data = await PostsModel.find({ isDisplay:false })
        //when i hava a accsess to users auth
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})


router.post("/", async (req, res) => {
    let validBody = validPost(req.body);
    req.body.createDate = Date.now()
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let post = new PostsModel(req.body);
        await post.save();
        res.status(201).json(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err })
    }
})



router.delete("/:delId", async (req, res) => {
    try {
        let delId = req.params.delId;
        let data;
        data = await PostsModel.deleteOne({ _id: delId })
        //when i hava a accsess to users
        // data = await PostsModel.deleteOne({_id:delId,user_id:req.tokenData._id})
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})



router.put("/:editId", async (req, res) => {
    let validBody = validPost(req.body);
    req.body.updateDate = Date.now()
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let editId = req.params.editId;
        let data;
        data = await PostsModel.updateOne({ _id: editId }, req.body)
        //when i hava a accsess to users dont forget auth
        //  data = await CakesModel.updateOne({_id:editId,user_id:req.tokenData._id},req.body)
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})
module.exports = router;