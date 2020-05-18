import React, { useState } from "react";
import PropTypes from "prop-types";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/Textfield";
import FormControl from "@material-ui/core/FormControl";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const MAX_TITLE_CHARS = 100;
const MAX_BODY_CHARS = 1000;

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  formControl: { marginBottom: 40, width: "100%" },
  dialogButton: { margin: 20 },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: 10,
    textAlign: "center",
  },
}));

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const validateReview = (review) => {
  const errors = {};
  for (const [property, value] of Object.entries(review)) {
    if (value === null || value === "") {
      errors[property] = "Cannot be blank";
    }
  }
  if (!isEmpty(errors)) return errors;
  if (review.title.length > MAX_TITLE_CHARS) {
    errors.title = `Cannot be more than ${MAX_TITLE_CHARS}.`;
  }
  if (review.body.length > MAX_BODY_CHARS) {
    errors.body = `Cannot be more than ${MAX_BODY_CHARS}.`;
  }
  if (review.stars < 1 || review.stars > 5) {
    errors.stars = "Review stars must be a number between 1 and 5.";
  }
  return errors;
};

const AddReviewDialog = ({ handlePostReview }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [review, setReview] = useState({
    title: "",
    body: "",
    stars: null,
  });
  const [errors, setErrors] = useState({});
  const [helperText, setHelperText] = useState({});

  const handleChange = (event) => {
    event.persist();
    const length = event.target.value.length;
    let helperText;
    if (event.target.name === "title") {
      helperText = `${length}/${MAX_TITLE_CHARS} characters`;
      if (length > MAX_TITLE_CHARS) {
        setErrors((prevState) => ({
          ...prevState,
          title: `Title cannot be more than ${MAX_TITLE_CHARS} characters.`,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          title: null,
        }));
      }
    } else if (event.target.name === "body") {
      helperText = `${length}/${MAX_BODY_CHARS} characters`;
      if (length > MAX_BODY_CHARS) {
        setErrors((prevState) => ({
          ...prevState,
          body: `Body cannot be more than ${MAX_BODY_CHARS} characters.`,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          body: null,
        }));
      }
    }
    setHelperText((prevState) => ({
      ...prevState,
      [event.target.name]: helperText,
    }));
    setReview((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRatingChange = (newValue) => {
    setReview((prevState) => ({ ...prevState, stars: newValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateReview(review);
    if (isEmpty(errors)) {
      setOpen(false);
      handlePostReview(review);
    } else {
      setErrors({ ...errors });
    }
  };

  const isSubmitDisabled =
    errors.title ||
    errors.body ||
    review.stars === null ||
    review.body === "" ||
    review.title === ""
      ? true
      : false;

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ width: "300px" }}
      >
        Write an Analyst Review
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Post a Review!</DialogTitle>
        <DialogContent className={classes.content}>
          <Box
            component="fieldset"
            mb={3}
            style={{ padding: 0 }}
            borderColor="transparent"
          >
            <Typography component="legend">Overall Rating</Typography>
            <Rating
              name="stars"
              value={review.stars}
              size="large"
              onChange={(event, newValue) => {
                handleRatingChange(newValue);
              }}
            />
          </Box>
          <FormControl className={classes.formControl}>
            <TextField
              name="title"
              type="text"
              label="Add a headline"
              variant="outlined"
              helperText={helperText.title}
              error={errors.title ? true : false}
              value={review.title}
              onChange={handleChange}
              multiline
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              name="body"
              type="text"
              label="Write your review"
              variant="outlined"
              helperText={helperText.body}
              error={errors.body ? true : false}
              value={review.body}
              onChange={handleChange}
              multiline
              fullWidth
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.dialogButton}
            onClick={() => setOpen(false)}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.dialogButton}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

AddReviewDialog.propTypes = {
  handlePostReview: PropTypes.func.isRequired,
};

export default AddReviewDialog;
