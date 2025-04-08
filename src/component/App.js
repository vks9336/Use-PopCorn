import { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Loading from "./Main/MovieList/Loading";
import Logo from "./NavBar/Logo";
import Main from "./Main/Main";
import WatchedMoviesList from "./Main/MovieDetails/WatchedMoviesList";
import Box from "./Main/Box";
import MoviesList from "./Main/MovieList/MoviesList";
import MovieDetails from "./Main/MovieDetails/MovieDetails";
import ErrorMessage from "./Main/MovieList/ErrorMessage";
import Result from "./NavBar/Result";
import WatchedSummary from "./Main/MovieDetails/WatchedSummary";
import Search from "./NavBar/Search";
import useMovies from "./useMovies";
import useLocalStorage from "./useLocalStorage";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [watched, setWatched] = useLocalStorage([], "watched");

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleClose);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleClose() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Result movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleClose}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
