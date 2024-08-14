import React, { useState } from "react";
import "./App.css";
import Category from "./Components/Category";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Book from "./Components/Books";
import Adventure from "./Assets/Adventure.svg";
import Drama from "./Assets/Adventure.svg";
import Fiction from "./Assets/Fiction.svg";
import History from "./Assets/History.svg";
import Humour from "./Assets/Humour.svg";
import Philosophy from "./Assets/Philosophy.svg";
import Politics from "./Assets/Politics.svg";
import BookDetails from "./Components/BookDetails";
import { MyContext } from "./MyContext";

function App() {
  const [state, setState] = useState({
    selectedBook: "",
    books: [],
    loader: true
  })
  const categories = [
    { name: "FICTION", icon: Fiction, path: "Fiction" },
    { name: "DRAMA", icon: Drama, path: "Drama" },
    { name: "HUMOUR", icon: Humour, path: "Humour" },
    { name: "POLITICS", icon: Politics, path: "Politics" },
    { name: "PHILOSOPHY", icon: Philosophy, path: "Philosophy" },
    { name: "HISTORY", icon: History, path: "History" },
    { name: "ADVENTURE", icon: Adventure, path: "Adventure" },
  ];

  return (
    <MyContext.Provider value={{ state, setState }}>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Category categories={categories} />} />
          <Route path="/books/:category" element={<Book />} />
          <Route path="/books/details/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
    </MyContext.Provider>
  );
}

export default App;
