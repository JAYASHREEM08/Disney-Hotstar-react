import React, { useState } from "react";

const initialMovies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    remaining: "48 Minutes Left",
    progress: 65,
  },
  {
    id: 2,
    title: "Loki - Episode 4",
    image: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg",
    remaining: "60% Completed",
    progress: 60,
  },
  {
    id: 3,
    title: "Moon Knight",
    image: "https://image.tmdb.org/t/p/w500/qpy8WPSQKZw6mY4ZtW3eP2m9xoM.jpg",
    remaining: "30 Minutes Left",
    progress: 80,
  },
];

const ContinueWatching = () => {
  const [movies, setMovies] = useState(initialMovies);

  const resumeMovie = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              progress: movie.progress >= 100 ? 100 : movie.progress + 10,
            }
          : movie
      )
    );
  };

  return (
    <div className="continue-section">
      <h1>Continue Watching</h1>

      <div className="continue-list">
        {movies.map((movie) => (
          <div className="continue-card" key={movie.id}>
            <img src={movie.image} alt={movie.title} />

            <div className="continue-info">
              <h2>{movie.title}</h2>

              <p>{movie.remaining}</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${movie.progress}%` }}
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
    </div>
  );
};

export default ContinueWatching;