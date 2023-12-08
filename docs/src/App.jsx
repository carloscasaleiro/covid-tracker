import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/nav";
import Data from "./service/api";
import CountriesList from "./components/countriesList";
import Map from "./components/map";
import Search from "./components/search";
import CovidChart from "./components/chart";

const OPTIONS = [
  {
    name: "CASES",
  },
  {
    name: "DEATHS",
  },
];

function App() {
  const [total, setTotal] = useState([]);
  const [countries, setCountries] = useState([]);
  const [originalCountries, setOriginalCountries] = useState([]);
  const [chart, setChart] = useState([]);
  const [allChart, setAllChart] = useState([]);
  const [selected, setSelected] = useState(0);
  const [unique, setUnique] = useState("Global");

  useEffect(() => {
    async function fetchData() {
      try {
        let total = await Data("all");
        setTotal(total);

        const countriesData = await Data("countries");
        setCountries(countriesData);
        setOriginalCountries(countriesData);

        const all = await Data(`historical/all?lastdays=all`);
        setChart(all);
        setAllChart(all);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function handleSearch(text) {
    if (text === unique) {
      return;
    }

    if (!text && text !== unique) {
      setUnique("Global");
    }

    const isNumeric = /^\d+$/.test(text);

    let filteredData = [];

    if (isNumeric) {
      filteredData = originalCountries.filter(
        (country) => country.cases === parseInt(text, 10)
      );
    } else {
      filteredData = originalCountries.filter((country) =>
        country.country.trim().toLowerCase().includes(text.trim().toLowerCase())
      );
    }

    setCountries(filteredData);

    async function fetchData() {
      if (filteredData.length > 1) {
        setUnique("Global");
        setChart(allChart);
        return;
      }

      try {
        const countryDays = await Data(
          `historical/${
            filteredData.length === 1 ? filteredData[0].country : ""
          }?lastdays=all`
        );

        if (countryDays.timeline) {
          setUnique(countryDays.country);
          setChart(countryDays.timeline);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }

  function formatNumberWithDots(num) {
    return num.toLocaleString().replace(/,/g, ".");
  }

  return (
    <>
      <div className={`sideBar bg-white `}>
        <Nav
          options={OPTIONS.map(({ name }) => name)}
          selected={selected}
          select={setSelected}
        />
        <h1
          className={`allCases ${
            selected ? "text-danger" : "text-info"
          } text-center mt-2`}
        >
          {" "}
          {selected
            ? formatNumberWithDots(total.deaths || 0)
            : formatNumberWithDots(total.cases || 0)}
        </h1>
        <Search onSubmit={handleSearch} selected={selected} unique={unique} />
        <CountriesList
          data={countries}
          selected={selected}
          handleSearch={handleSearch}
        />
      </div>

      <div className="mapChart">
        <Map
          data={countries}
          selected={selected}
          handleSearch={handleSearch}
          unique={unique}
        />
        <CovidChart data={chart} selected={selected} unique={unique} />
      </div>
    </>
  );
}

export default App;
