const express = require("express");
const bcrypt = require("bcrypt");
const { PostsModel, validPost } = require("../models/postsModel");
const { auth } = require("../middlewares/auth");
const { UserModel } = require("../models/userModel");

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
//user join to post
router.post('/addTravel/:userId/:postId', async (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;

    try {
        // Find the user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the post by ID
        const post = await PostsModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }


        if (post.passengersList.length < post.seatsCount) {
       
            if (post.passengersList.length == post.seatsCount-1)
                post.isDisplay = false
            post.passengersList.push(userId); // Add user to passengers list
            await post.save();

            // Update the user's travels array
            user.travels.push(postId);
            await user.save();

            return res.status(200).json({ message: 'Successfully joined the drive' });
        } else {
            return res.status(400).json({ message: 'No available seats in the drive' });
        }
    } catch (error) {
        console.error('Error joining the drive:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
//user join to wait list
router.post('/addWait/:userId/:postId', async (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    
    try {
        // Find the user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the post by ID
        const post = await PostsModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

            user.waits.push(postId); 
            await user.save();
            post.waitingList.push(userId);
            await post.save();
            return res.status(200).json({ message: 'Wait added to user successfully' });
  
    } catch (error) {
        console.error('Error adding wait to user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/passengersList/:idPassengers', auth, async (req, res) => {
    try {
        const idPassengers=req.params.idPassengers
        const post = await PostsModel.findOne({idDriver:req.tokenData._id,_id:idPassengers}).populate('passengersList');
        if (!post) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(post.passengersList);
    } catch (err) {
        errorHandler(res, err);
    }
})
//get post by id
router.get("/:id", auth, async (req, res) => {
    try {
      const id = req.params.id;
      // Find the post by ID
      const data = await PostsModel.findOne({ _id: id });
      if (!data) {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.json(data);
    } catch (err) {
        console.error(err);  // Add this line to log the error
        res.status(500).json({ msg: "Internal Server Error" });
      }
  });


module.exports = router;