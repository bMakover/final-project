// 1
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let postsSchema = new mongoose.Schema({
  isDisplay: Boolean,
  idDriver: String,
  source: {
    city: String,
    street: String,
    houseNumber: String
  },
  destination: {
    city: String,
    street: String,
    houseNumber: String
  },
  description: String,
  seatsCount: Number,
  passengersList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }],
  waitingList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }],
  createDate: Date,
  updateDate: Date,
  departure: {
    date: Date,
    hour: String
  }
})

exports.PostsModel = mongoose.model("posts", postsSchema);
exports.validPost = (_reqBody) => {
  let joiSchema = Joi.object({
    isDisplay: Joi.boolean().allow(null),
    idDriver: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
    source: Joi.object({
      city: Joi.string().required(),
      street: Joi.string().allow(""),
      houseNumber: Joi.string().allow("")
    }),
    destination: Joi.object({
      city: Joi.string().required(),
      street: Joi.string().allow(""),
      houseNumber: Joi.string().allow("")
    }),
    description: Joi.string().min(3).max(10000).required(),
    seatsCount: Joi.number().min(1).required(),
    createDate: Joi.date().default(Date.now()),
    passengersList: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
    waitingList: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
    updateDate: Joi.date().allow(null),
    departure: Joi.object({
      date: Joi.date().required(),
      hour: Joi.string().required()
    })
  })
  return joiSchema.validate(_reqBody);
}