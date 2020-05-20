import React, { useState } from "react";
import PropTypes from "prop-types";
import { abbreviateNumber } from "../../../util/utils";

// Redux
import { connect } from "react-redux";

// Mui stuff
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";

// Components
import EditDialog from "./EditDialog";
import Bio from "./Bio";
import WithLoading from "../../util/WithLoading";
import useStyles from "./ProfileHeader.styles";
import NewIdeaDialog from "../../Report/NewIdeaDialog/NewIdeaDialog";
import FollowButton from "../../util/FollowButton";

const ProfileHeader = ({ profile, user }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const TopRightComponent = () => {
    if (profile.isOwn) {
      return <EditDialog setLoading={setLoading} user={user} />;
    } else if (profile.isAnalyst) {
      return (
        <div style={{ height: "30px" }}>
          <FollowButton analyst={profile} />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Paper variant="outlined" className={classes.root}>
      <WithLoading loading={loading}>
        <div className={classes.heading}>
          <div className={classes.imageWrapper}>
            <Avatar
              src={`${
                profile.isOwn ? user.imageUrl : profile.imageUrl
              }?t=${new Date().getTime()}`}
              className={classes.profileImage}
            />
          </div>
          <TopRightComponent />
        </div>
        <Typography className={classes.title}>{profile.username}</Typography>
        {profile.isAnalyst && (
          <React.Fragment>
            <div className={classes.ratingContainer}>
              <Rating
                value={parseFloat(profile.reviewStarTotal / profile.numReviews)}
                readOnly
                precision={0.1}
                size="small"
                style={{ marginRight: "6px" }}
              />
              <Typography variant="body2">
                {abbreviateNumber(profile.numReviews)}
              </Typography>
            </div>
            <Typography
              variant="subtitle2"
              style={{ fontWeight: 700 }}
            >{`${abbreviateNumber(profile.numFollowers)} Follower${
              profile.numFollowers === 1 ? "" : "s"
            }`}</Typography>
          </React.Fragment>
        )}
        <Bio bio={profile.isOwn ? user.bio : profile.bio} />
        {profile.isOwn && profile.isAnalyst && <NewIdeaDialog />}
      </WithLoading>
    </Paper>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfileHeader);