//Llamado e inicializacion d dependenccias
const express = require("express"); // se incluye el franwork express
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express(); //instancia de Express

//configuraciones
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
// app.use("/api/users", require("./api/users")); //se incluye el router de usuarios

// app.use("/api/v1/users", require("./api/v1/routes/user.routes"));

//Se incia el servidor en el puesto 4000
app.listen(app.get("port"), () => {
  console.log(`server running on port ${app.get("port")}  😜😉`);
});
