import React, { useEffect, useState } from "react";
import UpdateMovieModal from "../components/UpdateModal";
import AddMovieModal from "../components/AddModal";
import api from "../api";

interface Movie {
  id: number;
  name: string;
  director: string;
  genre: string;
  year: number;
  rating: number;
}

const MoviesTable: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.get("/movies");
      setMovies(response.data);
      if (response.data.length > 0) {
        setNextId(
          Math.max(...response.data.map((movie: Movie) => movie.id)) + 1
        );
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const addMovie = async (newMovie: Movie) => {
    try {
      const response = await api.post("/movies", newMovie);
      setMovies([...movies, response.data]);
      setNextId(nextId + 1);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const openUpdateModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedMovie(null);
    setIsUpdateModalOpen(false);
  };

  const updateMovie = async (updatedMovie: Movie) => {
    try {
      await api.patch(`/movies/${updatedMovie.id}`, updatedMovie);
      const updatedMovies = movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
      setMovies(updatedMovies);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const deleteMovie = async (id: number) => {
    try {
      await api.delete(`/movies/${id}`);
      const updatedMovies = movies.filter((movie) => movie.id !== id);
      setMovies(updatedMovies);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  return (
    <div>
      <button onClick={openAddModal} style={{ margin: "50px 100px 0 100px" }} className="add-button">
        Add New Movie
      </button>
      <label>Filter by Genre: </label>
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="All">All</option>
        {Array.from(new Set(movies.map((movie) => movie.genre))).map(
          (genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          )
        )}
      </select>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Director</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.name}</td>
              <td>{movie.director}</td>
              <td>{movie.genre}</td>
              <td>{movie.year}</td>
              <td>{movie.rating}</td>
              <td>
                <button
                  className="update-button"
                  onClick={() => openUpdateModal(movie)}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteMovie(movie.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateMovieModal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        movie={selectedMovie}
        onUpdate={updateMovie}
      />
      <AddMovieModal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        onAdd={addMovie}
        nextId={nextId}
      />
    </div>
  );
};

export default MoviesTable;
