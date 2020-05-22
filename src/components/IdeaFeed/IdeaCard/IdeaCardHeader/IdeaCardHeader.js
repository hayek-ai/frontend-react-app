import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getNumberWithOrdinal } from "../../../../util/utils";
import dayjs from "dayjs";

// Redux
import { connect } from "react-redux";
import { closeIdea } from "../../../../store/actions/profileActions";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

// Components
import IdeaCardMenu from "./IdeaCardMenu";
import AlertModal from "../../../util/AlertModal";
import ConfirmActionDialog from "../../../util/ConfirmActionDialog";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const IdeaCardHeader = ({ idea, user, closeIdea }) => {
  const classes = useStyles();
  const [isIdeaClosed, setIsIdeaClosed] = useState(idea.closedDate != null);
  const [alertState, setAlertState] = useState({ open: false, message: "" });
  const [confirmIdeaCloseOpen, setConfirmIdeaCloseOpen] = useState(false);

  let showAction = true;
  if (idea.analystId === user.id && isIdeaClosed) {
    showAction = false;
  }

  const ClosedIcon = () => (
    <div className={classes.closedWarning}>
      <Typography variant="body2">Closed</Typography>
    </div>
  );

  const handleIdeaClose = () => {
    closeIdea(idea.id).then((res) => {
      setIsIdeaClosed(true);
      setConfirmIdeaCloseOpen(false);
      setAlertState({ open: true, message: "Idea successfully closed." });
    });
  };

  const confirmIdeaClose = () => {
    setConfirmIdeaCloseOpen(true);
  };

  return (
    <React.Fragment>
      <CardHeader
        className={classes.header}
        avatar={<Avatar src={idea.analyst.imageUrl} />}
        action={
          showAction ? (
            <IdeaCardMenu
              idea={idea}
              closedIcon={<ClosedIcon />}
              confirmIdeaClose={confirmIdeaClose}
              isIdeaClosed={isIdeaClosed}
            />
          ) : (
            <div style={{ padding: 16 }}>
              <ClosedIcon />
            </div>
          )
        }
        title={
          <Typography
            variant="h6"
            component={Link}
            className={classes.link}
            to={`/profile/${idea.analyst.username}`}
          >
            {idea.analyst.username}
          </Typography>
        }
        subheader={`${dayjs(new Date(idea.createdAt)).format(
          "MMM DD YYYY"
        )} | Analyst Rank: ${getNumberWithOrdinal(idea.analyst.analystRank)}`}
      />
      <ConfirmActionDialog
        open={confirmIdeaCloseOpen}
        onClose={() => setConfirmIdeaCloseOpen(false)}
        title="Are you sure you want to close this idea?"
        prompt="Once you close an idea, its performance is locked in and the action cannot be reversed."
        cancelButtonText="Cancel"
        onCancelClick={() => setConfirmIdeaCloseOpen(false)}
        confirmButtonText="Close Idea"
        onConfirmClick={handleIdeaClose}
      />
      <AlertModal
        open={alertState.open}
        onClose={() => setAlertState({ open: false, message: "" })}
        message={alertState.message}
      />
    </React.Fragment>
  );
};

IdeaCardHeader.propTypes = {
  idea: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  closeIdea: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { closeIdea })(IdeaCardHeader);
