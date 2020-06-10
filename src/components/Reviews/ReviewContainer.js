import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { postReview, deleteReview } from "../../store/actions/profileActions";

// Mui stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/IconButton";

// Components
import ReviewCard from "./ReviewCard";
import ReviewSummary from "./ReviewSummary";
import AddReviewDialog from "./AddReviewDialog";
import WithLoading from "../util/WithLoading";
import AlertModal from "../util/AlertModal";

const ReviewContainer = (props) => {
  const { reviews, analystId, user, postReview, deleteReview } = props;
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({ open: false, message: "" });

  const handlePostReview = (reviewData) => {
    setLoading(true);
    postReview(analystId, reviewData).then(() => {
      setLoading(false);
      setAlertState({ open: true, message: "Review successfully posted!" });
    });
  };

  const handleDeleteReview = (reviewId) => {
    setLoading(true);
    deleteReview(reviewId).then(() => {
      setLoading(false);
      setAlertState({ open: true, message: "Review successfully deleted." });
    });
  };

  // user cannot post review if not pro tier or if has already left review
  const reviewCallToAction = !user.isProTier ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      Must be a Hayek Pro member to review an analyst
      <Button
        style={{ margin: "20px" }}
        variant="outlined"
        color="primary"
        component={Link}
        to="/plan"
      >
        Join Hayek Pro
      </Button>
    </div>
  ) : reviews.some((review) => review.userId === user.id) ? (
    <Typography variant="body1">Thank you for posting your review!</Typography>
  ) : (
    <AddReviewDialog handlePostReview={handlePostReview} />
  );

  return (
    <WithLoading loading={loading}>
      <ReviewSummary reviews={reviews}>{reviewCallToAction}</ReviewSummary>
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          review={review}
          userId={user.id}
          handleDeleteReview={handleDeleteReview}
        />
      ))}
      <AlertModal
        open={alertState.open}
        onClose={() => setAlertState({ open: false, message: "" })}
        message={alertState.message}
      />
    </WithLoading>
  );
};

ReviewContainer.propTypes = {
  reviews: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  analystId: PropTypes.number.isRequired,
  postReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { postReview, deleteReview };

export default connect(mapStateToProps, mapActionsToProps)(ReviewContainer);
