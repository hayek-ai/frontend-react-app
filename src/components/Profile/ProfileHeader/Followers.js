import React, { useState } from "react";
import { abbreviateNumber } from "../../../util/utils";
import PropTypes from "prop-types";

// Mui Stuff
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

// Components
import FollowList from "../ProfileContent/FollowList";
import EmptyFeed from "../../util/EmptyFeed";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
}));

const Followers = ({ numFollowers, followers }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleClick}
        style={{ fontWeight: 700 }}
        size="small"
      >{`${abbreviateNumber(numFollowers)} Follower${
        numFollowers === 1 ? "" : "s"
      }`}</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}
      >
        <div className={classes.paper}>
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            Followers
          </Typography>
          {numFollowers > 0 ? (
            <FollowList followList={followers} />
          ) : (
            <EmptyFeed message={"No followers yet!"} />
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
};

Followers.propTypes = {
  numFollowers: PropTypes.number.isRequired,
  followers: PropTypes.array.isRequired,
};

export default Followers;
