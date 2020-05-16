import React, { useState } from "react";
import PropTypes from "prop-types";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  bio: {
    marginTop: 10,
  },
  showMore: {
    ...theme.typography.body2,
    fontWeight: 600,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Bio = ({ bio }) => {
  const classes = useStyles();
  const [showMoreBio, setShowMoreBio] = useState(false);

  const bioMarkup = bio ? (
    <div className={classes.bio}>
      <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
        Bio
      </Typography>
      {bio.length > 175 ? (
        <React.Fragment>
          <Typography variant="body2">
            {showMoreBio ? bio : `${bio.substring(0, 175)}...`}
          </Typography>
          <Typography
            className={classes.showMore}
            onClick={() => setShowMoreBio(!showMoreBio)}
          >
            {showMoreBio ? "Show Less" : "Show More"}
          </Typography>
        </React.Fragment>
      ) : (
        <Typography variant="body2">{bio}</Typography>
      )}
    </div>
  ) : null;

  return bioMarkup;
};

Bio.propTypes = {
  bio: PropTypes.string,
};

export default Bio;
