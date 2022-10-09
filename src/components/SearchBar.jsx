import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() !== "") {
      navigate(`/search/${value}`);
    }
  };

  const handleKeyEnter = (e) => {
    if (e.key === 13) {
      handleSubmit();
    }
  };

  return (
    <form
      className="p-2 text-gray-500 focus-within:text-gray-200"
      onSubmit={handleSubmit}
      onKeyDown={(e) => handleKeyEnter(e)}
    >
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex items-center">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
        <input
          type="search"
          name="search-field"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchBar;
