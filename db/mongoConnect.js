// getting-started.js
const mongoose = require('mongoose');
const {config} =require("../config/secret")
main().catch(err => console.log(err));

async function main() {
  mongoose.set("strictQuery",false)
  await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster1.l9r2h7r.mongodb.net/finalProjectDB`);
console.log("mongo good");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}