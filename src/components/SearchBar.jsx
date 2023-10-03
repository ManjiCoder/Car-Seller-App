import React from "react";
import Wrapper from "@/components/Wrapper";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "@/store/features/searchSlice";
import { FaSearch } from "react-icons/fa";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

function SearchBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.cars);

  const [searchTerm, setSearchTerm] = useState(router.query.q || "");

  const setSearchQuery = (query) => {
    if (query.trim() === "") {
      dispatch(setQuery(""));
      return router.push(`cars?page=${page}`);
    }
    dispatch(setQuery(query));
    // Update the URL with the search query as a query parameter
    router.push(`cars?q=${encodeURIComponent(query)}&page=1`);
  };
  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setSearchQuery(value);
  };

  return (
    <Wrapper>
      <div>
        <div className="flex items-center relative">
          <input
            className="outline-none shadow-md bg-white py-1.5 px-5  placeholder:font-medium font-bold w-80 rounded-full"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm === "" && (
            <FaSearch className="absolute right-5 text-blue-500" />
          )}
        </div>
      </div>
      <div className="flex items-center">
        <span>relevance</span>
        <button>
          <MdOutlineExpandLess  />
        </button>
      </div>
      <div className="flex items-center">
        <span>all brands</span>
        <button>
          <MdOutlineExpandMore />
        </button>
      </div>
    </Wrapper>
  );
}

export default SearchBar;
