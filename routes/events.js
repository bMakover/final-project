const express = require("express");
const router = express.Router();
const { EventModel, validEvent } = require("../models/eventModel");
const { PostsModel, validPost } = require("../models/postsModel");
const { authAdmin } = require("../middlewares/auth");

router.get("/getAllEvents/", async (req, res) => {
    try {
        const events = await EventModel.find({});
        // if (!events) return res.status(404).json({ message: "Event not found" });
        return res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve event", error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const event = await EventModel.findById(req.params.id).populate('travels');
        if (!event) return res.status(404).json({ message: "Event not found8888" });

        res.json(event);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve event", error: err.message });
    }
});


// Create an event without posts
router.post("/", authAdmin, async (req, res) => {
    try {
        let validBody = validEvent(req.body);
        if (validBody.error) {
            return res.status(400).json(validBody.error.details);
        }

        const { posts, ...eventData } = req.body;

        let event = new EventModel(eventData);
        await event.save();

        res.status(201).json({ event });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error creating event", err });
    }
});

// Update event details by ID (excluding posts)
router.put("/:id", authAdmin, async (req, res) => {
    try {
        let validBody = validEvent(req.body);
        if (validBody.error) {
            return res.status(400).json(validBody.error.details);
        }

        const { posts, ...eventData } = req.body;

        let updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, eventData, {
            new: true,
        });

        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

        res.json({ updatedEvent });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error updating event details", err });
    }
});

// Update the posts array for an event (add post)
router.put("/:id/posts", async (req, res) => {
    try {
        let validBody = validPost(req.body);
        if (validBody.error) {
            return res.status(400).json(validBody.error.details);
        }

        let updatedEvent = await EventModel.findById(req.params.id);
        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

        let newPost = new PostsModel({ ...req.body, event: req.params.id });
        await newPost.save();

        updatedEvent.posts.push(newPost._id);
        await updatedEvent.save();

        res.status(201).json({ updatedEvent, newPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error adding post to event", err });
    }
});


router.delete("/:delId", authAdmin, async (req, res) => {
    try {
        let delId = req.params.delId;
        let data;
        data = await EventModel.deleteOne({ _id: delId })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})



module.exports = router;