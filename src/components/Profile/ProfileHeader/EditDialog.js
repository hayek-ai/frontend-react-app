import React, { useState } from "react";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import { updateUser } from "../../../store/actions/userActions";

// Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";

// Helper Components
import ImageUploadPreview from "./ImageUploadPreview";
import useStyles from "./ProfileHeader.styles";

const MAX_BIO_CHARACTERS = 1000;

const EditDialog = ({ user, updateUser, setLoading }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [errors, setErrors] = useState({});
  const [helperText, setHelperText] = useState("");
  const [open, setOpen] = useState(false);

  const handleBioChange = (event) => {
    const bioLength = event.target.value.length;
    if (bioLength > MAX_BIO_CHARACTERS) {
      setErrors({
        bio: `Bio cannot be more than ${MAX_BIO_CHARACTERS} characters.`,
      });
    } else {
      setErrors({});
    }
    setBio(event.target.value);
    setHelperText(`${bioLength}/${MAX_BIO_CHARACTERS} characters`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
    setLoading(true);
    const formData = new FormData();
    formData.append("bio", bio);
    if (selectedFile) {
      formData.append("profileImage", selectedFile, selectedFile.name);
    }
    updateUser(formData).then(() => setLoading(false));
  };

  return (
    <React.Fragment>
      <Tooltip title="EditDetails" placement="top">
        <Button
          onClick={() => setOpen(true)}
          className={classes.profileEditButton}
          variant="outlined"
          color="primary"
        >
          Edit
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Profile Details</DialogTitle>
        <DialogContent>
          <div className={classes.uploadImageWrapper}>
            <ImageUploadPreview
              defaultUrl={`${user.imageUrl}?t=${new Date().getTime()}`}
              setSelectedFile={setSelectedFile}
            />
          </div>
          <div className={classes.bioTextField}>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              placeholder="A short bio about yourself"
              helperText={helperText}
              error={errors.bio ? true : false}
              value={bio}
              onChange={handleBioChange}
              fullWidth
            />
          </div>
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
            disabled={errors.bio ? true : false}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

EditDialog.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(null, { updateUser })(EditDialog);
