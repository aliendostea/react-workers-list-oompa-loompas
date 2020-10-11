import React from "react";
import PropTypes from 'prop-types';
/// sass
import "../sass/main.css";

const SearchInput = ({ handleChange, search }) => {
  return (
    <React.Fragment>
      <input
        type="text"
        className="form__search-input"
        name="search"
        placeholder="Search"
        onChange={handleChange}
        value={search}
      />
      <button className="form__search-btn">
        <img src={require("../img/ic_search.png")} alt="Search icon" />
      </button>
    </React.Fragment>
  );
};

SearchInput.prototype = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired
};

export default SearchInput;
