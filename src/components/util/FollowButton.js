import React from "react";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import {
  followAnalyst,
  unfollowAnalyst,
} from "../../store/actions/userActions";

// Mui stuff
import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";

const FollowButton = (props) => {
  const { user, analyst, followAnalyst, unfollowAnalyst } = props;

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

  const followingButton = isFollowing() ? (
    <Button
      color="primary"
      startIcon={<CheckIcon />}
      onClick={() => unfollowAnalyst(analyst.id)}
      size="small"
    >
      Following
    </Button>
  ) : (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => followAnalyst(analyst.id)}
      size="small"
    >
      Follow
    </Button>
  );

  return user.id === analyst.id ? null : followingButton;
};

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
  analyst: PropTypes.object.isRequired,
  followAnalyst: PropTypes.func.isRequired,
  unfollowAnalyst: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  followAnalyst,
  unfollowAnalyst,
};

export default connect(mapStateToProps, mapActionsToProps)(FollowButton);
