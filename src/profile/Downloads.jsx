import React, { useState } from "react";

const initialDownloads = [
  {
    id: 1,
    title: "Frozen II",
    genre: "Animation",
    image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
  },
  {
    id: 2,
    title: "Moana",
    genre: "Adventure",
    image: "https://image.tmdb.org/t/p/w500/8bZ7guF94zZ91hM6xP8iTnS2Vek.jpg",
  },
  {
    id: 3,
    title: "The Lion King",
    genre: "Family",
    image: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    genre: "Action",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
];

const Downloads = () => {
  const [downloads, setDownloads] = useState(initialDownloads);

  const deleteMovie = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this download?"
    );

    if (confirmDelete) {
      setDownloads(downloads.filter((movie) => movie.id !== id));
    }
  };

  return (
    <div className="downloads-section">
      <h1>Downloads</h1>

      {downloads.length === 0 ? (
        <div className="empty-downloads">
          <h2>No Downloads Available</h2>
          <p>Download your favourite movies to watch offline.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {downloads.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.image} alt={movie.title} />

              <h3>{movie.title}</h3>

              <p>{movie.genre}</p>

              <div className="movie-buttons">
                <button className="play-btn">
                  ▶ Watch Offline
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteMovie(movie.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;