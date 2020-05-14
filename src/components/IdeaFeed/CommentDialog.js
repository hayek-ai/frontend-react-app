import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../util/utils";

// Components
import CommentCard from "../Comments/CommentCard";
import EmptyFeed from "../util/EmptyFeed";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const CommentDialog = (props) => {
  const { idea, open, handleCommentClose, handleCommentDelete } = props;
  const classes = useStyles();

  const commentMarkup =
    idea.comments.length > 0 ? (
      idea.comments.map((comment, index) => (
        <CommentCard
          comment={comment}
          key={index}
          handleCommentDelete={handleCommentDelete}
        />
      ))
    ) : (
      <EmptyFeed message="No comments yet." />
    );

  return (
    <Dialog open={open} onClose={handleCommentClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Link to={`report/${idea.id}`} className={classes.link}>
          {`${capitalizeFirstLetter(idea.positionType)} ${idea.companyName} (${
            idea.symbol
          }) `}
        </Link>
        by
        <Link to={`profile/${idea.analyst.username}`} className={classes.link}>
          {` ${idea.analyst.username}`}
        </Link>
      </DialogTitle>
      <DialogContent dividers={true} style={{ padding: 0 }}>
        {commentMarkup}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCommentClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CommentDialog.propTypes = {
  idea: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCommentClose: PropTypes.func.isRequired,
};

export default CommentDialog;
