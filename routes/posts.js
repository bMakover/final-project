const express = require("express");
const bcrypt = require("bcrypt");
const { PostsModel, validPost } = require("../models/postsModel");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/getPostsByDesNSrc/:src/:des", async (req, res) => {
    try {
        let src = req.params.src;
        let des = req.params.des
        let data;
        data = await PostsModel.find({ source: src, destination: des })
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
        data = await PostsModel.find({ isDisplay: true })
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
        data = await PostsModel.find({ isDisplay: false })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})


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