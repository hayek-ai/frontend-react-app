import React from "react";
import PropTypes from "prop-types";

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
    padding: "10px",
    marginTop: "10px",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

const SearchContainer = ({ searchbar, children, ...props }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      {searchbar ? <Searchbar {...props} /> : null}
      <GridList className={classes.gridList}>
        {children.map((child, index) => (
          <GridListTile
            style={{ padding: "10px 4px", height: "none", width: "none" }}
            key={index}
          >
            {child}
          </GridListTile>
        ))}
      </GridList>
    </Paper>
  );
};

SearchContainer.propTypes = {
  searchbar: PropTypes.bool.isRequired,
};

export default SearchContainer;
