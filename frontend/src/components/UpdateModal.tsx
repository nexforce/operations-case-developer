import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../styles/AddModal.module.css";

interface Movie {
  id: number;
  name: string;
  director: string;
  genre: string;
  year: number;
  rating: number;
}

interface UpdateMovieModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  movie: Movie | null;
  onUpdate: (updatedMovie: Movie) => void;
}

const UpdateMovieModal: React.FC<UpdateMovieModalProps> = ({
  isOpen,
  onRequestClose,
  movie,
  onUpdate,
}) => {
  const [updatedMovie, setUpdatedMovie] = useState<Movie | null>(movie);

  useEffect(() => {
    setUpdatedMovie(movie);
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedMovie) {
      setUpdatedMovie({
        ...updatedMovie,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedMovie) {
      onUpdate(updatedMovie);
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById("root") as HTMLElement}
      className={styles.modal}
      overlayClassName="Overlay"
    >
      <h2>Update Movie</h2>
      {updatedMovie && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID: {updatedMovie.id}</label>
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={updatedMovie.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Director</label>
            <input
              type="text"
              name="director"
              value={updatedMovie.director}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={updatedMovie.genre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Year</label>
            <input
              type="number"
              name="year"
              value={updatedMovie.year}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              value={updatedMovie.rating}
              onChange={handleChange}
              min={0}
              max={10}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
    </Modal>
  );
};

export default UpdateMovieModal;
