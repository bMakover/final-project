
const usersR = require("./users");
exports.routesInit = (app) => {

  app.use("/users",usersR);

}