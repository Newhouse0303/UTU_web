//import axios from "axios";

// const promise = axios.get("http://localhost:3001/persons");
// console.log(promise);

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);

//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(<App />);

// const promise = axios.get("http://localhost:3001/persons");

// promise.then((response) => {
//   console.log(response);
// });

// axios.get("http://localhost:3001/persons").then((response) => {
//   const notes = response.data;
//   console.log(notes);
// });
