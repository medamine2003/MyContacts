// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Auth",
      version: "1.0.0",
      description: "Documentation des routes Auth avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:8000/api", // base url de ton API
      },
    ],
  },
  apis: ["./routes/*.js"], // où chercher les annotations
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
