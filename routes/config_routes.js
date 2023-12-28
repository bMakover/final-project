
const usersR = require("./users");
const postsR = require("./posts");
const demandR = require("./demands")
const waitingsR = require("./waitings");

exports.routesInit = (app) => {

  app.use("/users",usersR);
  app.use("/demands",demandR);
  app.use("/posts",postsR);
  app.use("/waitings",waitingsR);


}