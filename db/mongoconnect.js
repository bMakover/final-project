
const mongoose = require('mongoose');
const {config}=require("../config/secret");
main().catch(err => console.log(err));

async function main() {
   mongoose.set('strictQuery' , false);

  await mongoose.connect(`mongodb+srv://batsheva:batsheva4050@cluster0.zrwj8um.mongodb.net/finalProject `);
  console.log("mongo connect success started");
}