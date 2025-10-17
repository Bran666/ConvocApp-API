const User = require("../models").User;
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/email");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

module.exports = {
 // ✅ Método correcto para verificar código de recuperación
verifyCode: async function (req, res) {
  try {
    const { email, code } = req.body;

    // 🔹 Validar campos requeridos
    if (!email || !code) {
      return res.status(400).json({
        message: "Correo y código son requeridos",
      });
    }

    // 🔹 Buscar usuario con el código activo
    const user = await User.findOne({
      where: {
        email,
        isActive: true,
        password_reset_token: code,
        password_reset_expires: { [Op.gt]: new Date() }, // aún no expirado
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Código inválido o expirado",
      });
    }

    // 🔹 Código válido
    return res.status(200).json({
      message: "Código válido",
      valid: true,
    });
  } catch (error) {
    console.error("💥 Error en verifyCode:", error);
    return res.status(500).json({
      message: "Error al verificar el código",
      error:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
},


  // ============================================================
// 🔹 Autenticación de usuario
// ============================================================
authenticate: async function (req, res) {
  try {
    const { email, password } = req.body;

    // Buscar el usuario
    const data = await User.login(email, password);

    if (data.status === 200 && data.user) {
      const user = data.user;

      // ✅ Generar token con roleId incluido
      const token = jwt.sign(
        {
          userId: user.id,
          roleId: user.roleId, // 🔥 agregado correctamente
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // ✅ Enviar respuesta con toda la info necesaria
      return res.status(200).json({
        status: "ok",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId, // 👈 CORREGIDO
          role: user.role ? user.role.name : null,
          imgUser: user.imgUser || null,
        },
      });
    }

    // Si no pasa la autenticación
    return res.status(data.status || 401).json({
      status: "error",
      message: data.message || "Usuario o contraseña inválidos",
    });
  } catch (error) {
    console.error("Error en authenticate:", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }
},

  // Método getUserAuthenticated
  getUserAuthenticated: async function (req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          message: "Token de autorización requerido",
        });
      }

      let data = authHeader.split(" ");
      if (data[0] !== "Bearer" || !data[1]) {
        return res.status(400).json({
          message: "El token debe ser enviado junto a Bearer",
        });
      }

      let isValidToken = jwt.verify(data[1], process.env.JWT_SECRET);
      if (isValidToken) {
        // Obtener usuario actualizado de la base de datos
        const user = await User.findByPk(isValidToken.userId, {
          attributes: { exclude: ["password"] },
          include: [
            {
              association: "role",
              attributes: ["id", "name"],
            },
          ],
        });

        if (!user || !user.isActive) {
          return res.status(401).json({
            message: "Usuario no encontrado o inactivo",
          });
        }

        return res.status(200).json({
          user: {
            uId: user.id,
            name: user.name,
            rolId: user.rolId,
            rol: user.role ? user.role.name : null,
            email: user.email,
            imgUser: user.imgUser || null, // ✅ agrega este campo
          },
        });
      }
    } catch (error) {
      console.log("Error en getUserAuthenticated:", error);

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Token inválido",
        });
      }

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expirado",
        });
      }

      return res.status(500).json({
        message: "Error interno del servidor",
      });
    }
  },

  // Método forgotPassword adaptado a tus campos
  // Método forgotPassword adaptado para enviar código
  forgotPassword: async function (req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ message: "El correo electrónico es requerido" });
      }

      const user = await User.findOne({
        where: { email: email, isActive: true },
      });

      // Mensaje genérico
      const successMessage =
        "Si el email existe, recibirás un código de recuperación";

      if (!user) {
        return res.status(200).json({ message: successMessage });
      }

      // 🔹 Generar código de 6 dígitos
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Expira en 10 minutos
      const expires = Date.now() + 1000 * 60 * 10;

      await user.update({
        password_reset_token: code, // Guardamos el código
        password_reset_expires: new Date(expires),
      });

      // 🔹 Enviar correo con el código
      await sendEmail({
        to: user.email,
        subject: "Código de recuperación - Cronode CPIC",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #008550;">Cronode CPIC</h2>
          <p>Hola <strong>${user.name}</strong>,</p>
          <p>Tu código de recuperación es:</p>
          <h1 style="text-align:center; font-size: 36px; letter-spacing: 8px; color:#008550;">
            ${code}
          </h1>
          <p>Este código expirará en <strong>10 minutos</strong>.</p>
        </div>
      `,
      });

      return res.status(200).json({ message: successMessage });
    } catch (error) {
      console.error("Error en forgotPassword:", error);
      return res.status(500).json({
        message: "Error al procesar la solicitud de recuperación de contraseña",
      });
    }
  },

 resetPassword: async function (req, res) {
  try {
    const { email, code, newPassword } = req.body;

    // 🔹 Validar datos
    if (!email || !code || !newPassword) {
      return res.status(400).json({
        message: "Correo, código y nueva contraseña son requeridos",
      });
    }

    // 🔹 Buscar usuario con código válido y no expirado
    const user = await User.findOne({
      where: {
        email,
        isActive: true,
        password_reset_token: code,
        password_reset_expires: { [Op.gt]: new Date() }, // ✅ campo corregido
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Código inválido o expirado",
      });
    }

    // 🔹 Actualizar contraseña con hash seguro
    await User.updatePassword(user.id, newPassword);

    // 🔹 Limpiar token después del cambio
    await user.update({
      password_reset_token: null,
      password_reset_expires: null,
    });

    return res.status(200).json({
      message: "Contraseña actualizada con éxito ✅",
    });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    return res.status(500).json({
      message: "Error al cambiar la contraseña",
    });
  }
},


  // Método adicional para cambiar contraseña (cuando el usuario está autenticado)
  changePassword: async function (req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      // Obtener userId del token (asumiendo que tienes middleware de autenticación)
      const userId = req.userId || req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
      }

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Contraseña actual y nueva contraseña son requeridas",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "La nueva contraseña debe tener al menos 6 caracteres",
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      // Verificar contraseña actual usando el método del modelo
      const isCurrentPasswordValid = await user.authenticatePassword(
        currentPassword
      );

      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Contraseña actual incorrecta",
        });
      }

      // Actualizar contraseña usando el método del modelo
      await User.updatePassword(user.id, newPassword);

      res.status(200).json({
        success: true,
        message: "Contraseña cambiada exitosamente",
      });
    } catch (error) {
      console.error("Error en changePassword:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  },

  // Middleware de autenticación (opcional, para usar en rutas)
  authenticateToken: function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token de autorización requerido",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token no proporcionado",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado",
      });
    }
  },
 
};