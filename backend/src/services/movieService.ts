import { Pool } from "pg";
import { Movie } from "../models/movie";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

export const getMovies = async () => {
  const { rows } = await pool.query("SELECT * FROM movies");
  return rows;
};

export const getMovieById = async (id: number) => {
  const { rows } = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

export const createMovie = async (movie: Movie) => {
  const { name, director, year, genre, rating } = movie;
  const { rows } = await pool.query(
    "INSERT INTO movies (name, director, year, genre, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, director, year, genre, rating]
  );
  return rows[0];
};

export const updateMovie = async (id: number, movie: Partial<Movie>) => {
  const { rows } = await pool.query(
    "UPDATE movies SET name = COALESCE($1, name), director = COALESCE($2, director), year = COALESCE($3, year), genre = COALESCE($4, genre), rating = COALESCE($5, rating) WHERE id = $6 RETURNING *",
    [movie.name, movie.director, movie.year, movie.genre, movie.rating, id]
  );
  return rows[0];
};

export const deleteMovie = async (id: number) => {
  const { rows } = await pool.query(
    "DELETE FROM movies WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};
