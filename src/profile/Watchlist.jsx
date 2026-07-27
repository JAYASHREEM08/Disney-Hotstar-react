import React, { useState } from "react";

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    genre: "Action • Adventure",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    genre: "Action • Adventure",
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
  {
    id: 3,
    title: "Doctor Strange",
    genre: "Fantasy • Action",
    image: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
  },
  {
    id: 4,
    title: "Iron Man",
    genre: "Marvel Studios",
    image: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  },
];

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(movies);

  const removeMovie = (id) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== id));
  };

  return (
    <div className="watchlist-section">
      <h1>My Watchlist</h1>

      <div className="movie-grid">
        {watchlist.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img src={movie.image} alt={movie.title} />

            <h3>{movie.title}</h3>

            <p>{movie.genre}</p>

            <div className="movie-buttons">
              <button className="play-btn">▶ Play</button>

              <button
                className="remove-btn"
                onClick={() => removeMovie(movie.id)}
              >
                ❤ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {watchlist.length === 0 && (
        <h2 style={{ textAlign: "center", marginTop: "30px" }}>
          Your Watchlist is Empty
        </h2>
      )}
    </div>
  );
};

export default Watchlist;