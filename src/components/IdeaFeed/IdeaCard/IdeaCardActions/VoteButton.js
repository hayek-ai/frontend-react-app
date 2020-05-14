import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MyButton from "../../../util/MyButton";
import { useStyles } from "./IdeaCardActions";

const GREEN = "#129D58";
const RED = "#D23F31";

const VoteButton = ({ user, idea, handleVote }) => {
  const classes = useStyles();
  const upvotedIdea = () => {
    if (
      user.upvotes &&
      user.upvotes.find((upvote) => upvote.ideaId === idea.id)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const downvotedIdea = () => {
    if (
      user.downvotes &&
      user.downvotes.find((downvote) => downvote.ideaId === idea.id)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const upvote = () => {
    handleVote("upvote", idea.id);
  };
  const removeUpvote = () => {
    handleVote("removeUpvote", idea.id);
  };
  const downvote = () => {
    handleVote("downvote", idea.id);
  };
  const removeDownvote = () => {
    handleVote("removeDownvote", idea.id);
  };

  let voteButton;
  if (upvotedIdea()) {
    voteButton = (
      <div>
        <div style={{ color: `${GREEN}` }}>
          <MyButton tip="Undo Upvote" onClick={removeUpvote}>
            <ArrowUpwardIcon />
          </MyButton>
          <span className={classes.iconText} style={{ margin: 0, padding: 5 }}>
            {idea.score}
          </span>
        </div>
        <MyButton tip="Downvote" onClick={downvote}>
          <ArrowDownwardIcon className={classes.icon} />
        </MyButton>
      </div>
    );
  } else if (downvotedIdea()) {
    voteButton = (
      <div>
        <MyButton tip="Upvote" onClick={upvote}>
          <ArrowUpwardIcon />
        </MyButton>
        <div style={{ color: `${RED}` }}>
          <span className={classes.iconText} style={{ margin: 0, padding: 5 }}>
            {idea.score}
          </span>
          <MyButton tip="Undo Downvote" onClick={removeDownvote}>
            <ArrowDownwardIcon className={classes.icon} />
          </MyButton>
        </div>
      </div>
    );
  } else {
    voteButton = (
      <div>
        <MyButton tip="Upvote" onClick={upvote}>
          <ArrowUpwardIcon />
        </MyButton>
        <span className={classes.iconText} style={{ margin: 0, padding: 5 }}>
          {idea.score}
        </span>
        <MyButton tip="Downvote" onClick={downvote}>
          <ArrowDownwardIcon className={classes.icon} />
        </MyButton>
      </div>
    );
  }

  return voteButton;
};

VoteButton.propTypes = {
  user: PropTypes.object.isRequired,
  idea: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(VoteButton);
