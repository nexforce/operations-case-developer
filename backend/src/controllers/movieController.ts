import { Request, Response } from "express";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../services/movieService";

export const getMoviesController = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Get all movies'
    #swagger.description = 'This endpoint will return  all movies
  */
  try {
    const movies = await getMovies();
    res.status(200).json(movies);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getMovieByIdController = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Get a movie by ID'
    #swagger.description = 'This endpoint will return a movie by ID
    #swagger.requestBody = false
  */
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const movie = await getMovieById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createMovieController = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Create a new movie'
    #swagger.description = 'This endpoint will create a new movie
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/Movie'
          }  
        }
      }
    } 
  */
  try {
    const requiredFields = ["name", "director", "genre", "year", "rating"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );
    if (missingFields.length) {
      return res
        .status(400)
        .json({ message: `Missing required fields: ${missingFields}` });
    }
    const movie = await createMovie(req.body);
    res.status(201).json(movie);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMovieController = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Update a movie by ID'
    #swagger.description = 'This endpoint will update a movie by ID
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/Movie'
          }
        }
      }
    }

  */
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const movie = await updateMovie(id, req.body);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMovieController = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Delete a movie by ID'
    #swagger.description = 'This endpoint will delete a movie by ID
  */
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const movie = await deleteMovie(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
