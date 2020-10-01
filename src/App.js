import React, { useState, useEffect } from "react";
import "./App.css";
import CountryDrop from "./Components/CountryDrop";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import { Card, CardContent, Typography } from "@material-ui/core";
import Table from "./Components/Table";
import LineGraph from "./Components/LineGraph";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryData, setCountryData] = useState({});
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (country === "worldwide") {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((resp) => resp.json())
        .then((data) => setCountryData(data));
    }
  });

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((resp) => resp.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
          setTableData(data);
        });
    };
    getCountriesData();
  }, []);

  const changeCountry = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    console.log(e.target);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((resp) => resp.json())
      .then((data) => setCountryData(data));
    console.log(countryData);
  };

  return (
    <div className="app">
      <div className="left">
        <div className="app_header">
          <h1>Covid 19 Tracker</h1>
          <CountryDrop
            changeCountry={changeCountry}
            country={country}
            countries={countries}
          />
        </div>
        <div className="app_stats">
          <h3>{country}</h3>
          <InfoBox
            title="Coronavirus Cases"
            cases={countryData.todayCases}
            total={2000}
          />
          <InfoBox
            title="Recovered"
            cases={countryData.todayRecovered}
            total={2000}
          />
          <InfoBox
            title="Deaths"
            cases={countryData.todayDeaths}
            total={2000}
          />
        </div>

        <Map />
      </div>
      <Card className="right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide New cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
