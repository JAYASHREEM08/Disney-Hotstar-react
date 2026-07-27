import { auth } from "../firebase/firebase";
import { addToWatchHistory } from "../watchHistoryService";
import { addToMyList } from "../myListService";

const MovieRow = ({ title, movies }) => {
  const handleMovieClick = async (movie) => {
    try {
      if (auth.currentUser) {
        await addToWatchHistory(auth.currentUser.uid, {
          id: movie.id,
          title: movie.title,
          thumbnail: movie.img,
        });
      }

      console.log("Selected movie:", movie.title);
    } catch (error) {
      console.error("Watch history error:", error);
    }
  };

  const handleAddToMyList = async (movie) => {
    try {
      await addToMyList(null, {
        id: movie.id,
        title: movie.title,
        image: movie.img,
        info: movie.info,
      });

      alert("Movie added to My List!");
    } catch (error) {
      console.error("My List error:", error);
      alert("Failed to add movie to My List");
    }
  };

  return (
    <section className="row">
      <h2>{title}</h2>

      <div className="slider">
        <button className="scroll-btn left-btn">
          &#10094;
        </button>

        <div className="poster-container">
          {movies.map((movie, index) => (
            <div
              className="movie-card"
              key={movie.id || index}
              onClick={() => handleMovieClick(movie)}
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
                    handleMovieClick(movie);
                  }}
                >
                  ▶ Watch Now
                </button>

                <button
                  className="my-list-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToMyList(movie);
                  }}
                >
                  + My List
                </button>
                <p className="info">{movie.info}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-btn right-btn">
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default MovieRow;
