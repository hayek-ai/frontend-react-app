import React, { useState } from "react";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";
import PropTypes from "prop-types";
import { getBaseUrl, abbreviateNumber } from "../../../../util/utils";

// Components
import MyButton from "../../../util/MyButton";
import AlertModal from "../../../util/AlertModal";
import VoteButton from "./VoteButton";

// Mui Stuff
import CardActions from "@material-ui/core/CardActions";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import ReplyIcon from "@material-ui/icons/Reply";

import useStyles from "./IdeaCardActions.styles";

const IdeaCardActions = ({ idea, handleVote }) => {
  const classes = useStyles();
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    color: null,
  });

  const handleIdeaLinkCopy = () => {
    copy(`${getBaseUrl()}report/${idea.id}`);
    setAlertState({
      open: true,
      message: "Link copied!",
    });
  };

  return (
    <React.Fragment>
      <CardActions className={classes.root} disableSpacing>
        <div className={classes.iconBox}>
          <VoteButton idea={idea} handleVote={handleVote} />
        </div>
        <div className={classes.rightIcons}>
          <Link
            to={`/report/${idea.id}/comments`}
            style={{ textDecoration: "none" }}
          >
            <div className={classes.iconBox}>
              <MyButton tip="Comments" btnClassName={classes.regButton}>
                <div className={classes.iconGroup}>
                  <ModeCommentIcon className={classes.icon} />
                  <span className={classes.iconText}>
                    {abbreviateNumber(idea.numComments)}
                  </span>
                </div>
              </MyButton>
            </div>
          </Link>
          <div className={classes.iconBox}>
            <MyButton
              tip="Share Idea"
              onClick={handleIdeaLinkCopy}
              btnClassName={classes.regButton}
            >
              <div className={classes.iconGroup}>
                <ReplyIcon className={classes.icon} />
                <span className={classes.iconText}>share</span>
              </div>
            </MyButton>
          </div>
        </div>
      </CardActions>
      <AlertModal
        open={alertState.open}
        onClose={() => setAlertState({ open: false, message: "", color: null })}
        message={alertState.message}
        color={alertState.color}
      />
    </React.Fragment>
  );
};

IdeaCardActions.propTypes = {
  idea: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired,
};

export default IdeaCardActions;
