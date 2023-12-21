const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
// דואג שהאפליקציה תכיר את הקובץ אינוורמינט שמכיל 
// משתנים סודיים והגדרות של השרת

const {routesInit} = require("./routes/config_routes")
require("./db/mongoConnect");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")))

routesInit(app);

const server = http.createServer(app);

// console.log("env",process.env.TEST, process.env.USER_DB)

let port = process.env.PORT || 3001
server.listen(port);