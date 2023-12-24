const mongoose = require("mongoose");
const Joi = require("joi");


const waitingSchema = new mongoose.Schema({
    user_id: String,
    source: {
        city: String,
        street: String,
        houseNumber: Number
    },
    destanition: {
        city: String,
        street: String,
        houseNumber: Number
    },
    limit:{
        date:Date,
        hour:String
    },
    post_id:String
});

exports.WaitingModel = mongoose.model("waitings", waitingSchema);

exports.validWaiting = (_reqBody) => {
    let joiSchema = Joi.object({
        user_id: Joi.string().required(),
        source: Joi.object({
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required()
        }).required(),
        destanition: Joi.object({
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required()
        }).required(),
        limit: Joi.object({
            date:Joi.date().iso(),
            hour:Joi.string()
        }),
        post_id: Joi.string().required(),
    });
    return joiSchema.validate(_reqBody);
};

