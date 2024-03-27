import React from "react";


export default function Search({location, handleChange, detectKey}) {
  console.log('location', location);
  
  return (
    <div className="search_bar">
      <input
        className="searchInput"
        type="text"
        placeholder="Search"
        value={location}
        onChange={(e) => handleChange(e)}
        onKeyUp={(e) => detectKey(e)}
      ></input>
      <div>BSDK</div>
    </div>
  );
}
