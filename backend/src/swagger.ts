import swaggerAutogen from "swagger-autogen";

const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Movies API",
    version: "1.0.0",
    description: "A simple Express Movies API",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  components: {
    schemas: {
      Movie: {
        name: "string",
        director: "string",
        year: 0,
        genre: "string",
        rating: 0,
      },
    },
  },
};
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/movieRoutes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(
  outputFile,
  endpointsFiles,
  swaggerOptions
);
