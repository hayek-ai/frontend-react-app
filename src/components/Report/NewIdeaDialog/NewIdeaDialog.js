import React, { useState } from "react";
import PropTypes from "prop-types";
import { fetchStockInfo } from "../../../util/utils";
import {
  calcImpliedReturn,
  isEmpty,
  verifyIdeaInputs,
  thesisSummaryInitialState,
  fullReportIntiialState,
} from "./helperFunctions";

// Redux stuff
import { connect } from "react-redux";
import { uploadIdea } from "../../../store/actions/profileActions";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

// Components
import IdeaDataForm from "./IdeaDataForm";
import WithLoading from "../../util/WithLoading";
import AlertModal from "../../util/AlertModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 40,
  },
  dialogButton: { margin: 20 },
  dialogActions: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const initialIdeaState = {
  symbol: "",
  positionType: "Long",
  priceTarget: "",
  bullTarget: "",
  bullProbability: "",
  baseTarget: "",
  baseProbability: "",
  bearTarget: "",
  bearProbability: "",
  errors: {},
};

const steps = [
  "Idea Details",
  "Investment Overview",
  "Full Report",
  "Exhibits",
  "Preview Idea",
];

const NewIdeaDialog = ({ uploadIdea }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [ideaState, setIdeaState] = useState(initialIdeaState);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    color: null,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <IdeaDataForm ideaState={ideaState} setIdeaState={setIdeaState} />
        );
      case 1:
        return <div>Thesis Summary</div>;
      case 2:
        return <div>Full Report</div>;
      case 3:
        return <div>Exhibit Upload</div>;
      case 4:
        return <div>Idea Preview</div>;
      default:
        return "Oops, something went wrong";
    }
  };

  const getNextButton = (stepIndex) => {
    switch (stepIndex) {
      case 0:
      case 1:
      case 2:
        return (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        );
      case 3:
        return (
          <Button variant="contained" color="primary" onClick={handlePreview}>
            Preview
          </Button>
        );
      case 4:
        return (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Idea
          </Button>
        );
      default:
        return "Oops, something went wrong";
    }
  };

  const handlePreview = () => {
    console.log("Handle Preview");
  };

  const handleSubmit = () => {
    console.log("Handle Submit");
  };

  return (
    <WithLoading loading={loading}>
      <div className={classes.root}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
          style={{ width: "175px", height: "50px" }}
        >
          Add New Idea
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>Open a New Position</DialogTitle>
          <DialogContent className={classes.content}>
            <div style={{ width: "100%" }}>
              <Stepper
                style={{ padding: "24px 0" }}
                activeStep={activeStep}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {getStepContent(activeStep)}
            </div>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <div>
              <Button
                className={classes.dialogButton}
                onClick={() => setOpen(false)}
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {getNextButton(activeStep)}
            </div>
          </DialogActions>
        </Dialog>
        <AlertModal
          open={alertState.open}
          onClose={() => setAlertState({ open: false, message: "" })}
          message={alertState.message}
          color={alertState.color}
        />
      </div>
    </WithLoading>
  );
};

NewIdeaDialog.propTypes = {
  uploadIdea: PropTypes.func.isRequired,
};

export default connect(null, { uploadIdea })(NewIdeaDialog);
