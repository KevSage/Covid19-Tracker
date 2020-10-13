import React from "react";
import "../Map.css";
import numeral from "numeral";
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";
function Map({ center, zoom, nations }) {
  // debugger;
  const mapData = nations.map(
    (nation) => (
      <Circle
        center={[nation.countryInfo.lat, nation.countryInfo.long]}
        fillOpacity={0.7}
        color="red"
        fillColor="red"
        radius={nation.todayCases * 50}
      >
        <Popup>
          <h1>I'm a popup</h1>
        </Popup>
      </Circle>
    )
    // console.log(nation)
    // <p>{nation.countryInfo.lat}</p>
  );
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mapData}
      </LeafletMap>
    </div>
  );
}

export default Map;
