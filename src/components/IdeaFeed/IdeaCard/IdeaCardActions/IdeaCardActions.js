import React, { useState } from "react";
import copy from "copy-to-clipboard";
import PropTypes from "prop-types";
import { getBaseUrl } from "../../../../util/utils";

// Components
import MyButton from "../../../util/MyButton";
import AlertModal from "../../../util/AlertModal";
import VoteButton from "./VoteButton";

// Mui Stuff
import { makeStyles } from "@material-ui/styles";
import CardActions from "@material-ui/core/CardActions";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import ReplyIcon from "@material-ui/icons/Reply";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 0 5px 0",
  },
  iconBox: {
    width: "33%",
    textAlign: "center",
  },
  iconText: {
    fontSize: 16,
    color: theme.palette.text.secondary,
    marginLeft: "10px",
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
  },
}));

const IdeaCardActions = (props) => {
  const { idea, handleCommentOpen, handleVote } = props;
  console.log(idea);
  const classes = useStyles();
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    color: null,
  });

  const handleIdeaLinkCopy = () => {
    copy(`${getBaseUrl()}idea/${idea.id}`);
    setAlertState({
      open: true,
      message: "Link copied!",
    });
  };

  return (
    <React.Fragment>
      <CardActions className={classes.root}>
        <div className={classes.iconBox}>
          <VoteButton idea={idea} handleVote={handleVote} />
        </div>
        <div className={classes.iconBox}>
          <MyButton onClick={() => handleCommentOpen(idea.id)} tip="Comments">
            <ModeCommentIcon className={classes.icon} />
            <span className={classes.iconText}>{idea.numComments}</span>
          </MyButton>
        </div>
        <div className={classes.iconBox}>
          <MyButton tip="Share Idea" onClick={handleIdeaLinkCopy}>
            <ReplyIcon className={classes.icon} />
            <span className={classes.iconText}>share</span>
          </MyButton>
        </div>
      </CardActions>
      <AlertModal
        open={alertState.open}
        onClose={() => setAlertState({ open: false, message: "", color: null })}
        message={alertState.message}
        color={alertState.color}
      />
    </React.Fragment>
  );
};

IdeaCardActions.propTypes = {
  idea: PropTypes.object.isRequired,
};

export default IdeaCardActions;
