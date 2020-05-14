import React from "react";
import PropTypes from "prop-types";
import { formatNumber, capitalizeFirstLetter } from "../../../../util/utils";
import { Node } from "slate";

// Mui stuff
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

export const IdeaCardBody = ({ children, idea }) => {
  const impliedReturn =
    idea.positionType.toLowerCase() === "long"
      ? idea.priceTarget / idea.entryPrice - 1
      : 1 - idea.priceTarget / idea.entryPrice;

  const thesisSummary = JSON.parse(idea.thesisSummary)
    .map((n) => Node.string(n))
    .join("\n")
    .substring(0, 150);

  return (
    <CardContent>
      <Typography variant="h6">{`${idea.companyName} (${idea.symbol})`}</Typography>
      <Typography variant="subtitle1">
        {`${capitalizeFirstLetter(idea.positionType)} 
        | Target: ${formatNumber(idea.priceTarget, 0, true, false)} 
        | Implied Return: ${formatNumber(impliedReturn, 1, false, true)}`}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {`${thesisSummary}...`}
      </Typography>
    </CardContent>
  );
};

IdeaCardBody.propTypes = {
  idea: PropTypes.object.isRequired,
};

export default IdeaCardBody;
