import { average } from "../../App";

export default function WatchedSummary({ watched }) {
  const avgImdbRating = Number(
    average(watched.map((movie) => movie.imdbRating)).toFixed(1)
  );
  const avgUserRating = Number(
    average(watched.map((movie) => movie.userRating)).toFixed(1)
  );
  const totalRuntime = Number(
    watched.reduce((sum, movie) => sum + movie.runtime, 0) / 60
  ).toFixed(2);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{totalRuntime} hours</span>
        </p>
      </div>
    </div>
  );
}
