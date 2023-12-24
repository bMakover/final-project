const indexR = require("./index");
const postsR = require("./posts");
const usersR = require("./users");
const demandsR = require("./demands");
const eventsR = require("./events");
const waitingR = require("./waitings");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/posts",postsR);
  app.use("/users",usersR);
  app.use("/demands",demandsR)
  app.use("/events",eventsR)
  app.use("/waiting",waitingR)
}