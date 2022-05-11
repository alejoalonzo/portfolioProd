"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

//cargar archivos de rutas
var project_routes = require("./routes/project");

//midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors
// Configurar cabeceras y cors
app.use((req, res, next) => {
  //cuando se publique el proyecto hay que sustituir la URL por el asterisco de la sig linea
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//rutas
/*
app.get("/", (req, res) => {
  res.status(200).send("<h1>Home</h1>");
});
app.get("/test", (req, res) => {
  res.status(200).send({
    message: "Test ok from Api Node.js",
  });
});
app.post("/test", (req, res) => {
  console.log(req.body.nombre);
  res.status(200).send({
    message: "Test ok from Api Node.js",
  });
});*/

app.use("/", express.static("client", { redirect: false }));
app.use("/api", project_routes);

app.get("*", function (req, res, next) {
  res.sendFile(path.resolve("client/index.html"));
});

//Exportar
module.exports = app;
