// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyContacts API",
      version: "1.0.0",
      description: "Documentation des routes Auth et Contacts",
    },
    servers: [
      {
        url: "http://localhost:7000/api",
        description: "Serveur local"
      },
      {
        url: "https://mycontacts-1.onrender.com/api", // ← URL du BACKEND sur Render
        description: "Serveur de production"
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Entre ton token JWT ici"
        },
      },
    },
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };