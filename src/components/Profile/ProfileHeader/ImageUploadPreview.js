import React, { useState } from "react";
import PropTypes from "prop-types";

// Mui stuff
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";

import useStyles from "./ProfileHeader.styles";

const ImageUploadPreview = (props) => {
  const { defaultUrl, setSelectedFile } = props;
  const classes = useStyles();
  const [fileURL, setFileURL] = useState(defaultUrl);

  const handleChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    setSelectedFile(event.target.files[0]);
    setFileURL(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <input
        id="contained-button-file"
        style={{ display: "none" }}
        accept="image/*"
        type="file"
        onChange={handleChange}
      />
      <img className={classes.profileImage} src={state.file} alt="preview" />
      <label htmlFor="contained-button-file">
        <ToolTip title="Upload a new profile picture" placement="top">
          <IconButton className={classes.imageEditButton}>
            <PublishIcon fontSize="small" />
          </IconButton>
        </ToolTip>
      </label>
    </div>
  );
};

ImageUploadPreview.propTypes = {
  defaultUrl: PropTypes.string.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
};

export default ImageUploadPreview;
