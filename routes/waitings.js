const express = require("express");
const { WaitingModel, validWaiting, } = require("../models/waitingModel");
const {auth} = require("../middlewares/auth");
const router = express.Router();

//erorr handler
const errorHandler = (res, err) => {
    console.log(err);
    res.status(500).json({ msg: "There is an error, try again later", err });
};

// Create a new waiting
router.post("/", async (req, res) => {
    // Validation
    let validBody = validWaiting(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let waiting = new WaitingModel(req.body);
        await waiting.save();
        res.status(201).json({ msg: "new waiting created successfully" });
    } catch (err) {
        errorHandler(res, err);
    }
});

router.get("/waitingList",async(req,res)=>{
    try {
        let data = await WaitingModel.find({},);
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})

// Delete user waiting - only user cn delete his waiting
router.delete("/:delId",auth ,async (req, res) => {
    try {
        let delId = req.params.delId;
        let data = await WaitingModel.deleteOne({ _id: delId });
        res.json({ msg: "Waiting deleted successfully" });
    } catch (err) {
        errorHandler(res, err);
    }
});

// Delete waitings not relevant 
router.delete("/expiredWaiting/:delId", async (req, res) => {
    try {
        let delId = req.params.delId;
        let data = await WaitingModel.deleteOne({ _id: delId });
        if (data.deletedCount === 1) {
            res.json({ msg: "Waiting deleted successfully" });
        } else {
            res.status(404).json({ msg: "Waiting not found" });
        }
        res.json({ msg: "Waiting deleted successfully" });
    } catch (err) {
        errorHandler(res, err);
    }
});

module.exports = router;

