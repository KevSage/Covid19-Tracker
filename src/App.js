import React, { useState, useEffect } from "react";
import "./App.css";
import CountryDrop from "./Components/CountryDrop";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import { Card, CardContent, Typography } from "@material-ui/core";
import Table from "./Components/Table";
import LineGraph from "./Components/LineGraph";
import Coronavirus from "./coronavirus.svg";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryData, setCountryData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [flag, setFlag] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [nations, setNations] = useState([]);
  useEffect(() => {
    // if (country === "worldwide") {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((resp) => resp.json())
      .then((data) => {
        setCountryData(data);
      });
    // }
    console.log(countryData);
  }, []);

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
          setNations(data);
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
      .then((data) => {
        setCountryData(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
    const flag = `https://www.countryflags.io/${countryCode}/shiny/64.png`;
    setFlag(flag);
    console.log(countryData);
  };
  // const mapData = (nations) => {
  //   nations.map((nation) => (
  //     <Circle
  //       center={(nation.countryInfo.lat, nation.countryInfo.long)}
  //       fillOpacity={0.7}
  //       color="red"
  //       fillColor="red"
  //       radius={nation.todayCases * 1000}
  //     >
  //       <Popup>
  //         <h1>I'm a popup</h1>
  //       </Popup>
  //     </Circle>
  //   ));
  // };

  return (
    <div className="app">
      <div className="left">
        <div className="app_header">
          <img src={Coronavirus} alt="" className="coronavirus" />

          <h1>Covid 19 Tracker</h1>
          <CountryDrop
            changeCountry={changeCountry}
            country={country}
            countries={countries}
          />
        </div>

        <div className="app_stats">
          <div className="countryTitle">
            <img src={flag} alt="" className="flag" />

            <h2>{countryData.country}</h2>
          </div>
          <div className="info-boxes">
            <InfoBox
              title="Cases"
              cases={countryData.todayCases}
              total={countryData.cases}
            />
            <InfoBox
              title="Recovered"
              cases={countryData.todayRecovered}
              total={countryData.recovered}
            />
            <InfoBox
              title="Deaths"
              cases={countryData.todayDeaths}
              total={countryData.deaths}
            />
          </div>
        </div>

        <Map
          center={mapCenter}
          zoom={mapZoom}
          nations={nations}
          // mapData={mapData}
        />
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
