import React, { useEffect, useState, useCallback, useContext } from "react";
import "../Css/Books.css";
import axios from "axios";
import Back from "../Assets/Back.svg";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { MyContext } from "../MyContext";

const Books = () => {
  const { state, setState } = useContext(MyContext);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchBooks = () => {
      setLoading(true);

      const searchUrl = debouncedSearchQuery
        ? `https://gutendex.com/books?search=${encodeURIComponent(
            debouncedSearchQuery
          )}`
        : `https://gutendex.com/books?topic=${category?.toLowerCase()}`;

      axios
        .get(searchUrl)
        .then((data) => {
          setState({ ...state, books: data.data.results });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
          setLoading(false);
        });
    };

    fetchBooks();
  }, [category, debouncedSearchQuery]);

  const navigateTo = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handelNavigation = (ele)=>{
    console.log(ele, 'ele')
    navigateTo(`/books/details/${ele.id}`)
  }

  return (
    <>
      <div className="books-container">
        <div
          style={{
            display: "flex",
            gap: "2%",
            marginTop: "2%",
            marginBottom: "2%",
          }}
        >
          <img
            src={Back}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigateTo("/");
            }}
            alt="Go Back"
          />
          <h2 className="category-title">{category.toLocaleUpperCase()}</h2>
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div
        className="books-container"
        style={{
          background: "#F8F7FF",
          height: "73vh",
          overflow: "auto",
          paddingTop: "2%",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="books-grid">
            {state.books.length > 0 ? (
              state.books.map((book, index) => (
                <div key={index} className="book-card" onClick={()=>{handelNavigation(book)}}>
                  <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    className="book-cover"
                  />
                  <p className="book-title">{book.title}</p>
                  <p className="book-author">{book.authors[0]?.name}</p>
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Books;
