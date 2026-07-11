import React from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import ContinueWatching from './ContinueWatching';
import MovieRow from './MovieRow';
import Footer from './Footer';
import { trendingMovies, kidsShows, popularMovies } from './data';

const Home = () => {
  return (
    <div className="home-container">
      {/* 1. The Top Navigation */}
      <Navbar />

      {/* 2. The Big Featured Movie */}
      <HeroBanner />

      {/* 3. The User's Watch History */}
      <ContinueWatching />

      {/* 4. The Movie Categories (Reusing the MovieRow component) */}
      <MovieRow title="Trending Now" movies={trendingMovies} />
      <MovieRow title="Kids Shows" movies={kidsShows} />
      <MovieRow title="Popular Movies" movies={popularMovies} />

      {/* 5. The Bottom Footer */}
      <Footer />
    </div>
  );
};

export default Home;