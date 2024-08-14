import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { state, setState } = useContext(MyContext);
  const { id } = useParams();
  const book = state.selectedBook;

  useEffect(() => {
    axios.get(`https://gutendex.com/books/?ids=${id}`).then((data) => {
      console.log(data.data, "data.data.results[0]");
      setState({ ...state, selectedBook: data.data.results[0], loader: false });
    });
  }, []);

  return (
    <>
      {state.loader ? (
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
        <div
          style={{
            backgroundColor: "#fdf5dc",
            padding: "20px",
            fontFamily: "Courier New, Courier, monospace",
            textAlign: "left"
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ textAlign: "center" }}>{book?.title}</h2>
            <p style={{ textAlign: "center" }}>
              Author: {book?.authors[0]?.name} ({book?.authors[0]?.birth_year} -{" "}
              {book?.authors[0]?.death_year})
            </p>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Subjects:</strong>
            <ul>
              {book?.subjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Languages:</strong>
            <ul>
              {book?.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Bookshelves:</strong>
            <ul>
              {book?.bookshelves.map((shelf, index) => (
                <li key={index}>{shelf}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Download Formats:</strong>
            <ul>
              {Object.keys(book?.formats)?.map((format, index) => (
                <li key={index}>
                  <a href={book?.formats[format]}>{format}</a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={book?.formats["image/jpeg"]}
              alt="Book Cover"
              style={{ maxWidth: "200px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
