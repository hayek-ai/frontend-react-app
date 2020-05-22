import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Redux stuff
import { connect } from "react-redux";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

// Components
import EmptyFeed from "../../util/EmptyFeed";
import FollowButton from "../../util/FollowButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  heading: {
    width: "100%",
    textAlign: "center",
    padding: "20px 0 15px 0",
  },
}));

const FollowingList = (props) => {
  const { user, profile } = props;
  const classes = useStyles();

  const following = profile.id === user.id ? user.following : profile.following;

  // save a few computations
  const followingLength = following.length;

  const ListItems = () => {
    if (followingLength === 0) {
      return <EmptyFeed message="No analysts to show." />;
    } else {
      return following.map((analyst, index) => (
        <React.Fragment key={index}>
          <ListItem style={{ padding: "10px" }}>
            <ListItemAvatar>
              <Avatar src={analyst.imageUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link
                  to={`/profile/${analyst.username}`}
                  className={classes.link}
                >
                  {analyst.username}
                </Link>
              }
            />
            {<FollowButton analyst={analyst} />}
          </ListItem>
          {index !== followingLength - 1 && <Divider />}
        </React.Fragment>
      ));
    }
  };

  return (
    <Paper variant="outlined" className={classes.root}>
      <List dense={true} style={{ padding: 0 }}>
        <ListItems />
      </List>
    </Paper>
  );
};

FollowingList.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(FollowingList);
