import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  getContinueWatching,
  saveContinueWatching,
} from "../continueWatchingService";

const ContinueWatching = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadContinueWatching = async () => {
      if (auth.currentUser) {
        const data = await getContinueWatching(auth.currentUser.uid);
        setMovies(data);
      }
    };

    loadContinueWatching();
  }, []);

  const resumeMovie = async (id) => {
    const movie = movies.find((movie) => movie.id === id);

    if (!movie) return;

    const updatedMovie = {
      ...movie,
      progress:
        movie.progress >= 100
          ? 100
          : (movie.progress || 0) + 10,
    };

    setMovies(
      movies.map((item) =>
        item.id === id ? updatedMovie : item
      )
    );

    if (auth.currentUser) {
      await saveContinueWatching(
        auth.currentUser.uid,
        updatedMovie
      );
    }
  };

  return (
    <div className="continue-section">
      <h1>Continue Watching</h1>

      {movies.length === 0 ? (
        <p>No movies to continue watching.</p>
      ) : (
        <div className="continue-list">
          {movies.map((movie) => (
            <div className="continue-card" key={movie.id}>
              <img
                src={movie.image}
                alt={movie.title}
              />

              <div className="continue-info">
                <h2>{movie.title}</h2>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${movie.progress || 0}%`,
                    }}
                  ></div>
                </div>

                <button
                  className="resume-btn"
                  onClick={() => resumeMovie(movie.id)}
                >
                  ▶ Resume Watching
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContinueWatching;
