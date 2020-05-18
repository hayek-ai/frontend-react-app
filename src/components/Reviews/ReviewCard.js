import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckIcon from "@material-ui/icons/Check";
import Rating from "@material-ui/lab/Rating";

// Components
import ConfirmActionDialog from "../util/ConfirmActionDialog";

const useStyles = makeStyles((theme) => ({
  showMore: {
    fontWeight: 600,
    "&:hover": {
      cursor: "pointer",
    },
  },
  card: {
    margin: "10px 0",
    borderRadius: 0,
    textAlign: "left",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const ReviewCard = ({ review, userId, handleDeleteReview }) => {
  const classes = useStyles();
  let showAction = false;
  if (review.user.id === userId) {
    showAction = true;
  }
  const [showMore, setShowMore] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const action = (
    <React.Fragment>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setConfirmOpen(true);
          }}
        >
          DeleteReview
        </MenuItem>
      </Menu>
    </React.Fragment>
  );

  const rating = (
    <div style={{ display: "flex", margin: "5px 0" }}>
      <Rating
        value={review.stars}
        readOnly
        size="small"
        style={{ marginRight: "10px" }}
      />
      <CheckIcon fontSize="small" />
      <Typography variant="subtitle2" style={{ marginRight: 10 }}>
        Hayek Pro Member
      </Typography>
    </div>
  );

  return (
    <React.Fragment>
      <Card variant="outlined" className={classes.card}>
        <CardHeader
          avatar={<Avatar alt="user avatar" src={review.user.imageUrl} />}
          action={showAction ? action : null}
          title={
            <Typography
              variant="h6"
              component={Link}
              className={classes.link}
              to={`/profile/${review.user.username}`}
            >
              {review.user.username}
            </Typography>
          }
          subheader={new Date(review.createdAt).toDateString()}
          style={{ paddingBottom: 0 }}
        />
        <CardContent style={{ pading: "16px" }}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 700, marginBottom: "5px" }}
          >
            {review.title}
          </Typography>
          {rating}
          {review.body.length > 175 ? (
            <React.Fragment>
              <Typography variant="body1" style={{ wordWrap: "wrap" }}>
                {showMore ? review.body : `${review.body.substring(0, 175)}...`}
              </Typography>
              <Typography
                varaint="body1"
                className={classes.showMore}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "Show More"}
              </Typography>
            </React.Fragment>
          ) : (
            <Typography style={{ wordBreak: "break-all" }} variant="body1">
              {review.body}
            </Typography>
          )}
        </CardContent>
      </Card>
      <ConfirmActionDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Are you sure you want to delete your review?"
        prompt="This action cannot be reversed."
        cancelButtonText="Cancel"
        onCancelClick={() => setConfirmOpen(false)}
        confirmButtonText="Delete"
        onConfirmClick={() => handleDeleteReview(review.id)}
      />
    </React.Fragment>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  handleDeleteReview: PropTypes.func.isRequired,
};

export default ReviewCard;
