import React from "react";

function Country({ country, selected, handleSearch }) {
  const handleClick = () => {
    handleSearch(country.cases);
  };

  function formatNumberWithDots(num) {
    return num.toLocaleString().replace(/,/g, ".");
  }

  return (
    <div className="country-container">
      {country ? (
        <>
          <div className="country-cases" onClick={handleClick}>
            <p
              className={`cases ${
                selected ? "text-danger" : "text-info"
              } mr-5 mb-0`}
            >
              {selected
                ? formatNumberWithDots(country.deaths || 0)
                : formatNumberWithDots(country.cases || 0)}
            </p>
            <p className="country text-start mr-5 mb-0">{country.country}</p>
            <img
              className="flag mr-5 mb-0"
              src={country.country ? country.countryInfo.flag : ""}
              alt={country.country + " Flag"}
            />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Country;
