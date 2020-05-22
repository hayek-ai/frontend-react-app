import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  formatNumber,
  capitalizeFirstLetter,
  priceReturn,
} from "../../../../util/utils";
import { Node } from "slate";

// Mui stuff
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

export const IdeaCardBody = ({ children, idea }) => {
  const thesisSummary = JSON.parse(idea.thesisSummary)
    .map((n) => Node.string(n))
    .join("\n")
    .substring(0, 150);

  return (
    <Link to={`/report/${idea.id}`} style={{ textDecoration: "none" }}>
      <CardContent style={{ paddingBottom: "5px" }}>
        <Typography
          variant="h6"
          color="textPrimary"
        >{`${idea.companyName} (${idea.symbol})`}</Typography>
        <Typography variant="subtitle1" color="textPrimary">
          {`${capitalizeFirstLetter(idea.positionType)} 
        Target: ${formatNumber(idea.priceTarget, 0, "dollars")} 
        (Implied Return: ${priceReturn(
          idea.positionType,
          idea.entryPrice,
          idea.priceTarget,
          1
        )})`}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {`${thesisSummary}...`}
        </Typography>
      </CardContent>
    </Link>
  );
};

IdeaCardBody.propTypes = {
  idea: PropTypes.object.isRequired,
};

export default IdeaCardBody;
