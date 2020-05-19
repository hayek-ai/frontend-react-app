import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import {
  setProfileBookmarks,
  setProfileReviews,
} from "../../../store/actions/profileActions";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Mui icons
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PieChartIcon from "@material-ui/icons/PieChart";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import RateReviewIcon from "@material-ui/icons/RateReview";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import RssFeedIcon from "@material-ui/icons/RssFeed";

// Components
import TabPanel from "./TabPanel";
import PerformanceTable from "./PerformanceTable";
import PositionTable from "./PositionTable";
import ReviewContainer from "../../Reviews/ReviewContainer";
import FeedContainer from "../../IdeaFeed/FeedContainer";
import FollowingList from "./FollowingList";
import WithLoading from "../../util/WithLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  tabs: {
    minWidth: "120px",
  },
}));

// Panels
const key = [
  "ideas",
  "performance",
  "positions",
  "reviews",
  "bookmarks",
  "following",
];

const UserContent = (props) => {
  const classes = useStyles();
  const { profile, panel, setProfileBookmarks, setProfileReviews } = props;
  const [panelIndex, setPanelIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const index = panel && key.indexOf(panel) !== -1 ? key.indexOf(panel) : 0;
    setPanelIndex(index);
    if (profile.username) {
      switch (index) {
        case 3: // reviews
          setProfileReviews(profile.id).then(() => {
            if (mounted) {
              setLoading(false);
            }
          });
          break;
        case 4: // bookmarks
          setProfileBookmarks(profile.username).then(() => {
            if (mounted) {
              setLoading(false);
            }
          });
          break;
        default:
          break;
      }
    }
    return () => (mounted = false);
  }, [
    panel,
    profile.username,
    profile.id,
    setProfileBookmarks,
    setProfileReviews,
  ]);

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
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab
            className={classes.tabs}
            label="Ideas"
            icon={<MenuBookIcon fontSize="small" />}
          />
          <Tab
            className={classes.tabs}
            label="Performance"
            icon={<EqualizerIcon fontSize="small" />}
          />
          <Tab
            className={classes.tabs}
            style={{ minWidth: "120px" }}
            label="Positions"
            icon={<PieChartIcon fontSize="small" />}
          />
          <Tab
            className={classes.tabs}
            label="Reviews"
            icon={<RateReviewIcon fontSize="small" />}
          />
          <Tab
            className={classes.tabs}
            label="Bookmarks"
            icon={<BookmarkIcon fontSize="small" />}
          />
          <Tab
            className={classes.tabs}
            label="Following"
            icon={<RssFeedIcon fontSize="small" />}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={panelIndex} index={0}>
        <WithLoading loading={loading}>
          <FeedContainer {...props} ideaFeed={profile.ideas} />
        </WithLoading>
      </TabPanel>
      <TabPanel value={panelIndex} index={1}>
        <WithLoading loading={loading}>
          <PerformanceTable analyst={profile} />
        </WithLoading>
      </TabPanel>
      <TabPanel value={panelIndex} index={2}>
        <WithLoading loading={loading}>
          <PositionTable ideas={profile.ideas} />
        </WithLoading>
      </TabPanel>
      <TabPanel value={panelIndex} index={3}>
        <WithLoading loading={loading}>
          <ReviewContainer reviews={profile.reviews} analystId={profile.id} />
        </WithLoading>
      </TabPanel>
      <TabPanel value={panelIndex} index={4}>
        <WithLoading loading={loading}>
          <FeedContainer {...props} ideaFeed={profile.bookmarkedIdeas} />
        </WithLoading>
      </TabPanel>
      <TabPanel value={panelIndex} index={5}>
        <FollowingList profile={profile} />
      </TabPanel>
    </div>
  );
};

UserContent.propTypes = {
  profile: PropTypes.object.isRequired,
  setProfileBookmarks: PropTypes.func.isRequired,
  setProfileReviews: PropTypes.func.isRequired,
  panel: PropTypes.string,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapActionsToProps = { setProfileBookmarks, setProfileReviews };

export default connect(mapStateToProps, mapActionsToProps)(UserContent);
