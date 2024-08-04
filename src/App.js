import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

// b9c593b API FOR MOVIE APP

const API_URL = 'http://www.omdbapi.com?apikey=b9c593bs=';

const App = () => {
  const [movies, setmovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0)

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();


    setmovies(data.Search);
    setTotalResults(data.totalResults || 0);
    // mainly for checking the data value
    console.log(data);

  }


  useEffect(() => {
    searchMovies('movie');
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm);
    }
  };



  return (

    <div className='app'>
      <h1 >MOVIEPUB</h1>

      <div className='search'>
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Add onkeyPress handler


        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)} // keep the click functionality
        />
      </div>
      <div className="results">

        {totalResults > 0 && <p>Total Results found: {totalResults}</p>}
      </div>

      {
        movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) :

          (
            <div className='empty'>
              <h2>NO MOVIES FOUND</h2>
            </div>
          )
      }


    </div>

  );
}

export default App;
