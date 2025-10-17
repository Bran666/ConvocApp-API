'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Interests", [
      // Tecnología
      {
        name : "Desarrollo de Software",
        description : "Convocatorias relacionadas con la creación, desarrollo y mantenimiento de software.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Ciencia y Tecnología",
        description : "Apoyos para proyectos de Investigación, Desarrollo e Innovación (I+D+i) y divulgación científica.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Innovación y Emprendimiento",
        description : "Financiación, aceleradoras y concursos para startups y proyectos de base tecnológica.",
        createdAt : new Date(),
        updatedAt : new Date()
      },

      // Educación y Academia
      {
        name : "Becas de Estudio",
        description : "Ayudas económicas para estudios de pregrado, posgrado, doctorado y postdoctorado.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Movilidad Estudiantil",
        description : "Programas de intercambio y pasantías para estudiantes a nivel nacional e internacional.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Investigación",
        description : "Financiación para proyectos de investigación, así como estancias en centros académicos.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Cursos y Congresos",
        description : "Ayudas para la asistencia a cursos de especialización, congresos, seminarios y talleres.",
        createdAt : new Date(),
        updatedAt : new Date()
      },

      // Empleo y Desarrollo Profesional
      {
        name : "Empleo Público",
        description : "Concursos de méritos para acceder a cargos en entidades gubernamentales.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Pasantías y Prácticas",
        description : "Oportunidades para adquirir experiencia laboral en diferentes sectores.",
        createdAt : new Date(),
        updatedAt : new Date()
      },

      // Arte, Cultura y Deporte
      {
        name : "Arte y Cultura",
        description : "Ayudas, premios y becas para creación en artes visuales, escénicas, música, literatura y cine.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Deporte",
        description : "Subvenciones y apoyos para deportistas, equipos y la organización de eventos deportivos.",
        createdAt : new Date(),
        updatedAt : new Date()
      },

      // Social y Comunitario
      {
        name : "Desarrollo Social",
        description : "Financiación para iniciativas que buscan mejorar la calidad de vida de comunidades.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Voluntariado",
        description : "Oportunidades para participar en proyectos de voluntariado a nivel local e internacional.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Cooperación Internacional",
        description : "Proyectos de desarrollo en países del Sur Global y ayuda humanitaria.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Medio Ambiente y Sostenibilidad",
        description : "Ayudas para proyectos de conservación, protección del medio ambiente y desarrollo sostenible.",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Interests', null, {});
     */
     await queryInterface.bulkDelete('Interests', null, {});
  }
};