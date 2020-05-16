import React, { useState } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Mui stuff
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Components
import EditDialog from "./EditDialog";
import Bio from "../Bio";
import WithLoading from "../../../util/WithLoading";
import useStyles from "../ProfileHeader.styles";

const UserHeader = ({ profile, user }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  return (
    <Paper variant="outlined" className={classes.root}>
      <WithLoading loading={loading}>
        <div className={classes.heading}>
          <div className={classes.imageWrapper}>
            <img
              src={`${
                profile.isOwn ? user.imageUrl : profile.imageUrl
              }?t=${new Date().getTime()}`}
              alt="profile"
              className={classes.profileImage}
            />
          </div>
          {profile.isOwn && <EditDialog setLoading={setLoading} user={user} />}
        </div>
        <Typography className={classes.title}>{profile.username}</Typography>
        <Bio bio={profile.isOwn ? user.bio : profile.bio} />
      </WithLoading>
    </Paper>
  );
};

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  profile: state.profile,
});

export default connect(mapStateToProps)(UserHeader);
