const indexR = require("./index");
const postsR = require("./posts");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/posts",postsR);
}