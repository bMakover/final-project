const indexR = require("./index");
const postsR = require("./posts");
const usersR = require("./users");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/posts",postsR);
  app.use("/users",usersR);
}