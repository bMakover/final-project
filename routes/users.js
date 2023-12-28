const express = require("express");
const bcrypt = require("bcrypt");
const { auth, authAdmin } = require("../middlewares/auth");
const { UserModel, validUser, validLogin, createToken } = require("../models/userModel");
const { PostsModel } = require("../models/postModel");
const router = express.Router();

// Error handler middleware
const errorHandler = (res, err) => {
    console.log(err);
    res.status(500).json({ msg: "There is an error, try again later", err });
};
router.get("/myInfo", auth, async (req, res) => {
    try {
        let userInfo = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
        res.json(userInfo);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})


router.get("/usersList", authAdmin, async (req, res) => {
    try {
        let data = await UserModel.find({}, { password: 0 });
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})

// Get user details by ID
router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = await UserModel.findOne({ _id: id }, { password: 0 });
        if (!data) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(data);
    } catch (err) {
        errorHandler(res, err);
    }
});

// Create a new user
router.post("/", async (req, res) => {
    // Validation
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(500).json({ msg: "Email already in system, try logging in", code: 11000 });
        }
        errorHandler(res, err);
    }
});

// User login
router.post("/login", async (req, res) => {
    // Validation
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ msg: "Email or password is incorrect" });
        }
        
        let authPassword = await bcrypt.compare(req.body.password, user.password);
        if (!authPassword) {
            return res.status(401).json({ msg: "Email or password is incorrect" });
        }

        let token = createToken(user._id, user.role);
        res.json({ token });
    } catch (err) {
        errorHandler(res, err);
    }
});

// Update user details
router.put("/:editId", auth, async (req, res) => {
    // Validation
    let validBody = validUser(req.body);

    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let editId = req.params.editId;
        let user = await UserModel.findById(editId);
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        // Save the updated user to the database
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (req.tokenData.role === "admin" || req.tokenData._id === editId) {
            let data = await UserModel.findByIdAndUpdate(editId,user);
            return res.json(data);
        } else {
            return res.status(403).json({ msg: "Unauthorized to update this user" });
        }
    } catch (err) {
        errorHandler(res, err);
    }
});

// update waiting list of user
router.put('/deleteWait/:postId/:userId',async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const postIndex = user.waits.indexOf(postId);
        if (postIndex === -1) {
            return res.status(404).json({ message: "Post not found in the waitings list" });
        }

        user.waits.splice(postIndex, 1); // Remove post from waitings list
        await user.save();
        return res.status(200).json({ message: "successs" });
    } catch (error) {
        console.error("Error canceling post's join:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
  });
  
// Activate/Deactivate user
router.put("/:editId/changeStatus", authAdmin, async (req, res) => {
    try {
        let editId = req.params.editId;
        let user = await UserModel.findById(editId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        user.isActive = !user.isActive; // Toggle user status
        await user.save();
        return res.json({ msg: user.isActive ? "User activated" : "User deactivated" });
    } catch (err) {
        errorHandler(res, err);
    }
});

// Delete user
router.delete("/:delId", authAdmin, async (req, res) => {
    try {
        let delId = req.params.delId;
        let data = await UserModel.deleteOne({ _id: delId });
        res.json({ msg: "User deleted successfully" });
    } catch (err) {
        errorHandler(res, err);
    }
});

module.exports = router;
