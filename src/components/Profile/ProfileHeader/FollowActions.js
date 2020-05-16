import React, { useState } from "react";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import {
  followAnalyst,
  unfollowAnalyst,
} from "../../../store/actions/userActions";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import Button from "@material-ui/core/Button";

// Components
import MyButton from "../../util/MyButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 40,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "column",
  },
}));

const FollowActions = (props) => {
  const { user, analyst, followAnalyst, unfollowAnalyst } = props;

  const classes = useStyles();
  const isFollowing = () => {
    if (
      user.following &&
      user.following.find(
        (analystFollowed) => analystFollowed.id === analyst.id
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  const notificationButton = (
    <MyButton tip="Turn on alerts for this analyst.">
      <AddAlertIcon />
    </MyButton>
  );

  const followingButton = isFollowing() ? (
    <React.Fragment>
      <Button
        color="primary"
        startIcon={<CheckIcon />}
        onClick={() => unfollowAnalyst(analyst.id)}
      >
        Following
      </Button>
      {notificationButton}
    </React.Fragment>
  ) : (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => followAnalyst(analyst.id)}
    >
      Follow
    </Button>
  );

  return <div className={classes.root}>{followingButton}</div>;
};

FollowActions.propTypes = {
  user: PropTypes.object.isRequired,
  analyst: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  followAnalyst,
  unfollowAnalyst,
};

export default connect(mapStateToProps, mapActionsToProps)(FollowActions);
