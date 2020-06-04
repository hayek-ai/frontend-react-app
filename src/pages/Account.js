import React, { useState } from "react";
import { Link } from "react-router-dom";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Redux stuff
import { connect } from "react-redux";
import { cancelSubscription } from "../store/actions/userActions";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";
import ConfirmActionDialog from "../components/util/ConfirmActionDialog";
import AlertModal from "../components/util/AlertModal";
import WithLoading from "../components/util/WithLoading";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    margin: "10px 0",
  },
  label: {
    ...theme.typography.body1,
    fontWeight: 700,
    marginRight: "10px",
  },
  list: {
    ...theme.typography.body1,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const AboutUs = ({ user, cancelSubscription }) => {
  const classes = useStyles();
  const [deletePromptOpen, setDeletePromptOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    color: null,
  });

  const handleCancelSubscription = async () => {
    setDeletePromptOpen(false);
    setLoading(true);
    cancelSubscription()
      .then(() => {
        setLoading(false);
        setAlertState({
          open: true,
          message: "Subscription successfully deleted.",
          color: null,
        });
      })
      .catch((err) => {
        setLoading(false);
        setAlertState({
          open: true,
          message: "Oops, something went wrong. Please try again.",
          color: "error",
        });
      });
  };

  const planMarkup =
    user.proTierStatus === "succeeded" ? (
      <React.Fragment>
        <div className={classes.row}>
          <Typography className={classes.label}>Plan:</Typography>
          <Typography variant="body1">Hayek Pro</Typography>
        </div>
        <Typography variant="body2">
          <span
            className={classes.link}
            onClick={() => setDeletePromptOpen(true)}
          >
            Click here
          </span>{" "}
          if you would like to cancel your subscription to Hayek Pro
        </Typography>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className={classes.row}>
          <Typography className={classes.label}>Plan:</Typography>
          <Typography variant="body1">Free</Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/plan"
          style={{ margin: "20px 0" }}
        >
          Upgrade to Hayek Pro
        </Button>
      </React.Fragment>
    );
  return (
    <FullPageLayout containerType="wideContainer" paperBackground={true}>
      <WithLoading loading={loading}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={user.imageUrl}
            style={{ width: "75px", height: "75px", marginBottom: "20px" }}
          />
          <div className={classes.row}>
            <Typography className={classes.label}>Username:</Typography>
            <Typography variant="body1">{user.username}</Typography>
          </div>
          {user.isAnalyst && (
            <Typography className={classes.label}>Analyst</Typography>
          )}
          {planMarkup}
          {!user.isAnalyst && (
            <div style={{ maxWidth: "400px", marginTop: "40px" }}>
              <Typography
                align="center"
                variant="h6"
                style={{ fontWeight: 700 }}
                gutterBottom
              >
                Want to become an analyst?
              </Typography>
              <Typography variant="body1" gutterBottom>
                We split half of all advertising and subscription proceeds with
                our analyst community. Analysts also get free access to Hayek
                Pro if they publish at least two ideas per year.
              </Typography>
              <Typography variant="body1" gutterBottom>
                To apply, send an email to team@hayek.ai with:
              </Typography>
              <ul className={classes.list}>
                <li>Your username</li>
                <li>1-2 sentences on your background</li>
                <li>
                  a write-up of the first investment idea you plan to post.
                </li>
              </ul>
              <Typography variant="body1" gutterBottom>
                We will do our best to get back to you in less than 12 hours.
              </Typography>
            </div>
          )}
        </div>
      </WithLoading>
      <ConfirmActionDialog
        open={deletePromptOpen}
        onClose={() => setDeletePromptOpen(false)}
        title="Are you sure you want to cancel your subscription to Hayek Pro?"
        prompt=""
        cancelButtonText="Cancel"
        onCancelClick={() => setDeletePromptOpen(false)}
        confirmButtonText="Delete Subscription"
        onConfirmClick={handleCancelSubscription}
      />
      <AlertModal
        open={alertState.open}
        onClose={() => setAlertState({ open: false, message: "", color: null })}
        message={alertState.message}
        color={alertState.color}
      />
    </FullPageLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { cancelSubscription })(AboutUs);
