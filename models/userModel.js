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
        houseNumber: String
    },
    defaultDestination: {
        city: String,
        street: String,
        houseNumber: String
    },
    travels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    }],
    waits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
    }],
    demands: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "demands",
    }],
    myPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    }],
    //for drivers:
    carDescription: {
        brand: String,
        color: String,
        seatsNumber: Number
    },
    pickUpLocation: String
   ,
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
        image: Joi.string().allow(null),
        location: Joi.object({
            city: Joi.string(),
            street: Joi.string(),
            houseNumber: Joi.string()
        }),
        defaultDestination: Joi.object({
            city: Joi.string(),
            street: Joi.string(),
            houseNumber: Joi.string()
        }),
        travels: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        waits: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        demands: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        myPosts: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        carDescription: Joi.object({
            brand: Joi.string().allow(null),
            color: Joi.string().allow(null),
            seatsNumber: Joi.number().allow(null)
        }).allow(null),
        pickUpLocation:Joi.string().allow("")
       ,
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





exports.validEditUser = (_reqBody) => {
    let joiSchema = Joi.object({
        fullName: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(2).max(99).email().required(),
        phone: Joi.string().required(),
        image: Joi.string(),
        location: Joi.object({
            city: Joi.string(),
            street: Joi.string(),
            houseNumber: Joi.string()
        }),
        defaultDestination: Joi.object({
            city: Joi.string(),
            street: Joi.string(),
            houseNumber: Joi.string()
        }),
        travels: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        waits: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        demands: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        myPosts: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
        carDescription: Joi.object({
            brand: Joi.string().allow(null),
            color: Joi.string().allow(null),
            seatsNumber: Joi.number().allow(null)
        }).allow(null),
        pickUpLocation:Joi.string().allow("")
       ,
        isDriver: Joi.boolean(),
        isActive: Joi.boolean(),
        dateCreated: Joi.date().iso(),
        role: Joi.string()
    });



    return joiSchema.validate(_reqBody);
};

