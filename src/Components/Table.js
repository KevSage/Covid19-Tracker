import React from "react";

function Table(props) {
  const sortData = () => {
    let sortedData = [...props.countries];
    sortedData.sort((a, b) => {
      if (a.cases > b.cases) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
  };

  return (
    <div>
      <ul>
        {sortData().map((country) => (
          <li>{country.country}</li>
        ))}
      </ul>
    </div>
  );
}

export default Table;
