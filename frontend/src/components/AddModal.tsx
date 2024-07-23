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

interface AddMovieModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAdd: (newMovie: Movie) => void;
  nextId: number;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({
  isOpen,
  onRequestClose,
  onAdd,
  nextId,
}) => {
  const initialMovieState = React.useMemo(
    () => ({
      id: nextId,
      name: "",
      director: "",
      genre: "",
      year: new Date().getFullYear(),
      rating: 0,
    }),
    [nextId]
  );

  const [newMovie, setNewMovie] = useState<Movie>(initialMovieState);

  useEffect(() => {
    setNewMovie(initialMovieState);
  }, [nextId, initialMovieState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newMovie);
    setNewMovie(initialMovieState);
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
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newMovie.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Director</label>
          <input
            type="text"
            name="director"
            value={newMovie.director}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={newMovie.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={newMovie.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={newMovie.rating}
            onChange={handleChange}
            min={0}
            max={10}
            required
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </Modal>
  );
};

export default AddMovieModal;
