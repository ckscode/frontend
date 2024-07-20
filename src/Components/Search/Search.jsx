import React from "react";
import "./Search.css";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, setSearch }) => {
  return (
    <div className="search">
      <BiSearch size={45} color="var(--color-primary)" className="icon" />
      <input
        type="text"
        placeholder="Search products"
        value={value}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
