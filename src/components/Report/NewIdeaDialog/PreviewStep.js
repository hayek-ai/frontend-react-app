import React from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../../util/utils";
import { calcImpliedReturn } from "./helperFunctions";

// Mui stuff
import Typography from "@material-ui/core/Typography";

// Components
import Report from "../Report";
import ScenarioTable from "../ScenarioTable";

const PreviewStep = ({ previewState }) => {
  let currentPrice, target, impliedReturn;
  if (
    previewState.latestPrice &&
    previewState.latestPrice &&
    previewState.priceTarget &&
    previewState.positionType
  ) {
    currentPrice = formatNumber(previewState.latestPrice, 2, "dollars");
    target = formatNumber(previewState.priceTarget, 2, "dollars");
    impliedReturn = calcImpliedReturn(
      previewState.positionType,
      parseFloat(previewState.priceTarget),
      previewState.latestPrice
    );
    impliedReturn = formatNumber(impliedReturn, 2, "percentage");
  }
  return (
    <React.Fragment>
      <Typography variant="h5">{`${previewState.companyName} (${previewState.symbol})`}</Typography>
      <Typography
        style={{ marginBottom: 20 }}
        color="primary"
        variant="subtitle1"
      >
        Are you sure you want to submit this idea? Once it is submitted, it
        can't be removed from your permanent track record or edited.
      </Typography>
      <Typography variant="subtitle1">
        {`${previewState.exchange}: ${previewState.symbol}`}
        <br />
        {`Sector: ${previewState.sector}`}
        <br />
        {`PositionType: ${previewState.positionType}`}
        <br />
        {`Current Price: ${currentPrice}`}
        <br />
        {`Price Target: ${target}`}
        <br />
        {`Implied Return: ${impliedReturn}`}
      </Typography>
      <div style={{ margin: "20px 0" }}>
        <ScenarioTable idea={previewState} />
      </div>
      <Report
        thesisSummary={previewState.thesisSummary}
        fullReport={previewState.fullReport}
        exhibits={previewState.selectedExhibits}
      />
    </React.Fragment>
  );
};

PreviewStep.propTypes = {
  previewState: PropTypes.object.isRequired,
};

export default PreviewStep;
