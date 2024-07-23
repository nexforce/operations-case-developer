import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import movieRoutes from "./routes/movieRoutes";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", movieRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});

export default app;