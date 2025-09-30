// const nodemailer = require("nodemailer");

// // Configuración para pruebas (ethereal.email)
// let transporter;

// // Función para crear un transporter de prueba si no hay credenciales configuradas
// const createTestAccount = async () => {
//   // Crear cuenta de prueba en ethereal.email (no envía correos reales, pero permite probar)
//   const testAccount = await nodemailer.createTestAccount();
  
//   // Crear un transporter con la cuenta de prueba
//   return nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   });
// };

// // Configuración del transporter basada en el dominio del correo
// const configureTransporter = (email, password) => {
//   if (!email || !password) {
//     console.log("Credenciales de correo no proporcionadas. Se usará una cuenta de prueba.");
//     return null;
//   }

//   // Configuración para Outlook/Hotmail
//   if (email.includes('outlook.com') || email.includes('hotmail.com')) {
//     return nodemailer.createTransport({
//       host: 'smtp-mail.outlook.com',
//       port: 587,
//       secure: false,
//       auth: { 
//         user: email, 
//         pass: password 
//       },
//       authMethod: 'LOGIN', // Forzar método de autenticación
//       requireTLS: true,
//       tls: {
//         minVersion: 'TLSv1.2',
//         rejectUnauthorized: false
//       }
//     });
//   } 
//   // Configuración para Gmail
//   else if (email.includes('gmail.com')) {
//     return nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: { user: email, pass: password }
//     });
//   }
//   // Configuración para Yahoo
//   else if (email.includes('yahoo.com')) {
//     return nodemailer.createTransport({
//       host: 'smtp.mail.yahoo.com',
//       port: 587,
//       secure: false,
//       auth: { user: email, pass: password }
//     });
//   }
//   // Configuración para iCloud
//   else if (email.includes('icloud.com')) {
//     return nodemailer.createTransport({
//       host: 'smtp.mail.me.com',
//       port: 587,
//       secure: false,
//       auth: { user: email, pass: password }
//     });
//   }
//   // Configuración genérica para otros proveedores
//   else {
//     const domain = email.split('@')[1];
//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST || `smtp.${domain}`,
//       port: process.env.EMAIL_PORT || 587,
//       secure: process.env.EMAIL_SECURE === 'true',
//       auth: { user: email, pass: password }
//     });
//   }
// };

// // Ya no intentamos usar credenciales de variables de entorno
// // Cada envío de correo usará las credenciales del usuario que lo solicita
// console.log("Sistema configurado para usar correos de usuarios registrados.");

// /**
//  * Envía un correo electrónico con opciones dinámicas.
//  * @param {Object} options - Opciones del correo.
//  * @param {string} options.to - Destinatario.
//  * @param {string} options.subject - Asunto del correo.
//  * @param {string} [options.text] - Texto plano del mensaje.
//  * @param {string} [options.html] - Contenido HTML del mensaje.
//  * @returns {Promise}
//  */
// const sendEmail = async ({ to, subject, text, html }) => {
//   let isTestAccount = false;
//   let currentTransporter;
  
//   // Verificar si existen las variables de entorno para el servicio de correo
//   if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
//     try {
//       // Configuración para SendGrid (servicio profesional de envío de correos)
//       currentTransporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST || 'smtp.sendgrid.net',
//         port: process.env.EMAIL_PORT || 587,
//         secure: process.env.EMAIL_SECURE === 'true',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS
//         }
//       });
//       console.log("Transportador SMTP configurado para envío de correos reales");
//     } catch (error) {
//       console.error("Error al configurar transportador SMTP:", error);
//       // Si falla, intentamos con cuenta de prueba
//       currentTransporter = await createFallbackAccount();
//     }
//   } else {
//     // Si no hay credenciales, usamos cuenta de prueba
//     console.log("No se encontraron credenciales de correo en variables de entorno");
//     currentTransporter = await createFallbackAccount();
//   }
  
