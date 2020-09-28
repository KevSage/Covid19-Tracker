import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountriesData = fetch("https://disease.sh/v3/covid-19/countries")
      .then((resp) => resp.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setCountries(countries);
        // console.log(countries);
        // getCountriesData();
      });
  }, []);

  return (
    <div className="App">
      <div className="app_header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            {countries.map((country) => (
              <MenuItem>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* InfoBox */}
      {/* InfoBox */}
      {/* InfoBox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
