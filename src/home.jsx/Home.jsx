import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import ContinueWatching from './ContinueWatching';
import MovieRow from './MovieRow';
import Footer from './Footer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { trendingMovies as fallbackTrending, kidsShows as fallbackKids, popularMovies as fallbackPopular } from './data';

const Home = () => {
  const [movies, setMovies] = useState({
    trending: [],
    kids: [],
    popular: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCol = collection(db, 'movies');
        const snapshot = await getDocs(moviesCol);

        const trending = [];
        const kids = [];
        const popular = [];

        snapshot.docs.forEach((doc) => {
          const movieData = doc.data();
          const movie = {
            id: doc.id,
            title: movieData.title || 'Untitled',
            img: movieData.img || movieData.image || '',
            info: movieData.info || movieData.description || '',
            category: movieData.category || '',
          };

          const category = String(movie.category).toLowerCase();

          if (category.includes('trending')) {
            trending.push(movie);
          } else if (category.includes('kids')) {
            kids.push(movie);
          } else if (category.includes('popular')) {
            popular.push(movie);
          } else {
            trending.push(movie);
          }
        });

        setMovies({ trending, kids, popular });
      } catch (firestoreError) {
        console.error('Error fetching movies from Firestore:', firestoreError);
        setError('Could not load movies from Firestore. Showing default movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const trending = movies.trending.length > 0 ? movies.trending : fallbackTrending;
  const kids = movies.kids.length > 0 ? movies.kids : fallbackKids;
  const popular = movies.popular.length > 0 ? movies.popular : fallbackPopular;

  return (
    <div className="home-container">
      {/* 1. The Top Navigation */}
      <Navbar />

      {/* 2. The Big Featured Movie */}
      <HeroBanner />

      {/* 3. The User's Watch History */}
      <ContinueWatching />

      {loading && <div className="loading-text">Loading movies from Firestore...</div>}
      {error && <div className="error-text">{error}</div>}

      {/* 4. The Movie Categories (Reusing the MovieRow component) */}
      <MovieRow title="Trending Now" movies={trending} />
      <MovieRow title="Kids Shows" movies={kids} />
      <MovieRow title="Popular Movies" movies={popular} />

      {/* 5. The Bottom Footer */}
      <Footer />
    </div>
  );
};

export default Home;