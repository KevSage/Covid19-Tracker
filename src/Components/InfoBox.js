import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

const infoBoxStyle = {
  width: "30%",
};

function InfoBox({ title, cases, total }) {
  return (
    <Card style={infoBoxStyle}>
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox_cases">Today: {cases}</h2>
        <Typography className="infoBox_total" color="textSecondary">
          Total: {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
