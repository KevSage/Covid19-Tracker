import React from "react";
import "../Map.css";
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";
function Map({ center, zoom, nations }) {
  // debugger;
  const mapData = nations.map((nation) => (
    <Circle
      center={[nation.countryInfo.lat, nation.countryInfo.long]}
      fillOpacity={0.7}
      color="blue"
      fillColor="blue"
      radius={nation.todayCases * 30}
    >
      <Popup>
        <h1>{nation.country}</h1>
      </Popup>
    </Circle>
  ));
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
