import React, { useState } from "react";
import copy from "copy-to-clipboard";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  RedditIcon,
} from "react-share";
import {
  getBaseUrl,
  formatNumber,
  capitalizeFirstLetter,
} from "../../util/utils";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";
import MyButton from "../util/MyButton";

// Components
import AlertModal from "../util/AlertModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },
  shareButton: {
    padding: "5px",
  },
}));

const ShareButtons = ({ idea }) => {
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

  const reportUrl = `${getBaseUrl()}report/${idea.id}`;
  const title = `$${idea.symbol}: ${capitalizeFirstLetter(idea.positionType)} ${
    idea.companyName
  } by ${idea.analyst.username} (${formatNumber(
    idea.priceTarget,
    2,
    "dollars"
  )} PT)`;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.iconBox}>
          <MyButton
            tip="Copy Link"
            onClick={handleIdeaLinkCopy}
            btnClassName={classes.regButton}
          >
            <LinkIcon className={classes.icon} />
          </MyButton>
        </div>
        <div className={classes.shareButton}>
          <EmailShareButton url={reportUrl} subject={title}>
            <EmailIcon size={28} round />
          </EmailShareButton>
        </div>
        <div className={classes.shareButton}>
          <FacebookShareButton url={reportUrl} quote={title}>
            <FacebookIcon size={28} round />
          </FacebookShareButton>
        </div>
        <div className={classes.shareButton}>
          <LinkedinShareButton url={reportUrl}>
            <LinkedinIcon size={28} round />
          </LinkedinShareButton>
        </div>
        <div className={classes.shareButton}>
          <TwitterShareButton url={reportUrl} title={title}>
            <TwitterIcon size={28} round />
          </TwitterShareButton>
        </div>
        <div className={classes.shareButton}>
          <RedditShareButton
            url={reportUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
          >
            <RedditIcon size={28} round />
          </RedditShareButton>
        </div>
      </div>
      <AlertModal
        open={alertState.open}
        onClose={() => setAlertState({ open: false, message: "", color: null })}
        message={alertState.message}
        color={alertState.color}
      />
    </React.Fragment>
  );
};

export default ShareButtons;
