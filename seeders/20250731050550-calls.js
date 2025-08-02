'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Calls', [
      {
        title: "Convocatoria de Innovación Social",
        description: "Descripción detallada de la convocatoria de innovación social incluyendo requisitos y criterios de evaluación.",
        resources: "Recursos disponibles para los participantes, incluyendo material de apoyo, asesorías y financiación.",
        callLink: "https://convocatorias.ejemplo.org/convocatoria-de-innovación-social",
        openDate: new Date("2025-06-13"),
        closeDate: new Date("2025-07-07"),
        pageName: "Convocatorias Nacionales",
        pageUrl: "https://convocatorias.ejemplo.org",
        objective: "El objetivo principal de la convocatoria de innovación social es fomentar la participación y el desarrollo sectorial.",
        notes: "Aplican términos y condiciones. Sujetos a cambios sin previo aviso.",
        imageUrl: "https://convocatorias.ejemplo.org/images/convocatoria-de-innovación-social.jpg",
        institutionId: 1,
        lineId: 1,
        targetAudienceId: 1,
        interestId: 1,
        userId: 1,
        clickCount: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Apoyo a Proyectos de Emprendimiento Juvenil",
        description: "Descripción detallada de la apoyo a proyectos de emprendimiento juvenil incluyendo requisitos y criterios de evaluación.",
        resources: "Recursos disponibles para los participantes, incluyendo material de apoyo, asesorías y financiación.",
        callLink: "https://convocatorias.ejemplo.org/apoyo-a-proyectos-de-emprendimiento-juvenil",
        openDate: new Date("2025-07-05"),
        closeDate: new Date("2025-08-11"),
        pageName: "Convocatorias Nacionales",
        pageUrl: "https://convocatorias.ejemplo.org",
        objective: "El objetivo principal de la apoyo a proyectos de emprendimiento juvenil es fomentar la participación y el desarrollo sectorial.",
        notes: "Aplican términos y condiciones. Sujetos a cambios sin previo aviso.",
        imageUrl: "https://convocatorias.ejemplo.org/images/apoyo-a-proyectos-de-emprendimiento-juvenil.jpg",
        institutionId: 1,
        lineId: 1,
        targetAudienceId: 1,
        interestId: 1,
        userId: 1,
        clickCount: 26,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Calls', {
      title: {
        [Sequelize.Op.in]: [
          "Convocatoria de Innovación Social",
          "Apoyo a Proyectos de Emprendimiento Juvenil"
        ]
      }
    }, {});
  }
};