//   // Función para crear cuenta de fallback
//   async function createFallbackAccount() {
//     try {
//       const testAccount = await createTestAccount();
//       isTestAccount = true;
//       console.log("Usando cuenta de prueba Ethereal para envío de correos");
//       return testAccount;
//     } catch (etherealError) {
//       console.error("Error al crear cuenta de prueba:", etherealError);
//       throw new Error("No se pudo configurar el servicio de correo");
//     }
//   }

//   const mailOptions = {
//     from: process.env.EMAIL_FROM || '"Cronode CPIC" <noreply@cronode.com>',
//     to,
//     subject,
//     text,
//     html,
//   };

//   try {
//     const info = await currentTransporter.sendMail(mailOptions);
//     console.log("Correo enviado:", info.response);
    
//     // Mostrar la URL de vista previa de Ethereal
//     const previewUrl = isTestAccount ? nodemailer.getTestMessageUrl(info) : "No disponible para correos reales";
//     console.log("📧 IMPORTANTE - Vista previa del correo disponible en:", previewUrl);
//     console.log("👆 Abre esta URL para ver el correo enviado 👆");
    
//     return info;
//   } catch (error) {
//     console.error("Error al enviar el correo:", error);
//     throw error;
//   }
// };

// /**
//  * Envía correo de restablecimiento de contraseña (específico para tu controlador)
//  * @param {Object} user - Usuario que solicita el restablecimiento
//  * @param {string} resetToken - Token de restablecimiento
//  * @returns {Promise}
//  */
// const sendPasswordResetEmail = async (user, resetToken) => {
//   // Usar la URL del backend para el restablecimiento de contraseña
//   const resetLink = `http://127.0.0.1:4000/reset-password.html?token=${resetToken}`;
  
//   const subject = "Recuperación de contraseña - Cronode CPIC";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
//       <h2 style="color: #008550;">Cronode CPIC</h2>
//       <p>Hola <strong>${user.name}</strong>,</p>

//       <p>Recibimos una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>

//       <p>Para restablecer tu contraseña, haz clic en el siguiente botón:</p>

//       <div style="text-align: center; margin: 30px 0;">
//         <a href="${resetLink}" style="background-color: #008550; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
//           Restablecer Contraseña
//         </a>
//       </div>

//       <p>O también puedes copiar y pegar el siguiente enlace en tu navegador:</p>
//       <p style="word-break: break-all; color: #555;">${resetLink}</p>

//       <p>Este enlace expirará en <strong>1 hora</strong>.</p>

//       <hr style="margin-top: 40px;">
//       <p style="font-size: 12px; color: #888;">Este mensaje fue generado automáticamente por el Software de planificación de la FPI para grupos y ambientes de formación - C.P.I.C. No respondas a este correo.</p>
//     </div>
//   `;

//   return sendEmail({
//     to: user.email,
//     subject,
//     html
//   });
// };

// /**
//  * Envía correo de confirmación de cambio de contraseña
//  * @param {Object} user - Usuario que cambió la contraseña
//  * @returns {Promise}
//  */
// const sendPasswordChangedEmail = async (user) => {
//   const subject = "Contraseña Actualizada Exitosamente - Cronode CPIC";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
//       <h2 style="color: #008550;">Cronode CPIC</h2>
//       <p>Hola <strong>${user.name}</strong>,</p>
      
//       <p>Tu contraseña ha sido actualizada exitosamente.</p>
      
//       <p>Si no realizaste este cambio, por favor contacta al administrador inmediatamente.</p>

//       <div style="text-align: center; margin: 30px 0;">
//         <div style="background-color: #f0f8f0; color: #008550; padding: 15px; border-radius: 5px; border: 1px solid #008550;">
//           <strong>Contraseña actualizada correctamente</strong>
//         </div>
//       </div>

//       <p style="color: #666; font-size: 12px; margin-top: 30px;">
//         Fecha de actualización: ${new Date().toLocaleString('es-ES')}
//       </p>
      
//       <hr style="margin-top: 40px;">
//       <p style="font-size: 12px; color: #888;">Este mensaje fue generado automáticamente. No respondas a este correo.</p>
//     </div>
//   `;

