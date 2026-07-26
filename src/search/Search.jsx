import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../home.jsx/Navbar";
import Footer from "../home.jsx/Footer";
import {
  trendingMovies,
  kidsShows,
  popularMovies
} from "../home.jsx/data";

import "./Search.css";


const Search = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();


  const [query, setQuery] = useState(
    searchParams.get("q") || ""
  );

  const [selectedCategory, setSelectedCategory] =
    useState("all");



  // Sync URL search value

  useEffect(() => {

    setQuery(
      searchParams.get("q") || ""
    );

  }, [searchParams]);





  // Combine movies

  const allMedia = useMemo(() => {

    const combined = [
      ...trendingMovies,
      ...kidsShows,
      ...popularMovies
    ];


    const ids = new Set();


    return combined.filter(movie => {

      if(ids.has(movie.id)){
        return false;
      }

      ids.add(movie.id);

      return true;

    });


  }, []);






  // Add categories

  const mediaWithCategories = useMemo(() => {


    return allMedia.map(movie => {


      const title =
        movie.title?.toLowerCase() || "";


      const info =
        movie.info?.toLowerCase() || "";



      let categories = ["all"];



      const isKids =
        kidsShows.some(
          item => item.id === movie.id
        )
        ||
        info.includes("kids")
        ||
        info.includes("cartoon");



      if(isKids)
        categories.push("kids");
      else
        categories.push("movies");



      if(
        title.includes("action") ||
        info.includes("action")
      )
        categories.push("action");



      if(
        title.includes("comedy") ||
        info.includes("comedy")
      )
        categories.push("comedy");



      if(
        title.includes("animation") ||
        info.includes("animation") ||
        info.includes("cartoon")
      )
        categories.push("animation");



      if(
        title.includes("sci-fi") ||
        info.includes("sci-fi")
      )
        categories.push("sci-fi");



      return {
        ...movie,
        categories
      };


    });


  }, [allMedia]);






  // Filter results

  const filteredMedia = useMemo(() => {


    const text =
      query.trim().toLowerCase();



    return mediaWithCategories.filter(movie => {


      const matchCategory =
        selectedCategory === "all"
        ||
        movie.categories.includes(
          selectedCategory
        );



      const matchText =
        !text
        ||
        (movie.title || "")
        .toLowerCase()
        .includes(text)
        ||
        (movie.info || "")
        .toLowerCase()
        .includes(text);



      return matchCategory && matchText;


    });


  },[
    mediaWithCategories,
    query,
    selectedCategory
  ]);







  const handleSearchChange = (e)=>{


    const value = e.target.value;


    setQuery(value);


    if(value.trim()){

      setSearchParams({
        q:value
      });

    }
    else{

      setSearchParams({});

    }


  };







  const clearSearch = ()=>{

    setQuery("");

    setSearchParams({});

  };






  const openMovie = (id)=>{

    navigate(
      `/detail?id=${id}`
    );

  };







  const categories=[

    {
      id:"all",
      label:"All"
    },

    {
      id:"movies",
      label:"Movies"
    },

    {
      id:"kids",
      label:"Kids & TV Shows"
    },

    {
      id:"action",
      label:"Action"
    },

    {
      id:"animation",
      label:"Animation"
    },

    {
      id:"sci-fi",
      label:"Sci-Fi"
    },

    {
      id:"comedy",
      label:"Comedy"
    }

  ];







  const trendingKeywords=[

    "Loki",
    "Inside Out",
    "Moana",
    "Avengers",
    "Bluey",
    "Shinchan",
    "Action",
    "Sci-Fi"

  ];







  return (

    <div
      className="search-page-container"
      style={{
        background:"#0f1014",
        minHeight:"100vh",
        display:"flex",
        flexDirection:"column"
      }}
    >


      <Navbar />



      <main className="search-page">



        <div className="search-header">


          <h1 className="search-title">
            Discover Movies & Shows
          </h1>




          <div className="search-bar-container">


            <span>
              🔍
            </span>



            <input

              className="search-page-input"

              placeholder="Search movies..."

              value={query}

              onChange={handleSearchChange}

            />



            {
              query &&

              <button
                className="clear-search-btn"
                onClick={clearSearch}
              >
                ✕
              </button>

            }



          </div>






          <div className="filter-categories">


          {
            categories.map(cat=>(

              <button

                key={cat.id}

                className={
                  `category-tag ${
                    selectedCategory===cat.id
                    ?
                    "active"
                    :
                    ""
                  }`
                }


                onClick={()=>
                  setSelectedCategory(cat.id)
                }


              >

                {cat.label}

              </button>

            ))
          }


          </div>



        </div>







        {
          query.trim()==="" ?


          (

            <div className="suggestions-section">


              <h3 className="suggestions-title">
                Trending Searches
              </h3>



              <div className="trending-keywords">


              {
                trendingKeywords.map(word=>(

                  <button

                    key={word}

                    className="keyword-pill"

                    onClick={()=>{

                      setQuery(word);

                      setSearchParams({
                        q:word
                      });

                    }}

                  >

                    📈 {word}

                  </button>

                ))
              }


              </div>




              <h3 className="suggestions-title">
                Popular Suggestions
              </h3>



              <div className="search-grid">


              {
                popularMovies.map(movie=>(


                  <div

                    key={movie.id}

                    className="search-card"

                    onClick={()=>
                      openMovie(movie.id)
                    }

                  >


                    <img

                      src={movie.img}

                      alt={movie.title}

                    />


                    <h4>
                      {movie.title}
                    </h4>



                  </div>


                ))
              }



              </div>


            </div>


          )



          :


          (

            <>


            <div className="results-count">

              Showing {filteredMedia.length}
              {" "}
              results for "{query}"

            </div>





            <div className="search-grid">


            {
              filteredMedia.map(movie=>(


                <div

                  key={movie.id}

                  className="search-card"

                  onClick={()=>
                    openMovie(movie.id)
                  }

                >


                  <img

                    src={movie.img}

                    alt={movie.title}

                  />


                  <h4>
                    {movie.title}
                  </h4>


                  <p>
                    {movie.info}
                  </p>



                </div>


              ))
            }


            </div>


            </>


          )

        }





      </main>



      <Footer />


    </div>

  );


};


export default Search;
