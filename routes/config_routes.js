
const usersR = require("./users");
const waitingsR = require("./waitings");

exports.routesInit = (app) => {

  app.use("/users",usersR);
  app.use("/waitings",waitingsR);


}