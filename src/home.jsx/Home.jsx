import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ContinueWatching from "./ContinueWatching";
import MovieRow from "./MovieRow";
import Footer from "./Footer";
import { trendingMovies, kidsShows, popularMovies } from "./data";

const Home = ({ user }) => {
  return (
    <div className="home-container">
      {/* Top Navigation */}
      <Navbar user={user} />

      {/* Featured Movie */}
      <HeroBanner />

      {/* Continue Watching */}
      <ContinueWatching />

      {/* Movie Categories */}
      <MovieRow title="Trending Now" movies={trendingMovies} />
      <MovieRow title="Kids Shows" movies={kidsShows} />
      <MovieRow title="Popular Movies" movies={popularMovies} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
