import { Router } from "express";
import {
  getMoviesController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
} from "../controllers/movieController";

const movieRoutes = Router();

movieRoutes.get("/movies/", getMoviesController);
movieRoutes.get("/movies/:id", getMovieByIdController);
movieRoutes.post("/movies/", createMovieController);
movieRoutes.patch("/movies/:id", updateMovieController);
movieRoutes.delete("/movies/:id", deleteMovieController);

export default movieRoutes;
