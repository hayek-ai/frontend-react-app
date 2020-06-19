import React from "react";
import PropTypes from "prop-types";

// Mui stuff
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";

const TableHeader = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: "username", numeric: false, label: "Analyst" },
    { id: "analystRank", numeric: true, label: "Overall Rank" },
    { id: "avgReturn", numeric: true, label: "Average Return" },
    {
      id: "avgPriceTargetCapture",
      numeric: true,
      label: "Avg Price Target Capture",
    },
    { id: "successRate", numeric: true, label: "Success Rate" },
    { id: "numIdeas", numeric: true, label: "Ideas" },
    { id: "avgHoldingPeriod", numeric: true, label: "Avg Holding Period" },
    { id: "numFollowers", numeric: true, label: "Followers" },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.tableCell}
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default TableHeader;
