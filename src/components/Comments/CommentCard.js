import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { convertUTCDateToLocalDate } from "../../util/utils";

// Redux
import { connect } from "react-redux";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";

import Serialize from "../util/slateSerializer";
import MyButton from "../util/MyButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    borderRadius: 0,
    textAlign: "left",
  },
  header: {
    padding: "10px",
    paddingBottom: 0,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const CommentCard = ({ comment, userId, handleDelete }) => {
  const classes = useStyles();
  const actionIcon =
    userId === comment.user.id ? (
      <MyButton tip="Delete Comment" onClick={() => handleDelete(comment.id)}>
        <DeleteIcon />
      </MyButton>
    ) : null;

  const body = JSON.parse(comment.body);

  return (
    <Card elevation={0} className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<Avatar src={comment.user.imageUrl} />}
        action={actionIcon}
        title={
          <Typography
            variant="subtitle1"
            component={Link}
            className={classes.link}
            to={`/profile/${comment.user.username}`}
          >
            {comment.user.username}
          </Typography>
        }
        subheader={`${dayjs(
          convertUTCDateToLocalDate(new Date(comment.createdAt))
        ).format("h:mm a, MMM DD YYYY")}`}
      />
      <CardContent>
        {body.map((block, index) => (
          <Serialize key={index} node={block} />
        ))}
      </CardContent>
    </Card>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.user.id,
});

export default connect(mapStateToProps)(CommentCard);
