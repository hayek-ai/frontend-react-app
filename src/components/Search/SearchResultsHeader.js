import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchStockInfo } from "../../api";
import { formatNumber } from "../../util/utils";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Components
import PriceChart from "../Charts/PriceChart";
import WithLoading from "../util/WithLoading";

import { STOCK_GREEN, STOCK_RED } from "../../util/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "20px",
  },
  pageTitle: {
    ...theme.typography.h5,
    color: theme.palette.text.primary,
    marginTop: 10,
  },
}));

const SearchResultsHeader = ({ symbol }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [stockInfo, setStockInfo] = useState({});

  useEffect(() => {
    let isMounted = true;
    if (symbol !== undefined) {
      setLoading(true);
      fetchStockInfo(symbol, true).then((stockInfo) => {
        if (stockInfo.companyInfo.exchange === "New York Stock Exchange") {
          stockInfo.companyInfo.exchange = "NYSE";
        }
        if (isMounted) {
          setLoading(false);
          setStockInfo(stockInfo);
        }
      });
    }
    return () => (isMounted = false);
  }, [symbol]);

  return (
    <WithLoading loading={loading}>
      <Paper className={classes.root} variant="outlined">
        {stockInfo.companyInfo != null && (
          <React.Fragment>
            <Typography align="center" className={classes.pageTitle}>
              {`${stockInfo.companyInfo.companyName}`}
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              style={{
                color: `${
                  stockInfo.companyInfo.changePercent > 0
                    ? STOCK_GREEN
                    : STOCK_RED
                }`,
              }}
            >
              {`${formatNumber(
                stockInfo.companyInfo.latestPrice,
                2,
                "dollars"
              )} (${formatNumber(
                stockInfo.companyInfo.changePercent,
                1,
                "percentage"
              )})`}
            </Typography>
            <Typography align="center" variant="subtitle2">
              {`${stockInfo.companyInfo.exchange}: ${symbol.toUpperCase()}`}
              <br />
              {`Sector: ${stockInfo.companyInfo.sector}`}
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PriceChart chartInfo={stockInfo.chartInfo} />
            </div>
          </React.Fragment>
        )}
      </Paper>
    </WithLoading>
  );
};

SearchResultsHeader.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default SearchResultsHeader;
