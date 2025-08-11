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

app.use("/api/v1/users", require("./api/v1/routes/user.routes"));
app.use("/api/v1/calls", require("./api/v1/routes/call.routes"));
app.use("/api/v1/cities", require("./api/v1/routes/city.routes"));
app.use("/api/v1/departments", require("./api/v1/routes/department.routes"));
app.use("/api/v1/roles", require("./api/v1/routes/role.routes"));
app.use("/api/v1/companies", require("./api/v1/routes/company.routes"));
app.use("/api/v1/requirements", require("./api/v1/routes/requirement.routes"));

//Se incia el servidor en el puesto 4000 
app.listen(app.get("port"), () => {
  console.log(`server running on port ${app.get("port")}  😜😉`);
});
