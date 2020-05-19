import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import { setProfileBookmarks } from "../../../store/actions/profileActions";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Mui icons
import BookmarkIcon from "@material-ui/icons/Bookmark";
import RssFeedIcon from "@material-ui/icons/RssFeed";

// Components
import TabPanel from "./TabPanel";
import FeedContainer from "../../IdeaFeed/FeedContainer";
import FollowingList from "./FollowingList";
import WithLoading from "../../util/WithLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

// Panels
const key = ["bookmarks", "following"];
const UserContent = (props) => {
  const classes = useStyles();
  const { profile, panel, setProfileBookmarks } = props;
  const [panelIndex, setPanelIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const index = panel && key.indexOf(panel) !== -1 ? key.indexOf(panel) : 0;
    setPanelIndex(index);
    if (profile.username && index === 0) {
      setLoading(true);
      setProfileBookmarks(profile.username).then(() => {
        if (mounted) {
          setLoading(false);
        }
      });
    }
    return () => (mounted = false);
  }, [panel, profile.username, setProfileBookmarks]);

  const handleChange = (event, newIndex) => {
    props.history.push(`/profile/${profile.username}/${key[newIndex]}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" variant="outlined">
        <Tabs
          value={panelIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Bookmarks" icon={<BookmarkIcon fontSize="small" />} />
          <Tab label="Following" icon={<RssFeedIcon fontSize="small" />} />
        </Tabs>
      </AppBar>
      <TabPanel value={panelIndex} index={0}>
        <WithLoading loading={loading}>
          <FeedContainer {...props} ideaFeed={profile.bookmarkedIdeas} />
        </WithLoading>
      </TabPanel>
      <TabPanel value={panelIndex} index={1}>
        <FollowingList profile={profile} />
      </TabPanel>
    </div>
  );
};

UserContent.propTypes = {
  profile: PropTypes.object.isRequired,
  setProfileBookmarks: PropTypes.func.isRequired,
  panel: PropTypes.string,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { setProfileBookmarks })(UserContent);
