import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "20px",
    backgroundColor: theme.palette.texturedBackground.main,
    color: theme.palette.primary.main,
  },
}));

const options = {
  sort: [
    { value: "top", text: "Top" },
    { value: "latest", text: "Newest" },
  ],
  positionType: [
    { value: null, text: "Long & Short" },
    { value: "long", text: "Long Only" },
    { value: "short", text: "Short Only" },
  ],
  timePeriod: [
    { value: null, text: "All Time" },
    { value: 1, text: "Today" },
    { value: 7, text: "Past Week" },
    { value: 30, text: "Past Month" },
    { value: 365, text: "Past Year" },
  ],
  sector: [
    { value: null, text: "All Sectors" },
    { value: "Communication Services", text: "Communication Services" },
    { value: "Consumer Discretionary", text: "Consumer Discretionary" },
    { value: "Consumer Staples", text: "Consumer Staples" },
    { value: "Energy", text: "Energy" },
    { value: "Financials", text: "Financials" },
    { value: "Health Care", text: "Health Care" },
    { value: "Industrials", text: "Industrials" },
    { value: "Materials", text: "Materials" },
    { value: "Real Estate", text: "Real Estate" },
    { value: "Technology", text: "Technology" },
    { value: "Utilities", text: "Utilities" },
  ],
  marketCap: [
    { value: null, text: "All Market Caps" },
    { value: "mega", text: "Mega (over $200bn)" },
    { value: "large", text: "Large ($10bn-$200bn)" },
    { value: "medium", text: "Medium ($2bn-$10bn)" },
    { value: "small", text: "Small ($300mm-$2bn)" },
    { value: "micro", text: "Micro (under $300mm)" },
  ],
};

const FilterSelect = ({ filter, setFilter }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const changeFilter = (value) => {
    if (value != null) {
      setFilter({
        key: filter.key,
        index: options[filter.key].findIndex(
          (option) => option.value === value
        ),
        value: `${filter.key}=${value}`,
      });
    } else {
      setFilter({
        key: filter.key,
        index: 0,
      });
    }
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        aria-controls={filter.key}
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
        endIcon={<ArrowDropDownIcon />}
      >
        {options[filter.key][filter.index].text}
      </Button>
      <Menu
        id={filter.key}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options[filter.key].map((option, index) => {
          return (
            <MenuItem key={index} onClick={() => changeFilter(option.value)}>
              {option.text}
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};

export default FilterSelect;
