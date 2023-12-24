const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

const eventSchema = new mongoose.Schema({
    Name: String,
    Date: Date,
    hour: String,
    location: {
        city: String,
        street: String,
        houseNumber: String
    },
    description:String,
    travels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

exports.EventModel = mongoose.model("events", eventSchema);

exports.validEvent = (_reqBody) => {
    let joiSchema = Joi.object({
        Name: Joi.string().min(2).max(99).required(),
        Date: Joi.date().iso().required(),
        hour: Joi.string().required(),
        location: Joi.object({
            city: Joi.string(),
            street: Joi.string(),
            houseNumber: Joi.string()
        }),
        description:Joi.string().allow('null'),
        travels: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        dateCreated: Joi.date().iso()
    });

    return joiSchema.validate(_reqBody);
};


