const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    image: String,
    location: {
        city: String,
        street: String,
        houseNumber: Number
    },
    defaultDestination: {
        city: String,
        street: String,
        houseNumber: Number
    },
    travels: [String],
    waits: [String],
    demands: [String],
    //for drivers:
    carDescription: {
        brand: String,
        color: String,
        seatsNumber: Number
    },
    pickUpLocation: {
        location: String
    },
    isDriver: {
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "user"
    }
});

exports.UserModel = mongoose.model("users", userSchema);

exports.createToken = (_id, role) => {
    let token = jwt.sign({ _id, role }, config.tokenSecret, { expiresIn: "1h" });
    return token;
};

exports.validUser = (_reqBody) => {
    let joiSchema = Joi.object({
        fullName: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required(),
        phone: Joi.string().required(),
        image: Joi.string(),
        location: Joi.object({
            city: Joi.string(),
            street: Joi.string(),
            houseNumber: Joi.number()
        }),
        defaultDestination: Joi.object({
            city: Joi.string(),
            street: Joi.string(),
            houseNumber: Joi.number()
        }),
        travels: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        waits: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        demands: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        carDescription: Joi.object({
            brand: Joi.string(),
            color: Joi.string(),
            seatsNumber: Joi.number()
        }).allow(null),
        pickUpLocation: Joi.object({
            location: Joi.string()
        }).allow(null),
        isDriver: Joi.boolean(),
        isActive: Joi.boolean(),
        dateCreated: Joi.date().iso(),
        role: Joi.string()
    });



    return joiSchema.validate(_reqBody);
};

exports.validLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required()
    });

    return joiSchema.validate(_reqBody);
};
