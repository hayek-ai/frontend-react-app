import React, { useState } from "react";
import PropTypes from "prop-types";

// Mui stuff
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

// Components
import AlertModal from "../../util/AlertModal";

/*
 * Example 'selectedExhibits'
 *[{title: "Exhibit1", filename: "exhibit1.png", file: blob}]
 */
const ExhibitUploadContainer = ({ selectedExhibits, setSelectedExhibits }) => {
  const [count, setCount] = useState(1);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    color: null,
  });

  const handleImageChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const title = `Exhibit ${count}`;
    const file = event.target.files[0];
    if (
      selectedExhibits.filter((exhibit) => exhibit.file.name === file.name)
        .length > 0
    ) {
      setAlertState({
        open: true,
        message:
          "Uploaded files must have different filenames. Please change the name of the file and upload again.",
        color: "error",
      });
    } else {
      setSelectedExhibits((prevState) => [
        ...prevState,
        {
          title: title,
          file: file,
        },
      ]);
      setCount((prevCount) => prevCount + 1);
      event.target.value = null;
    }
  };

  const handleTitleChange = (index, event) => {
    event.persist();
    selectedExhibits[index].title = event.target.value;
    setSelectedExhibits([...selectedExhibits]);
  };

  const handleDelete = (index) => {
    selectedExhibits.splice(index, 1);
    setSelectedExhibits([...selectedExhibits]);
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="body1" style={{ letterSpacing: 0.8 }}>
        {
          "Upload images to help get your points across (i.e. charts, spreadsheet snapshots, etc.)"
        }
      </Typography>
      <div style={{ width: "100%", textAlign: "center", margin: 10 }}>
        <input
          id="contained-button-file"
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="text"
            color="primary"
            startIcon={<PhotoCamera />}
            component="span"
          >
            Upload
          </Button>
        </label>
      </div>
      {selectedExhibits.map((exhibit, index) => {
        return (
          <div key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <TextField
                value={selectedExhibits[index].title}
                onChange={(event) => handleTitleChange(index, event)}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(index)}
                style={{ padding: 7 }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <img
              src={URL.createObjectURL(exhibit.file)}
              alt={exhibit.title}
              style={{ maxWidth: "100%", margin: "10px auto" }}
            />
          </div>
        );
      })}
      <AlertModal
        open={alertState.open}
        onClose={() => setAlertState({ open: false, message: "", color: null })}
        message={alertState.message}
        color={alertState.color}
      />
    </div>
  );
};

ExhibitUploadContainer.propTypes = {
  selectedExhibits: PropTypes.array.isRequired,
  setSelectedExhibits: PropTypes.func.isRequired,
};

export default ExhibitUploadContainer;
