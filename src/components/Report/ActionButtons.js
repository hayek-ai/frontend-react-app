import React from "react";
import PropTypes from "prop-types";
import { abbreviateNumber } from "../../util/utils";

// Redux stuff
import { connect } from "react-redux";
import {
  upvoteIdea,
  removeUpvote,
  downvoteIdea,
  removeDownvote,
  bookmarkIdea,
  removeBookmark,
} from "../../store/actions/userActions";

// Components
import VoteButton from "../IdeaFeed/IdeaCard/IdeaCardActions/VoteButton";
import MyButton from "../util/MyButton";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexWrap: "wrap",
  },
  iconBox: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 0,
  },
  iconText: {
    fontSize: "16px",
    color: theme.palette.text.secondary,
    marginLeft: "10px",
  },
  iconGroup: {
    padding: "5px 3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  regButton: {
    padding: "5px",
  },
}));

const ActionButtons = (props) => {
  const {
    idea,
    setIdea,
    upvoteIdea,
    removeUpvote,
    downvoteIdea,
    removeDownvote,
    bookmarkIdea,
    removeBookmark,
    scrollToComments,
    bookmarks,
  } = props;

  const classes = useStyles();

  const isIdeabookmarked = Boolean(
    bookmarks.find((bookmark) => bookmark.ideaId === idea.id)
  );

  const handleVote = async (type, ideaId) => {
    let updatedIdea;
    switch (type) {
      case "upvote":
        updatedIdea = await upvoteIdea(ideaId);
        break;
      case "removeUpvote":
        updatedIdea = await removeUpvote(ideaId);
        break;
      case "downvote":
        updatedIdea = await downvoteIdea(ideaId);
        break;
      case "removeDownvote":
        updatedIdea = await removeDownvote(ideaId);
        break;
      default:
        console.log("Error: Incorrect Vote Type.");
    }
    setIdea((prevState) => ({
      ...prevState,
      ...updatedIdea,
      thesisSummary: updatedIdea.thesisSummary
        ? JSON.parse(updatedIdea.thesisSummary)
        : null,
    }));
  };

  const handleBookmark = () => {
    if (isIdeabookmarked) {
      removeBookmark(idea.id);
    } else {
      bookmarkIdea(idea.id);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.iconBox}>
          <VoteButton idea={idea} handleVote={handleVote} />
        </div>
        <div className={classes.iconBox}>
          <MyButton
            onClick={() => scrollToComments()}
            tip="Comments"
            btnClassName={classes.regButton}
          >
            <div className={classes.iconGroup}>
              <ModeCommentIcon className={classes.icon} />
              <span className={classes.iconText}>
                {abbreviateNumber(idea.numComments)}
              </span>
            </div>
          </MyButton>
        </div>
        <div className={classes.iconBox}>
          <MyButton
            onClick={handleBookmark}
            tip="Bookmark"
            btnClassName={classes.regButton}
          >
            <div className={classes.iconGroup}>
              <BookmarkIcon
                color={isIdeabookmarked ? "primary" : "inherit"}
                className={classes.icon}
              />
            </div>
          </MyButton>
        </div>
      </div>
    </React.Fragment>
  );
};

ActionButtons.propTypes = {
  idea: PropTypes.object.isRequired,
  setIdea: PropTypes.func.isRequired,
  upvoteIdea: PropTypes.func.isRequired,
  removeUpvote: PropTypes.func.isRequired,
  downvoteIdea: PropTypes.func.isRequired,
  removeDownvote: PropTypes.func.isRequired,
  bookmarkIdea: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bookmarks: state.user.bookmarks,
});

const mapActionsToProps = {
  upvoteIdea,
  removeUpvote,
  downvoteIdea,
  removeDownvote,
  bookmarkIdea,
  removeBookmark,
};

export default connect(mapStateToProps, mapActionsToProps)(ActionButtons);
