import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatNumber, capitalizeFirstLetter } from "../../util/utils";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

// Components
import ScenarioTable from "./ScenarioTable";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  metric: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 24px 6px 16px",
    width: "250px",
  },
  metricContainer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  keyMetricsContainer: {
    dispaly: "flex",
    flexDirection: "column",
    border: `1px solid ${theme.palette.divider}`,
    marginTop: "15px",
  },
}));

const FinancialSnapShot = ({ idea }) => {
  const classes = useStyles();
  const keyMetrics = [
    {
      label: "Last price",
      value: formatNumber(idea.lastPrice, 2, "dollars"),
    },
    {
      label: "52-wk high",
      value: formatNumber(idea.week52High, 2, "dollars"),
    },
    {
      label: "52-wk low",
      value: formatNumber(idea.week52Low, 2, "dollars"),
    },
    {
      label: "Mkt cap (mm)",
      value: formatNumber(idea.marketCap, 0, "dollars"),
    },
    {
      label: "Net debt (mm)",
      value: formatNumber(idea.netDebt, 0, "dollars"),
    },
    {
      label: "Forward P/E",
      value: formatNumber(idea.forwardPE, 1, "ratio"),
    },
    {
      label: "EV/EBITDA",
      value: formatNumber(idea.evToEBITDA, 1, "ratio"),
    },
    {
      label: "Price-to-Sales",
      value: formatNumber(idea.priceToSales, 1, "ratio"),
    },
    {
      label: "Put-to-Call",
      value: formatNumber(idea.putCallRatio, 1, "ratio"),
    },
  ];
  let impliedReturn = 0;
  if (idea.positionType) {
    impliedReturn =
      idea.positionType.toLowerCase() === "long"
        ? idea.priceTarget / idea.entryPrice - 1
        : 1 - idea.priceTarget / idea.entryPrice;
  }

  const analystUsername = idea.analyst ? idea.analyst.username : null;
  const analystImageUrl = idea.analyst ? idea.analyst.imageUrl : null;

  return (
    <div>
      <div style={{ padding: 10 }}>
        <Typography variant="h5">{`${capitalizeFirstLetter(
          idea.positionType
        )} ${idea.companyName} (${idea.symbol})`}</Typography>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "15px" }}
        >
          <Avatar src={analystImageUrl} style={{ marginRight: 10 }} />
          <Typography
            variant="h6"
            className={classes.link}
            component={Link}
            to={`/profile/${analystUsername}`}
          >
            {analystUsername}
          </Typography>
        </div>
        <div style={{ marginTop: "20px" }}>
          <ScenarioTable idea={idea} />
        </div>
        <div className={classes.keyMetricsContainer}>
          <Typography
            variant="body1"
            style={{ fontWeight: 700, padding: "10px" }}
          >
            Key Metrics
          </Typography>
          <div className={classes.metricContainer}>
            {keyMetrics.map((metric, index) => (
              <div key={index} className={classes.metric}>
                <Typography variant="body2">{metric.label}</Typography>
                <Typography variant="body2">{metric.value}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ margin: 10 }}>
        <Typography variant="subtitle2">
          {`For more in-depth financial analysis and charting, we recommend Koyfin (it's free).  Check out ${idea.companyName}'s financial highlights `}
          <a
            className={classes.link}
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.koyfin.com/fa/fa.is/${idea.symbol}`}
          >
            here
          </a>
        </Typography>
      </div>
    </div>
  );
};

FinancialSnapShot.propTypes = {
  idea: PropTypes.object.isRequired,
};

export default FinancialSnapShot;
