import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { logoutUser, updateUser } from "../../store/actions/userActions";

// Mui stuff
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";

// Icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupIcon from "@material-ui/icons/Group";
import HelpIcon from "@material-ui/icons/Help";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import StarIcon from "@material-ui/icons/Star";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SettingsIcon from "@material-ui/icons/Settings";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const SideDrawer = (props) => {
  const { user, open, setOpen, updateUser, logoutUser } = props;

  const handleListItemClick = (text) => {
    setOpen(false);
    if (text === "Logout") {
      logoutUser();
    }
    if (text === "Dark Mode") {
      const formData = new FormData();
      formData.append("prefersDarkmode", !user.prefersDarkmode);
      updateUser(formData);
    }
  };

  // if unauthed
  let items = [
    { text: "Signup", icon: <PersonAddIcon />, link: "/signup" },
    { text: "Login", icon: <AccountBoxIcon />, link: "/login" },
    { text: "About Us", icon: <GroupIcon />, link: "/about" },
    { text: "Help", icon: <HelpIcon />, link: "/help" },
  ];

  // if authed, change items
  if (user.isAuthenticated) {
    items = [
      {
        text: "Profile",
        icon: <AccountBoxIcon />,
        link: `/profile/${user.username}`,
      },
      { text: "Idea Feed", icon: <DynamicFeedIcon />, link: "/feed" },
      { text: "Leaderboard", icon: <StarIcon />, link: "/leaderboard" },
      {
        text: "Bookmarks",
        icon: <BookmarkIcon />,
        link: `/profile/${user.username}/bookmarks`,
      },
      { text: "Account", icon: <SettingsIcon />, link: "/account" },
      { text: "About Us", icon: <GroupIcon />, link: "/about" },
      { text: "Help", icon: <HelpIcon />, link: "/help" },
      { text: "Dark Mode", icon: <Brightness3Icon /> },
      { text: "Logout", icon: <ExitToAppIcon /> },
    ];
  }

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.text}
            button
            component={item.link ? Link : null}
            to={item.link}
            onClick={() => handleListItemClick(item.text)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            {item.text === "Dark Mode" ? (
              <Switch color="primary" checked={user.prefersDarkmode} />
            ) : null}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

SideDrawer.propTypes = {
  user: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, updateUser };

export default connect(mapStateToProps, mapActionsToProps)(SideDrawer);
