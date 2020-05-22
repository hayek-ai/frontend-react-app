import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../util/utils";
import { Link } from "react-router-dom";

// Mui stuff
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

// Components
import TableHeader from "./TableHeader";
import TablePaginationActions from "./TablePaginationActions";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function createData(
  username,
  analystRank,
  avgReturn,
  successRate,
  numIdeas,
  numFollowers,
  subscriptionCost,
  avgHoldingPeriod
) {
  return {
    username,
    analystRank,
    avgReturn,
    successRate,
    numIdeas,
    numSubscribers,
    subscriptionCost,
    avgHoldingPeriod,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 500,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableCell: {
    padding: "4px 16px",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  usernameLink: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const LeaderboardTable = ({ analysts }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("analystRank");

  const rows = analysts.map((analyst) => {
    return createData(
      analyst.username,
      analyst.analystRank,
      analyst.avgReturn,
      analyst.successRate,
      analyst.numIdeas,
      analyst.numFollowers,
      analyst.numFollowers,
      analyst.subscriptionCost,
      analyst.avgHoldingPeriod
    );
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader className={classes.table}>
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.username}>
                <TableCell component="th" scope="row">
                  <Link
                    className={classes.usernameLink}
                    to={`/profile/${row.username}`}
                  >
                    {row.username}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.analystRank}</TableCell>
                <TableCell align="center">
                  {percentageText(row.avgReturn)}
                </TableCell>
                <TableCell align="center">
                  {percentageText(row.successRate)}
                </TableCell>
                <TableCell align="center">{row.numIdeas}</TableCell>
                <TableCell align="center">{row.numSubscribers}</TableCell>
                <TableCell align="center">
                  {toDollars(row.subscriptionCost)}
                </TableCell>
                <TableCell align="center">{row.avgHoldingPeriod}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

LeaderboardTable.propTypes = {
  analysts: PropTypes.array.isRequired,
};

export default LeaderboardTable;
