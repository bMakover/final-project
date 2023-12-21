// 1
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let demandsSchema = new mongoose.Schema({
  idUser: String,
  source: String,
  destination: String,
  limitDate: Date
})

exports.DemandsModel = mongoose.model("demands", demandsSchema);
exports.validDemand = (_reqBody) => {
  let joiSchema = Joi.object({
    idUser: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
    source: Joi.string().min(3).max(99).required(),
    destination: Joi.string().min(3).max(99).required(),
    limitDate: Joi.date().required()
  })
  return joiSchema.validate(_reqBody);
}