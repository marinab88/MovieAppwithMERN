import React, { useRef } from "react";
import { useHistory } from 'react-router-dom';

const Search = () => {
  const searchInputRef = useRef();
  const history = useHistory();

  const onSearchHandler = async (e) => {
    e.preventDefault();
    const query = { title: searchInputRef.current.value }
    const queryString = new URLSearchParams(query).toString();
    history.push({ pathname: '/movies', search: queryString });
    

  };

  return (
    <div>
      <form onChange={onSearchHandler} className="bd-search position-relative m-3">
        <input ref={searchInputRef} 
               className="search form-control  rounded-pill"
               type="text"
               placeholder="Search..." />
      </form>
    </div>
  );
};

export default Search;