import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
const CountryDrop = (props) => {
  return (
    <div>
      <FormControl className="app_dropdown">
        <Select
          variant="outlined"
          value={props.country}
          onChange={props.changeCountry}
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {props.countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CountryDrop;
