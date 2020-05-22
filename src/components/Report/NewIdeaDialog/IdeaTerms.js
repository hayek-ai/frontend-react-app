import React from "react";
import { Link } from "react-router-dom";

// Mui stuff
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: "10px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const IdeaTerms = ({ ideaState, setIdeaState }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setIdeaState((prevState) => ({
      ...prevState,
      agreedToTerms: event.target.checked,
    }));
  };

  return (
    <div style={{ marginTop: "15px" }}>
      {ideaState.errors.agreedToTerms && (
        <Typography align="center" variant="body1" color="error">
          {ideaState.errors.agreedToTerms}
        </Typography>
      )}
      <div className={classes.main}>
        <div>
          <Checkbox
            checked={ideaState.agreedToTerms}
            onChange={handleChange}
            color="primary"
          />
        </div>
        <div>
          <Typography variant="subtitle2">
            I agree that by making this submission, I represent, warrant and
            covenant that this submission complies in all respects with Hayek's{" "}
            <Link to="/privacy-policy" className={classes.link}>
              Terms of Use
            </Link>{" "}
            , including without limitation that my submission does not (a)
            violate, plagiarize, or infringe upon the rights of any third party,
            including copyright, trademark, privacy or other personal or
            proprietary rights; (b) contain any undisclosed material inside
            information; (c) contain false, libelous or otherwise unlawful
            material; or (d) otherwise violate any applicable laws.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default IdeaTerms;
