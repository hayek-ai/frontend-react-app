import React, { useState } from "react";
import PropTypes from "prop-types";

// Mui stuff
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";

import useStyles from "./ProfileHeader.styles";

const ImageUploadPreview = ({ defaultUrl, setSelectedFile }) => {
  const classes = useStyles();
  const [fileUrl, setFileUrl] = useState(defaultUrl);

  const handleChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    setSelectedFile(event.target.files[0]);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
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
      <img className={classes.uploadImage} src={fileUrl} alt="preview" />
      <label htmlFor="contained-button-file">
        <Tooltip title="Upload a new profile picture" placement="top">
          <IconButton className={classes.imageEditButton} component="span">
            <PublishIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </label>
    </div>
  );
};

ImageUploadPreview.propTypes = {
  defaultUrl: PropTypes.string.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
};

export default ImageUploadPreview;
