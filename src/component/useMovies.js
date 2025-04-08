import { useState, useEffect } from "react";

export default function useMovies(query, handleClose) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  //Api key
  const KEY = "48c6388e";

  useEffect(
    function () {
      const controller = new AbortController();

      //fetching movies from the api
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies.");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie Not Found!");

          setMovies(data.Search);
          setIsLoading(false);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 2) {
        setMovies([]);
        setError("");
        return;
      }

      // handleClose();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
