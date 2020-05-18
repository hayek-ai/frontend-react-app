import React from "react";
import PropTypes from "prop-types";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/Textfield";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  inputBox: { marginBottom: "40px", width: "300px" },
  scenarioBox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    setIdeaState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputBox}>
        <TextField
          id="symbol"
          name="symbol"
          type="text"
          label="Symbol"
          helperText={ideaState.errors.symbol}
          error={ideaState.errors.symbol ? true : false}
          value={ideaState.symbol}
          onChange={handleChange}
          fullWidth
        />
      </div>
      <div className={classes.inputBox}>
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
      </div>
      <div className={classes.inputBox}>
        <div>{ideaState.priceTarget}</div>
        <div className={classes.scenarioBox}>
          <TextField
            label="Target"
            name="bullTarget"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            value={ideaState.bullTarget}
            helperText={ideaState.errors.bullTarget}
            error={ideaState.errors.bullTarget ? true : false}
            onChange={handleChange}
          />
          <TextField
            label="Probability"
            name="bullProbability"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            value={ideaState.bullProbability}
            helperText={ideaState.errors.bullProbability}
            error={ideaState.errors.bullProbability ? true : false}
            onChange={handleChange}
          />
        </div>
        <div className={classes.scenarioBox}>
          <TextField
            label="Target"
            name="baseTarget"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            value={ideaState.baseTarget}
            helperText={ideaState.errors.baseTarget}
            error={ideaState.errors.baseTarget ? true : false}
            onChange={handleChange}
          />
          <TextField
            label="Probability"
            name="baseProbability"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            value={ideaState.baseProbability}
            helperText={ideaState.errors.baseProbability}
            error={ideaState.errors.baseProbability ? true : false}
            onChange={handleChange}
          />
        </div>
        <div className={classes.scenarioBox}>
          <Typography variant="subtitle1">Bear Case</Typography>
          <TextField
            label="Target"
            name="bearTarget"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            value={ideaState.bearTarget}
            helperText={ideaState.errors.bearTarget}
            error={ideaState.errors.bearTarget ? true : false}
            onChange={handleChange}
          />
          <TextField
            label="Probability"
            name="bearProbability"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            value={ideaState.bearProbability}
            helperText={ideaState.errors.bearProbability}
            error={ideaState.errors.bearProbability ? true : false}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default IdeaDataForm;
