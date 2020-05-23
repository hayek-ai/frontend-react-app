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

function createData(name, metric, percentile) {
  return { name, metric, percentile };
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
      formatNumber(analyst.analystRankPercentile, 1, "percentage")
    ),
    createData(
      "Brier Score",
      formatNumber(analyst.brierScore, 2),
      formatNumber(analyst.brierScorePercentile, 1, "percentage")
    ),
    createData(
      "Average Return",
      formatNumber(analyst.avgReturn, 1, "percentage"),
      formatNumber(analyst.avgReturnPercentile, 1, "percentage")
    ),
    createData(
      "Success Rate",
      formatNumber(analyst.successRate, 1, "percentage"),
      formatNumber(analyst.successRatePercentile, 1, "percentage")
    ),
    createData(
      "Average Holding Period (days)",
      formatNumber(analyst.avgHoldingPeriod, 1),
      formatNumber(analyst.avgHoldingPeriodPercentile, 1, "percentage")
    ),
    createData(
      "Number of Ideas",
      formatNumber(analyst.numIdeas, 0),
      formatNumber(analyst.numIdeasPercentile, 1, "percentage")
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
                  {row.name}
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
