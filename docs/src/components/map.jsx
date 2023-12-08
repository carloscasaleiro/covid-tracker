import React, { useEffect } from "react";

function Map({ data, selected, handleSearch, unique }) {
  useEffect(() => {
    let map = null;

    if (!map) {
      let lat = 25;
      let long = 0;
      let zoom = 2;

      map = L.map("map").setView([lat, long], zoom);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      data.forEach((country) => {
        const circle = L.circle(
          [country.countryInfo.lat, country.countryInfo.long],
          {
            color: selected ? "red" : "#0dcaf0",
            fillColor: selected ? "red" : "#0dcaf0",
            fillOpacity: 0.5,
            radius: selected
              ? Math.sqrt(country.deaths) * 500
              : Math.sqrt(country.cases) * 50,
          }
        ).addTo(map);

        if (country.country === unique && data.length === 1) {
          lat = country.countryInfo.lat;
          long = country.countryInfo.long;
          zoom = 5;
          map.setView([lat, long], zoom);
        }

        circle.bindPopup(
          selected
            ? `Deaths in ${country.country}: ${country.deaths}`
            : `Cases in ${country.country}: ${country.cases}`
        );

        circle.on("click", (event) => {
          handleSearch(country.cases);
        });

        circle.on("mouseover", (event) => {
          circle.openPopup();
        });

        circle.on("mouseout", (event) => {
          circle.closePopup();
        });
      });
    }

    return () => {
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, [data, selected, unique]);

  return <div id="map"></div>;
}

export default Map;
