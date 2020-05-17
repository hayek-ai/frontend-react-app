import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { formatNumber } from "../../../../util/utils";

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

function createData(
  symbol,
  positionType,
  entryPrice,
  lastPrice,
  priceTarget,
  timePeriod,
  performance
) {
  return {
    symbol,
    positionType,
    entryPrice,
    lastPrice,
    priceTarget,
    timePeriod,
    performance,
  };
}

function calcTimePeriod(x, y) {
  if (y === null || y === undefined) y = "Present";

  return `${dayjs(x).format("MM/DD/YY")} to ${
    y === "Present" ? y : dayjs(y).format("MM/DD/YY")
  }`;
}

const PositionTable = ({ ideas }) => {
  const classes = useStyles();

  const rows = ideas.map((idea) => {
    return createData(
      idea.symbol,
      idea.positionType,
      formatNumber(idea.entryPrice, 2, "dollars"),
      formatNumber(idea.lastPrice, 2, "dollars"),
      formatNumber(idea.priceTarget, 2, "dollars"),
      calcTimePeriod(idea.createdAt, idea.closedDate),
      formatNumber(idea.performance, 2, "percentage")
    );
  });

  return (
    <TableContainer component={Paper} style={{ marginTop: 10 }}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="center">Position</TableCell>
            <TableCell align="center">Entry Price</TableCell>
            <TableCell align="center">Last Price</TableCell>
            <TableCell align="center">Price Target</TableCell>
            <TableCell align="center">Time Period</TableCell>
            <TableCell align="center">Performance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="center">{row.positionType}</TableCell>
              <TableCell align="center">{row.entryPrice}</TableCell>
              <TableCell align="center">{row.lastPrice}</TableCell>
              <TableCell align="center">{row.priceTarget}</TableCell>
              <TableCell align="center">{row.timePeriod}</TableCell>
              <TableCell align="center">{row.performance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

PositionTable.propTypes = {
  ideas: PropTypes.array.isRequired,
};

export default PositionTable;
