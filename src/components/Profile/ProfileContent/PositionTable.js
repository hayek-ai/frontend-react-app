import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { formatNumber } from "../../../util/utils";

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
    border: "none",
  },
  titleRow: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

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

const PaperMarkup = (props) => (
  <Paper elevation={0} {...props} style={{ borderRadius: 0 }} />
);

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
    <div className={classes.tableContainer}>
      <TableContainer component={PaperMarkup} style={{ marginTop: 10 }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.titleRow}>
              <TableCell className={classes.columnTitle}>Symbol</TableCell>
              <TableCell className={classes.columnTitle} align="center">
                Position
              </TableCell>
              <TableCell className={classes.columnTitle} align="center">
                Entry Price
              </TableCell>
              <TableCell className={classes.columnTitle} align="center">
                Last Price
              </TableCell>
              <TableCell className={classes.columnTitle} align="center">
                Price Target
              </TableCell>
              <TableCell className={classes.columnTitle} align="center">
                Time Period
              </TableCell>
              <TableCell className={classes.columnTitle} align="center">
                Performance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontWeight: 700 }}
                >
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
    </div>
  );
};

PositionTable.propTypes = {
  ideas: PropTypes.array.isRequired,
};

export default PositionTable;