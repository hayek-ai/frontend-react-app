import React from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../../util/utils";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/Textfield";
import Typography from "@material-ui/core/Typography";
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
  },
  textField: {
    margin: "10px 10px 0 0",
    width: "110px",
  },
  scenarioBox: {
    margin: "10px auto",
  },
  scenarioInputs: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: 10,
    textAlign: "center",
  },
}));

const IdeaDataForm = ({ ideaState, setIdeaState }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    event.persist();

    const tempState = {
      ...ideaState,
      [event.target.name]: event.target.value,
    };
    const priceTarget =
      (tempState.bullTarget * tempState.bullProbability) / 100 +
      (tempState.baseTarget * tempState.baseProbability) / 100 +
      (tempState.bearTarget * tempState.bearProbability) / 100;

    setIdeaState({
      ...tempState,
      priceTarget: priceTarget,
    });
  };

  return (
    <div className={classes.root}>
      <TextField
        id="symbol"
        name="symbol"
        type="text"
        label="Symbol"
        helperText={ideaState.errors.symbol}
        error={ideaState.errors.symbol ? true : false}
        value={ideaState.symbol}
        onChange={handleChange}
        className={classes.textField}
      />
      <FormControl style={{ marginTop: "30px" }}>
        <InputLabel shrink id="positionType">
          Position Type
        </InputLabel>
        <Select
          id="positionType"
          name="positionType"
          label="Position Type"
          value={ideaState.positionType}
          onChange={handleChange}
          className={classes.textField}
        >
          <MenuItem value="long">Long</MenuItem>
          <MenuItem value="short">Short</MenuItem>
        </Select>
      </FormControl>

      <div style={{ margin: "20px 0 10px" }}>
        <Typography
          align="center"
          variant="h5"
          style={{ marginBottom: "10px" }}
        >
          {`12-Month Price Target: ${formatNumber(
            ideaState.priceTarget,
            2,
            "dollars"
          )}`}
        </Typography>
        {ideaState.errors.priceTarget && (
          <Typography
            variant="body1"
            className={classes.errorMessage}
            style={{ marginBottom: "10px" }}
          >
            {ideaState.errors.priceTarget}
          </Typography>
        )}
        <Typography variant="body1" color="textSecondary">
          Scenario analysis is a useful tool to arrive at a price target and
          gives investors important information about the potential range of
          outcomes for a given stock. Please enter your "Bull Case" (highest),
          "Bear Case" (lowest), and "Base Case" (most likely) price level
          scenarios, along with your estimate of their respective probabilities.
          Your ultimate price target will be the weighted average of these
          scenarios. Probabilities must add up to 100%.
        </Typography>
      </div>
      <div className={classes.scenarioBox}>
        <Typography align="center" variant="body1">
          Bull Case
        </Typography>
        <div className={classes.scenarioInputs}>
          <TextField
            label="Target"
            name="bullTarget"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            value={ideaState.bullTarget}
            helperText={ideaState.errors.bullTarget}
            error={ideaState.errors.bullTarget ? true : false}
            onChange={handleChange}
            className={classes.textField}
          />
          <TextField
            label="Probability"
            name="bullProbability"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            value={ideaState.bullProbability}
            helperText={ideaState.errors.bullProbability}
            error={ideaState.errors.bullProbability ? true : false}
            onChange={handleChange}
            className={classes.textField}
          />
        </div>
      </div>
      <div className={classes.scenarioBox}>
        <Typography align="center" variant="body1">
          Base Case
        </Typography>
        <div className={classes.scenarioInputs}>
          <TextField
            label="Target"
            name="baseTarget"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            value={ideaState.baseTarget}
            helperText={ideaState.errors.baseTarget}
            error={ideaState.errors.baseTarget ? true : false}
            onChange={handleChange}
            className={classes.textField}
          />
          <TextField
            label="Probability"
            name="baseProbability"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            value={ideaState.baseProbability}
            helperText={ideaState.errors.baseProbability}
            error={ideaState.errors.baseProbability ? true : false}
            onChange={handleChange}
            className={classes.textField}
          />
        </div>
      </div>
      <div className={classes.scenarioBox}>
        <Typography align="center" variant="body1">
          Bear Case
        </Typography>
        <div className={classes.scenarioInputs}>
          <TextField
            label="Target"
            name="bearTarget"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            value={ideaState.bearTarget}
            helperText={ideaState.errors.bearTarget}
            error={ideaState.errors.bearTarget ? true : false}
            onChange={handleChange}
            className={classes.textField}
          />
          <TextField
            label="Probability"
            name="bearProbability"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            value={ideaState.bearProbability}
            helperText={ideaState.errors.bearProbability}
            error={ideaState.errors.bearProbability ? true : false}
            onChange={handleChange}
            className={classes.textField}
          />
        </div>
      </div>
      <IdeaTerms ideaState={ideaState} setIdeaState={setIdeaState} />
    </div>
  );
};

IdeaDataForm.propTypes = {
  ideaState: PropTypes.object.isRequired,
  setIdeaState: PropTypes.func.isRequired,
};

export default IdeaDataForm;
