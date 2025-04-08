import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./component/App";
// import StarRating from "./StarRating";

// function Test({ maxRating }) {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRating
//         maxRating={maxRating}
//         color="red"
//         size="50"
//         onSetRating={setMovieRating}
//       />
//       <p>This movie got {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
    />
    <StarRating maxRating={5} defaultRating={3} />
    <StarRating maxRating={10} size={24} color="red" className="test" />
    <Test maxRating={7} /> */}
  </React.StrictMode>
);
