import React, { useState } from "react";
import "./index.css";

function MovieList() {
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://jsonmock.hackerrank.com/api/movies?Year=${year}`
      );
      const data = await response.json();
      setMovies(data.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setHasSearched(true);
    }
  };

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="number"
          className="large"
          placeholder="Enter Year eg 2015"
          data-testid="app-input"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button className="" data-testid="submit-button" onClick={handleSearch}>
          Search
        </button>
      </section>

      {/* Always render the UL (even if empty) */}
      <ul className="mt-50 styled" data-testid="movieList">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="slide-up-fade-in py-10">
            {movie.Title}
          </li>
        ))}
      </ul>

      {/* Show no-result message if search completed and no movies */}
      {hasSearched && movies.length === 0 && (
        <div className="mt-50 slide-up-fade-in" data-testid="no-result">
          No Results Found
        </div>
      )}
    </div>
  );
}

export default MovieList;
