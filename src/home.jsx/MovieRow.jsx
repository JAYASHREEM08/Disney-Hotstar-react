import React from 'react';

const MovieRow = ({ title, movies }) => {
  const handleMovieClick = (id) => {
    window.location.href = `/detail?id=${id}`;
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <button className="scroll-btn left-btn">&#10094;</button>
        
        <div className="poster-container">
          {movies.map((movie, index) => (
            <div 
              className="movie-card" 
              key={index} 
              onClick={() => handleMovieClick(movie.id)}
            >
              <img src={movie.img} alt={movie.title} />
              
              <div className="movie-name">
                <h4>{movie.title}</h4>
              </div>
              
              <div className="movie-details">
                <button 
                  className="watch-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMovieClick(movie.id);
                  }}
                >
                  ▶ Watch Now
                </button>
                <p className="info">{movie.info}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="scroll-btn right-btn">&#10095;</button>
      </div>
    </section>
  );
};

export default MovieRow;