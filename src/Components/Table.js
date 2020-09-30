import React from "react";
import "../Table.css";
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

  const style = {
    color: "red",
  };

  return (
    <div className="table">
      {sortData().map(({ country, cases, deaths }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
