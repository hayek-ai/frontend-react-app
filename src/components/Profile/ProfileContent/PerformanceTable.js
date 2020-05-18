import React from "react";
import PropTypes from "prop-types";
import { formatNumber, getNumberWithOrdinal } from "../../../../util/utils";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 340,
  },
});

function createData(name, metric, ranking) {
  return { name, metric, ranking };
}

const PerformanceTable = ({ analyst }) => {
  const classes = useStyles();

  const rows = [
    createData(
      "Overall Ranking",
      getNumberWithOrdinal(analyst.analystRank),
      formatNumber(analyst.analystRank, 1, "percentage")
    ),
    createData(
      "Average Return",
      formatNumber(analyst.avgReturn, 1, "percentage"),
      formatNumber(analyst.avgReturnRank, 1, "percentage")
    ),
    createData(
      "Success Rate",
      formatNumber(analyst.successRate, 1, "percentage"),
      formatNumber(analyst.successRateRank, 1, "percentage")
    ),
    createData(
      "Average Holding Period (days)",
      formatNumber(analyst.avgHoldingPeriod, 1),
      formatNumber(analyst.avgHoldingPeriodRank, 1, "percentage")
    ),
    createData(
      "Number of Ideas",
      formatNumber(analyst.numIdeas, 1),
      formatNumber(analyst.numIdeasRank, 1, "percentage")
    ),
  ];
  return (
    <TableContainer component={Paper} style={{ marginTop: 10 }}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell> Analyst Stats</TableCell>
            <TableCell align="center">Metric</TableCell>
            <TableCell align="center">Percentile Ranking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.metric}</TableCell>
              <TableCell align="center">{row.ranking}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

PerformanceTable.propTypes = {
  analyst: PropTypes.object.isRequired,
};

export default PerformanceTable;
