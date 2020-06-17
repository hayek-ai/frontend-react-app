import React from "react";
import PropTypes from "prop-types";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// Components
import IdeaTerms from "./IdeaTerms";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    align: "center",
    margin: "10px 10px 20px 10px",
    width: "150px",
  },
  typeInputs: {
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  errorMessage: {
    color: theme.palette.error.main,
    margin: 0,
    textAlign: "center",
  },
}));

const IdeaDataForm = ({ ideaState, setIdeaState }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    event.persist();

    setIdeaState({
      ...ideaState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <TextField
        id="symbol"
        name="symbol"
        type="text"
        label="Symbol"
        variant="outlined"
        placeholder="Enter Symbol"
        InputLabelProps={{
          shrink: true,
        }}
        helperText={ideaState.errors.symbol}
        error={ideaState.errors.symbol ? true : false}
        value={ideaState.symbol}
        onChange={handleChange}
        className={classes.textField}
      />
      <FormControl className={classes.textField} variant="outlined">
        <InputLabel shrink id="positionType">
          Position Type
        </InputLabel>
        <Select
          id="positionType"
          name="positionType"
          label="Position Type"
          value={ideaState.positionType}
          onChange={handleChange}
        >
          <MenuItem value="long">Long</MenuItem>
          <MenuItem value="short">Short</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="12-mo Price Target"
        name="priceTarget"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={ideaState.priceTarget}
        helperText={ideaState.errors.priceTarget}
        error={ideaState.errors.priceTarget ? true : false}
        onChange={handleChange}
        className={classes.textField}
      />
      <IdeaTerms ideaState={ideaState} setIdeaState={setIdeaState} />
    </div>
  );
};

IdeaDataForm.propTypes = {
  ideaState: PropTypes.object.isRequired,
  setIdeaState: PropTypes.func.isRequired,
};

export default IdeaDataForm;
