import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Mui stuff
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupIcon from "@material-ui/icons/Group";
import HelpIcon from "@material-ui/icons/Help";

const SideDrawer = (props) => {
  const { open, setOpen } = props;

  const handleListItemClick = (text) => {
    setOpen(false);
  };

  // if unauthed
  let items = [
    { text: "Signup", icon: <PersonAddIcon />, link: "/signup" },
    { text: "Login", icon: <AccountBoxIcon />, link: "/login" },
    { text: "About Us", icon: <GroupIcon />, link: "/about" },
    { text: "Help", icon: <HelpIcon />, link: "/help" },
  ];

  // if authed, change items

  const list = (
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
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      {list}
    </Drawer>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SideDrawer;
