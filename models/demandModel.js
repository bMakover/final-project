// 1
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let demandsSchema = new mongoose.Schema({
  idUser: String,
  source: {
    city: Joi.string().required(),
    street: Joi.string(),
    houseNumber: Joi.string()
  },
  destination: {
    city: Joi.string().required(),
    street: Joi.string(),
    houseNumber: Joi.string()
  },
  limitDate: Date
})

exports.DemandsModel = mongoose.model("demands", demandsSchema);
exports.validDemand = (_reqBody) => {
  let joiSchema = Joi.object({
    idUser: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
    source:Joi.object({
      city: Joi.string().required(),
      street: Joi.string(),
      houseNumber: Joi.string()
    }),
    destination: Joi.object({
      city: Joi.string().required(),
      street: Joi.string(),
      houseNumber: Joi.string()
    }),
    limitDate: Joi.date().required()
  })
  return joiSchema.validate(_reqBody);
}