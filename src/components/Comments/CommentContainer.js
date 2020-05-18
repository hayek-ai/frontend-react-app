import React, { useState } from "react";
import PropTypes from "prop-types";
import { submitComment, deleteComment } from "../../api";

// Components
import CommentCard from "./CommentCard";
import EmptyFeed from "../util/EmptyFeed";
import RichTextEditor from "../util/RichTextEditor";
import WithLoading from "../util/WithLoading";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ModeCommentIcon from "@material-ui/icons/ModeComment";

const useStyles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
    paddingBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 5px",
    marginBottom: "20px",
  },
}));

const initialCommentState = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

const CommentContainer = ({ idea, setIdea }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState(initialCommentState);

  const handleDelete = async (commentId) => {
    setLoading(true);
    deleteComment(commentId).then((newIdea) => {
      setLoading(false);
      setIdea((prevState) => ({
        ...prevState,
        comments: [...newIdea.comments],
        numComments: newIdea.numComments,
      }));
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    submitComment(idea.id, JSON.stringify(newComment)).then((newIdea) => {
      setLoading(false);
      setIdea((prevState) => ({
        ...prevState,
        comments: [...newIdea.comments],
        numComments: newIdea.numComments,
      }));
      setNewComment(initialCommentState);
    });
  };

  const commentMarkup =
    idea.comments.length > 0 ? (
      idea.comments.map((comment, index) => (
        <CommentCard
          comment={comment}
          key={index}
          handleDelete={handleDelete}
        />
      ))
    ) : (
      <EmptyFeed message="No comments yet." />
    );
  return (
    <React.Fragment>
      <div className={classes.heading}>
        <div style={{ padding: "5px" }}>
          <ModeCommentIcon color="inherit" />
        </div>
        <Typography variant="subtitle1">
          {` ${idea.numComments} comments`}
        </Typography>
      </div>
      <WithLoading loading={loading}>
        <div style={{ padding: "5px" }}>
          <RichTextEditor
            value={newComment}
            setValue={setNewComment}
            placeholder="What are your thoughts?"
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Add Comment
          </Button>
        </div>
      </WithLoading>

      {commentMarkup}
    </React.Fragment>
  );
};

CommentContainer.propTypes = {
  idea: PropTypes.object.isRequired,
};

export default CommentContainer;
