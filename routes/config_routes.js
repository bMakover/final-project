
const usersR = require("./users");
const eventR = require("./events");

exports.routesInit = (app) => {

  app.use("/users",usersR);
  app.use("/events",eventR)

}