import React from "react";
import "../Css/Category.css";
import Pattern from "../Assets/Pattern.svg";
import Next from "../Assets/Next.svg";
import { useNavigate } from "react-router-dom";

function Category({ categories }) {
  const navigateTo = useNavigate();
  return (
    <>
      <header
        className="App-header"
        style={{ backgroundImage: `url(${Pattern})` }}
      >
        <h1 className="headding">Gutenberg Project</h1>
        <p className="para">
          A social cataloging website that allows you to freely search its
          database of books, annotations, and reviews.
        </p>
      </header>
      <div className="categories-parent">
        <div className="categories">
          {categories.map((category, index) => (
            <div
              className="category"
              onClick={() => {
                navigateTo(`books/${category.path.toLowerCase()}`);
              }}
            >
              <div className="category-content">
                <img className="category-icon" src={category.icon} />
                <div className="category-name">{category.name}</div>
              </div>
              <img className="category-arrow" src={Next} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
