import { useEffect, useState } from "react";
import {
  getMyList,
  removeFromMyList,
} from "../myListService";

const MyList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMyList = async () => {
      const data = await getMyList(null);
      setMovies(data);
    };

    loadMyList();
  }, []);

  const handleRemove = async (movieId) => {
    await removeFromMyList(null, movieId);

    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="my-list-section">
      <h1>My List</h1>

      {movies.length === 0 ? (
        <p>No movies added to My List.</p>
      ) : (
        <div className="my-list-container">
          {movies.map((movie) => (
            <div
              className="my-list-card"
              key={movie.id}
            >
              <img
                src={movie.image}
                alt={movie.title}
              />

              <h3>{movie.title}</h3>

              <p>{movie.info}</p>

              <button
                onClick={() => handleRemove(movie.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;