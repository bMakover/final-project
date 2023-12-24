const mongoose = require("mongoose");
const Joi = require("joi");


const waitingSchema = new mongoose.Schema({
    user_id: String,
    source: {
        city: String,
        street: String,
        houseNumber: String
    },
    destanition: {
        city: String,
        street: String,
        houseNumber: String
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
            houseNumber: Joi.string().required()
        }).required(),
        destanition: Joi.object({
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.string().required()
        }).required(),
        limit: Joi.object({
            date:Joi.date().iso(),
            hour:Joi.string()
        }),
        post_id: Joi.string().required(),
    });
    return joiSchema.validate(_reqBody);
};

