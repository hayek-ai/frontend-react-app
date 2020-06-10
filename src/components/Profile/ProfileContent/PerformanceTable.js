import React from "react";
import PropTypes from "prop-types";
import { formatNumber, getNumberWithOrdinal } from "../../../util/utils";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Components
import InfoButton from "../../util/InfoButton";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    border: `1px solid ${theme.palette.divider}`,
    marginTop: "10px",
  },
  table: {
    minWidth: 340,
  },
  columnTitle: {
    fontWeight: 700,
  },
  titleRow: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

function createData(name, metric, percentile, info) {
  return { name, metric, percentile, info };
}

const PaperMarkup = (props) => (
  <Paper elevation={0} {...props} style={{ borderRadius: 0 }} />
);

const PerformanceTable = ({ analyst }) => {
  const classes = useStyles();

  const rows = [
    createData(
      "Overall Ranking",
      getNumberWithOrdinal(analyst.analystRank),
      formatNumber(analyst.analystRankPercentile, 1, "percentage"),
      "We use a proprietary algorithm to rank analysts by the performance of their ideas. Model inputs include brier score, average return per idea, success rate, and statistical significance, among others."
    ),
    createData(
      "Brier Score",
      formatNumber(analyst.brierScore, 2),
      formatNumber(analyst.brierScorePercentile, 1, "percentage"),
      "The brier score measures the accuracy of an analyst's probabilistic predictions (i.e. bear cases, base cases and bull cases). The best possible Brier score is 0 (total acccuracy), and the worst is 1 (wholly inaccurate)."
    ),
    createData(
      "Average Return",
      formatNumber(analyst.avgReturn, 1, "percentage"),
      formatNumber(analyst.avgReturnPercentile, 1, "percentage"),
      "The average return of all ideas.  We don't want to measure single lucky hits but rather the analyst's overall performance. Analysts who pick more volatile stocks will naturally have higher returns on their winning trades, but those wins will still have to compensate for higher losses on bad recommendations."
    ),
    createData(
      "Success Rate",
      formatNumber(analyst.successRate, 1, "percentage"),
      formatNumber(analyst.successRatePercentile, 1, "percentage"),
      "The success rate measures the percentage of analyst ideas that are profitable (return greater than zero).  This can be useful to ensure that an analyst does not have 10 losing ideas offset by one big win (making his or her performance unreasonably high)."
    ),
    createData(
      "Average Holding Period (days)",
      formatNumber(analyst.avgHoldingPeriod, 1),
      formatNumber(analyst.avgHoldingPeriodPercentile, 1, "percentage"),
      "Average holding period represents the average number of days between opening a position and closing a position for all of an analyst's ideas."
    ),
    createData(
      "Number of Ideas",
      formatNumber(analyst.numIdeas, 0),
      formatNumber(analyst.numIdeasPercentile, 1, "percentage"),
      "This number represents the number of ideas an analyst has published on Hayek since opening an account."
    ),
  ];
  return (
    <div className={classes.tableContainer}>
      <TableContainer component={PaperMarkup}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.titleRow}>
              <TableCell className={classes.columnTitle}>
                Analyst Stats
              </TableCell>
              <TableCell className={classes.columnTitle} align="center">
                Metric
              </TableCell>
              <TableCell className={classes.columnTitle} align="center">
                Percentile Ranking
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontWeight: 700, border: "none" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>{row.name}</span>
                    <InfoButton title={row.name} text={row.info} />
                  </div>
                </TableCell>
                <TableCell style={{ border: "none" }} align="center">
                  {row.metric}
                </TableCell>
                <TableCell style={{ border: "none" }} align="center">
                  {row.percentile}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

PerformanceTable.propTypes = {
  analyst: PropTypes.object.isRequired,
};

export default PerformanceTable;
