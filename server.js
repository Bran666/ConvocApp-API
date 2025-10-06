// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const { authenticateToken } = require("./middleware/authMiddleware");

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

// 👇 Habilitar CORS para permitir peticiones desde otros orígenes
app.use(
  cors({
    origin: "*", // Permite todos los orígenes (puedes restringirlo a tu dominio si quieres más seguridad)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  })
);

// ==============================
// Rutas
// ==============================
// Rutas públicas (no requieren autenticación)
app.use("/api/v1/auths", require("./api/v1/routes/auth.routes"));

app.use("/api/v1/users", require("./api/v1/routes/user.routes"));
app.use("/api/v1/calls", authenticateToken, require("./api/v1/routes/call.routes"));
app.use("/api/v1/cities", authenticateToken, require("./api/v1/routes/city.routes"));
app.use("/api/v1/departments", authenticateToken, require("./api/v1/routes/department.routes"));
app.use("/api/v1/roles", authenticateToken, require("./api/v1/routes/role.routes"));
app.use("/api/v1/companies", authenticateToken, require("./api/v1/routes/company.routes"));
app.use("/api/v1/requirements", authenticateToken, require("./api/v1/routes/requirement.routes"));
app.use("/api/v1/targetAudiences", authenticateToken, require("./api/v1/routes/targetAudience.routes"));
app.use("/api/v1/interests", authenticateToken, require("./api/v1/routes/interest.routes"));
app.use("/api/v1/lines", authenticateToken, require("./api/v1/routes/line.routes"));
app.use("/api/v1/favorites", authenticateToken, require("./api/v1/routes/favorite.routes"));
app.use("/api/v1/callAdditionalInterests", authenticateToken, require("./api/v1/routes/callAdditionalInterest.routes"));
app.use("/api/v1/callHistories", authenticateToken, require("./api/v1/routes/callHistory.routes"));
app.use("/api/v1/requirementCategories", authenticateToken, require("./api/v1/routes/requirementCategory.routes"));
app.use("/api/v1/requirementChecks", authenticateToken, require("./api/v1/routes/requirementCheck.routes"));
app.use("/api/v1/requirementGroups", authenticateToken, require("./api/v1/routes/requirementGroup.routes"));
app.use("/api/v1/userInterests", authenticateToken, require("./api/v1/routes/userInterest.routes"));
app.use("/api/v1/institutions", authenticateToken, require("./api/v1/routes/institution.routes"));

// ==============================
// Servidor
// ==============================
app.listen(app.get("port"), () => {
  console.log(`✅ Server running on port ${app.get("port")} 😜😉`);
});
