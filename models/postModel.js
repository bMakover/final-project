// 1
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let postsSchema = new mongoose.Schema({
  isDisplay: Boolean,
  idDriver: String,
  source: String,
  destination: String,
  description: String,
  seatsCount: Number,
  passengersList: [String],
  waitingList: [String],
  createDate: Date,
  updateDate: Date
})

exports.PostsModel = mongoose.model("posts", postsSchema);
exports.validPost = (_reqBody) => {
  let joiSchema = Joi.object({
    isDisplay:Joi.boolean().allow(null),
    idDriver: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
    source: Joi.string().min(3).max(99).required(),
    destination: Joi.string().min(3).max(99).required(),
    description:Joi.string().min(3).max(10000).required(),
    seatsCount: Joi.number().min(1).required(),
    createDate: Joi.date().default(Date.now()),
    passengersList:Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
    waitingList:Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).allow(null),
    updateDate:Joi.date().allow(null)
  })
  return joiSchema.validate(_reqBody);
}