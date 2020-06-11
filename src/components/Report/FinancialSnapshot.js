import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  formatNumber,
  capitalizeFirstLetter,
  priceReturn,
} from "../../util/utils";
import dayjs from "dayjs";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

// Components
import ScenarioTable from "./ScenarioTable";
import FollowButton from "../util/FollowButton";

import { STOCK_GREEN, STOCK_RED } from "../../util/theme";

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
      // use latestPrice (from IEX quote) - lastPrice stale (esp. if idea is closed)
      value: formatNumber(idea.latestPrice, 2, "dollars"),
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

  const analystUsername = idea.analyst ? idea.analyst.username : null;
  const analystImageUrl = idea.analyst ? idea.analyst.imageUrl : null;
  const ideaReturn = priceReturn(
    idea.positionType,
    idea.entryPrice,
    idea.lastPrice,
    2
  );

  return (
    <div>
      <div style={{ padding: 10 }}>
        <Typography variant="h5">{`${capitalizeFirstLetter(
          idea.positionType
        )} ${idea.companyName} (${idea.symbol})`}</Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          style={{ marginTop: "10px" }}
        >
          {`Entry Price of ${formatNumber(
            idea.entryPrice,
            2,
            "dollars"
          )} on ${dayjs(new Date(idea.createdAt)).format("MMM DD, YYYY")}`}
        </Typography>
        {idea.closedDate && (
          <div style={{ marginTop: "10px" }}>
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              {`This position was closed on ${dayjs(
                new Date(idea.createdAt)
              ).format("MMM DD, YYYY")} at an exit price of ${formatNumber(
                idea.lastPrice,
                2,
                "dollars"
              )} with a return of `}
              <span
                style={{
                  color: `${
                    parseFloat(ideaReturn) > 0 ? STOCK_GREEN : STOCK_RED
                  }`,
                }}
              >{`${ideaReturn}`}</span>
            </Typography>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "15px",
          }}
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
        {idea.analyst && (
          <div style={{ marginTop: "15px" }}>
            <FollowButton analyst={idea.analyst} />
          </div>
        )}
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
                <Typography variant="body2" style={{ fontWeight: 700 }}>
                  {metric.label}
                </Typography>
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
