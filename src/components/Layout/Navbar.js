import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../assets/logo.svg";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  toolbar: {
    justifyContent: "center",
  },
  navTitle: {
    fontWeight: 300,
    fontSize: "1.8rem",
    lineHeight: 1.167,
    color: theme.palette.primary.main,
  },
  logo: {
    width: 35,
    height: 35,
    objectFit: "cover",
    marginRight: 10,
  },
}));

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Navbar = (props) => {
  const classes = useStyles();
  const { setOpen } = props;

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar variant="outlined" color="inherit">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="primary"
              style={{ marginRight: "auto" }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none", color: "unset" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Logo} alt="logo" className={classes.logo} />
                <Typography className={classes.navTitle}>hayek.ai</Typography>
              </div>
            </Link>
            <div style={{ marginLeft: "auto" }}>
              <Tooltip title="Notifications">
                <IconButton edge="start" color="primary">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* margin to ensure content below AppBar */}
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

Navbar.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default Navbar;
