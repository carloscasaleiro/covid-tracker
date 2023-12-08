import React from "react";
import Country from "./country";

function CountriesList({ data, selected, handleSearch}) {
  if (data.length > 0) {
    data = selected
      ? data.sort((a, b) => b.deaths - a.deaths)
      : data.sort((a, b) => b.cases - a.cases);
  }

  return (
    <div className="countries-list">
      {data.map((country) => (
        <Country key={country.country} 
        country={country} 
        selected={selected}
        handleSearch={handleSearch}/>
      ))}
    </div>
  );
}

export default CountriesList;
