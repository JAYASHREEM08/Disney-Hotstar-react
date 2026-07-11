import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../home.jsx/Navbar';
import Footer from '../home.jsx/Footer';
import { trendingMovies, kidsShows, popularMovies } from '../home.jsx/data';
import './Search.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Synchronize component state with URL params
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Combine all movies and shows, removing duplicates
  const allMedia = useMemo(() => {
    const combined = [...trendingMovies, ...kidsShows, ...popularMovies];
    const unique = [];
    const seenIds = new Set();
    for (const item of combined) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        unique.push(item);
      }
    }
    return unique;
  }, []);

  // Map each item to categories
  const mediaWithCategories = useMemo(() => {
    return allMedia.map(item => {
      const tags = ['all'];
      const infoLower = item.info ? item.info.toLowerCase() : '';
      const titleLower = item.title ? item.title.toLowerCase() : '';
      
      // Determine if Kids Show or Movie
      const isKids = kidsShows.some(k => k.id === item.id) || infoLower.includes('kids') || infoLower.includes('cartoon');
      if (isKids) {
        tags.push('kids');
      } else {
        tags.push('movies');
      }

      // Check genres/keywords
      if (infoLower.includes('action') || titleLower.includes('action')) tags.push('action');
      if (infoLower.includes('comedy') || titleLower.includes('comedy')) tags.push('comedy');
      if (infoLower.includes('animation') || infoLower.includes('cartoon')) tags.push('animation');
      if (infoLower.includes('sci-fi') || titleLower.includes('sci-fi')) tags.push('sci-fi');
      if (infoLower.includes('drama') || titleLower.includes('drama')) tags.push('drama');
      if (infoLower.includes('adventure') || titleLower.includes('adventure')) tags.push('adventure');

      return {
        ...item,
        categories: tags
      };
    });
  }, [allMedia]);

  // Filter movies/shows based on query and selected category tag
  const filteredMedia = useMemo(() => {
    return mediaWithCategories.filter(item => {
      // 1. Matches Category
      const matchesCategory = selectedCategory === 'all' || item.categories.includes(selectedCategory);
      
      // 2. Matches Query
      const cleanQuery = query.trim().toLowerCase();
      const matchesQuery = !cleanQuery || 
        item.title.toLowerCase().includes(cleanQuery) || 
        (item.info && item.info.toLowerCase().includes(cleanQuery));

      return matchesCategory && matchesQuery;
    });
  }, [mediaWithCategories, query, selectedCategory]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setSearchParams({});
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleTrendingClick = (keyword) => {
    setQuery(keyword);
    setSearchParams({ q: keyword });
    setSelectedCategory('all'); // reset category filter for direct keyword search
  };

  const handleMovieClick = (id) => {
    window.location.href = `/detail?id=${id}`;
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'movies', label: 'Movies' },
    { id: 'kids', label: 'Kids & TV Shows' },
    { id: 'action', label: 'Action' },
    { id: 'animation', label: 'Animation' },
    { id: 'sci-fi', label: 'Sci-Fi' },
    { id: 'comedy', label: 'Comedy' },
  ];

  const trendingKeywords = [
    'Loki', 'Inside Out', 'Moana', 'Avengers', 'Bluey', 'Shinchan', 'Action', 'Sci-Fi'
  ];

  return (
    <div className="search-page-container" style={{ background: '#0f1014', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="search-page">
        <div className="search-header">
          <h1 className="search-title">Discover Movies & Shows</h1>
          
          <div className="search-bar-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-page-input"
              placeholder="Search by title, genre, or keywords..."
              value={query}
              onChange={handleSearchChange}
            />
            {query && (
              <button className="clear-search-btn" onClick={handleClearSearch}>
                ✕
              </button>
            )}
          </div>

          <div className="filter-categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-tag ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {query.trim() === '' ? (
          <div className="suggestions-section">
            <h3 className="suggestions-title">Trending Searches</h3>
            <div className="trending-keywords">
              {trendingKeywords.map((keyword) => (
                <button
                  key={keyword}
                  className="keyword-pill"
                  onClick={() => handleTrendingClick(keyword)}
                >
                  <span className="trend-icon">📈</span> {keyword}
                </button>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3 className="suggestions-title" style={{ marginBottom: '20px' }}>Popular Suggestions</h3>
              <div className="search-grid">
                {popularMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="search-card"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <img src={movie.img} alt={movie.title} />
                    <div className="search-card-name">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="search-card-details">
                      <button 
                        className="search-watch-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMovieClick(movie.id);
                        }}
                      >
                        ▶ Watch Now
                      </button>
                      <p className="search-card-info">{movie.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="results-info-section">
              <div className="results-count">
                Showing <span>{filteredMedia.length}</span> result{filteredMedia.length !== 1 ? 's' : ''} for "{query}"
              </div>
            </div>

            {filteredMedia.length > 0 ? (
              <div className="search-grid">
                {filteredMedia.map((movie) => (
                  <div
                    key={movie.id}
                    className="search-card"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <img src={movie.img} alt={movie.title} />
                    <div className="search-card-name">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="search-card-details">
                      <button 
                        className="search-watch-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMovieClick(movie.id);
                        }}
                      >
                        ▶ Watch Now
                      </button>
                      <p className="search-card-info">{movie.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results-container">
                <div className="no-results-icon">🔎</div>
                <h3 className="no-results-title">No Results Found</h3>
                <p className="no-results-text">
                  We couldn't find any matches for "{query}". Try checking your spelling or search using another term.
                </p>
                {(selectedCategory !== 'all') && (
                  <button 
                    className="clear-filters-btn" 
                    onClick={() => setSelectedCategory('all')}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Search;
