// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const path = require("path");   // 👈 AGREGA ESTO

const app = express();

// ==============================
// Configuraciones
// ==============================
app.set("port", process.env.PORT || 4000);

// ==============================
// Middlewares
// ==============================
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// 👇 Habilitar CORS para permitir peticiones desde otros orígenes
app.use(
  cors({
    origin: "*", // Permite todos los orígenes (puedes restringirlo a tu dominio si quieres más seguridad)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ==============================
// Servir carpeta de imágenes
// ==============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// 

// ==============================
// Rutas
// ==============================
app.use("/api/v1/users", require("./api/v1/routes/user.routes"));
app.use("/api/v1/calls", require("./api/v1/routes/call.routes"));
app.use("/api/v1/cities", require("./api/v1/routes/city.routes"));
app.use("/api/v1/departments", require("./api/v1/routes/department.routes"));
app.use("/api/v1/roles", require("./api/v1/routes/role.routes"));
app.use("/api/v1/companies", require("./api/v1/routes/company.routes"));
app.use("/api/v1/requirements", require("./api/v1/routes/requirement.routes"));
app.use("/api/v1/targetAudiences", require("./api/v1/routes/targetAudience.routes"));
app.use("/api/v1/interests", require("./api/v1/routes/interest.routes"));
app.use("/api/v1/lines", require("./api/v1/routes/line.routes"));
app.use("/api/v1/favorites", require("./api/v1/routes/favorite.routes"));
app.use("/api/v1/callAdditionalInterests", require("./api/v1/routes/callAdditionalInterest.routes"));
app.use("/api/v1/callHistories", require("./api/v1/routes/callHistory.routes"));
app.use("/api/v1/requirementCategories", require("./api/v1/routes/requirementCategory.routes"));
app.use("/api/v1/requirementChecks", require("./api/v1/routes/requirementCheck.routes"));
app.use("/api/v1/requirementGroups", require("./api/v1/routes/requirementGroup.routes"));
app.use("/api/v1/userInterests", require("./api/v1/routes/userInterest.routes"));
app.use("/api/v1/institutions", require("./api/v1/routes/institution.routes"));
app.use("/api/v1/auths", require("./api/v1/routes/auth.routes"));

// ==============================
// Servidor
// ==============================
app.listen(app.get("port"), () => {
  console.log(`✅ Server running on port ${app.get("port")} 😜😉`);
});
