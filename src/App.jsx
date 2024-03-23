import "./App.css";
import { useMovies } from "./hooks/useMovies.js";
import { Movies } from "./components/Movies";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "just-debounce-it";
import { CircularProgress } from "@mui/material";
import Header from "./components/Header.jsx";

function useSearch() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput) {
      isFirstInput.current = query == "";
      return;
    }
    if (query == "") {
      setError("Ingrese texto");
      return;
    }
    if (query.match(/^\d+$/)) {
      setError("No ingrese numeros en la búsqueda");
    }
    setError(null);
  }, [query]);
  return { query, setQuery, error };
}

function App() {
  const { query, setQuery } = useSearch();
  const [sortYear, setSortYear] = useState(false);
  const [sortTitle, setSortTitle] = useState(false);
  const { movies, getMovies, loading } = useMovies({
    query,
    sortTitle,
    sortYear,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((query) => {
      getMovies({ query });
    }, 500),
    [getMovies]
  );

  const handleSortTitle = () => {
    setSortTitle(!sortTitle);
  };
  const handleSortYear = () => {
    setSortYear(!sortYear);
  };
  const handleChange = (event) => {
    setQuery(event.target.value);
    debouncedGetMovies(event.target.value);
  };

  return (
    <div className="app">
      <Header />
      <div className="form">
        <input
          className="sort-movies"
          type="checkbox"
          onChange={handleSortTitle}
          checked={sortTitle}
          name="sort"
        />
        <label className="sort-label">
          Ordernar
          <br />
          por Titulo
        </label>
        <input
          className="sort-movies"
          type="checkbox"
          onChange={handleSortYear}
          checked={sortYear}
          name="sort"
        />
        <label className="sort-label">
          Ordernar
          <br />
          por Año
        </label>
        <input
          className="input-search"
          type="text"
          onChange={handleChange}
          placeholder="Avenger, Lucy, Interestelar, ..."
        />
      </div>
      <main>{loading ? <CircularProgress /> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
