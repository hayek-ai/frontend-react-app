import React from "react";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

// Components
import Searchbar from "./Searchbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "20px",
    borderRadius: 0,
    marginTop: "10px",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

const SearchContainer = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Searchbar {...props} />
      <GridList className={classes.gridList}>
        {children.map((child, index) => (
          <GridListTile
            style={{ padding: "15px 4px", height: "none", width: "none" }}
            key={index}
          >
            {child}
          </GridListTile>
        ))}
      </GridList>
    </Paper>
  );
};

export default SearchContainer;