//   return sendEmail({
//     to: user.email,
//     subject,
//     html
//   });
// };

// module.exports = {
//   sendEmail,
//   sendPasswordResetEmail,
//   sendPasswordChangedEmail
// };


const nodemailer = require("nodemailer");

// Configuración para pruebas (ethereal.email)
let transporter;

// Función para crear un transporter de prueba si no hay credenciales configuradas
const createTestAccount = async () => {
  const testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

console.log("📧 Sistema configurado para usar credenciales desde .env (SMTP_*)");

/**
 * Envía un correo electrónico con opciones dinámicas.
 * @param {Object} options - Opciones del correo.
 * @param {string} options.to - Destinatario.
 * @param {string} options.subject - Asunto del correo.
 * @param {string} [options.text] - Texto plano del mensaje.
 * @param {string} [options.html] - Contenido HTML del mensaje.
 * @returns {Promise}
 */
const sendEmail = async ({ to, subject, text, html }) => {
  let isTestAccount = false;
  let currentTransporter;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      currentTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      console.log("✅ Transportador SMTP configurado con credenciales reales");
    } catch (error) {
      console.error("❌ Error al configurar transportador SMTP:", error);
      currentTransporter = await createFallbackAccount();
    }
  } else {
    console.log("⚠️ No se encontraron credenciales de correo en variables de entorno");
    currentTransporter = await createFallbackAccount();
  }

  async function createFallbackAccount() {
    try {
      const testAccount = await createTestAccount();
      isTestAccount = true;
      console.log("📩 Usando cuenta de prueba Ethereal para envío de correos");
      return testAccount;
    } catch (etherealError) {
      console.error("Error al crear cuenta de prueba:", etherealError);
      throw new Error("No se pudo configurar el servicio de correo");
    }
  }

  const mailOptions = {
    from: process.env.SMTP_USER || "no-reply@cronode.com",
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await currentTransporter.sendMail(mailOptions);
    console.log("📨 Correo enviado:", info.response);

    const previewUrl = isTestAccount
      ? nodemailer.getTestMessageUrl(info)
      : "Correo real enviado (no hay URL de vista previa)";
    console.log("🔗 Vista previa:", previewUrl);

    return info;
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    throw error;
  }
};

// 📌 Restablecimiento de contraseña
const sendPasswordResetEmail = async (user, resetToken) => {
  // Aquí usamos la variable de entorno APP_URL para no tener "undefined"
  const baseUrl = process.env.APP_URL || "http://127.0.0.1:4000";
  const resetLink = `${baseUrl}/reset-password.html?token=${resetToken}`;

  const subject = "Recuperación de contraseña - Cronode CPIC";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #008550;">Cronode CPIC</h2>
      <p>Hola <strong>${user.name}</strong>,</p>
      <p>Recibimos una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>
      <p>Para restablecer tu contraseña, haz clic en el siguiente botón:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #008550; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Restablecer Contraseña
        </a>
      </div>
      <p>O copia este enlace en tu navegador:</p>
      <p style="word-break: break-all; color: #555;">${resetLink}</p>
      <p>Este enlace expirará en <strong>1 hora</strong>.</p>
    </div>
  `;

  return sendEmail({ to: user.email, subject, html });
};

// 📌 Confirmación de cambio de contraseña
const sendPasswordChangedEmail = async (user) => {
  const subject = "Contraseña Actualizada Exitosamente - Cronode CPIC";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #008550;">Cronode CPIC</h2>
      <p>Hola <strong>${user.name}</strong>,</p>
      <p>Tu contraseña ha sido actualizada exitosamente.</p>
      <p>Si no realizaste este cambio, contacta al administrador de inmediato.</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #f0f8f0; color: #008550; padding: 15px; border-radius: 5px; border: 1px solid #008550;">
          <strong>Contraseña actualizada correctamente</strong>
        </div>
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Fecha de actualización: ${new Date().toLocaleString("es-ES")}
      </p>
    </div>
  `;

  return sendEmail({ to: user.email, subject, html });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
};
