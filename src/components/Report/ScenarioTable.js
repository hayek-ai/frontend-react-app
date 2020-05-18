import React from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../util/utils";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
  },
  table: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  title: {
    fontWeight: 700,
    padding: "10px",
  },
  cell: {
    width: "25%",
    fontWeight: 700,
    border: "none",
  },
}));

function createData(name, target, probability, impliedReturn) {
  return { name, target, probability, impliedReturn };
}

function impliedReturn(positionType, entry, target) {
  if (positionType) {
    if (positionType.toLowerCase() === "long") {
      return formatNumber(target / entry - 1, 1, "percentage");
    } else {
      return formatNumber(1 - target / entry, 1, "percentage");
    }
  }
}

const PaperMarkup = (props) => (
  <Paper elevation={0} {...props} style={{ borderRadius: 0 }} />
);

const ScenarioTable = ({ idea }) => {
  const classes = useStyles();

  const rows = [
    createData(
      "Bull Case",
      formatNumber(idea.bullTarget, 2, "dollars"),
      formatNumber(idea.bullProbability, 1, "percentage"),
      impliedReturn(idea.positionType, idea.lastPrice, idea.bullTarget)
    ),
    createData(
      "Base Case",
      formatNumber(idea.baseTarget, 2, "dollars"),
      formatNumber(idea.baseProbability, 1, "percentage"),
      impliedReturn(idea.positionType, idea.lastPrice, idea.baseTarget)
    ),
    createData(
      "Bear Case",
      formatNumber(idea.bearTarget, 2, "dollars"),
      formatNumber(idea.bearProbability, 1, "percentage"),
      impliedReturn(idea.positionType, idea.lastPrice, idea.bearTarget)
    ),
  ];

  return (
    <div className={classes.tableContainer}>
      <Typography variant="body1" className={classes.title}>
        {`Price Target Breakdown (${formatNumber(
          idea.priceTarget,
          2,
          "dollars"
        )})`}
      </Typography>
      <TableContainer component={PaperMarkup}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}></TableCell>
              <TableCell align="center" className={classes.cell}>
                Target
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                Probability
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                Implied Return
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
                <TableCell align="center" style={{ border: "none" }}>
                  {row.target}
                </TableCell>
                <TableCell align="center" style={{ border: "none" }}>
                  {row.probability}
                </TableCell>
                <TableCell align="center" style={{ border: "none" }}>
                  {row.impliedReturn}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

ScenarioTable.propTypes = {
  idea: PropTypes.object.isRequired,
};

export default ScenarioTable;
