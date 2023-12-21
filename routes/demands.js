const express = require("express");
const bcrypt = require("bcrypt");
const { DemandsModel, validDemand } = require("../models/demandModel");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/getAllDemands", async (req, res) => {
    try {
        let data;
        data = await DemandsModel.find({})
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})


router.post("/", auth, async (req, res) => {
    let validBody = validDemand(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let demand = new DemandsModel(req.body);
        demand.idUser = req.tokenData._id
        await demand.save();
        res.status(201).json(demand);
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
            data = await DemandsModel.deleteOne({ _id: delId })
        else
            data = await DemandsModel.deleteOne({ _id: delId, idUser: req.tokenData._id })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})



router.put("/:editId", auth, async (req, res) => {
    let validBody = validDemand(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let editId = req.params.editId;
        let data;
        if (req.tokenData.role == "admin")
            data = await DemandsModel.updateOne({ _id: editId }, req.body)
        else {
            data = await DemandsModel.updateOne({ _id: editId, idUser: req.tokenData._id }, req.body)
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

module.exports = router;