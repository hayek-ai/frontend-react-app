import React, { useState } from "react";
import PropTypes from "prop-types";
import { fetchStockInfo } from "../../../api";
import {
  calcImpliedReturn,
  isEmpty,
  verifyIdeaData,
  thesisSummaryInitialState,
  fullReportInitialState,
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

// Components
import IdeaDataForm from "./IdeaDataForm";
import ThesisSummaryStep from "./ThesisSummaryStep";
import FullReportStep from "./FullReportStep";
import ExhibitUploadContainer from "./ExhibitUploadContainer";
import PreviewStep from "./PreviewStep";
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
  positionType: "long",
  priceTarget: "",
  bullTarget: "",
  bullProbability: "",
  baseTarget: "",
  baseProbability: "",
  bearTarget: "",
  bearProbability: "",
  errors: {},
};

const initialPreviewState = {
  symbol: null,
  positionType: null,
  priceTarget: null,
  bullTarget: "",
  bullProbability: "",
  baseTarget: "",
  baseProbability: "",
  bearTarget: "",
  bearProbability: "",
  companyName: null,
  exchange: null,
  sector: null,
  latestPrice: null,
  thesisSummary: thesisSummaryInitialState,
  fullReport: fullReportInitialState,
  selectedExhibits: [],
};

const steps = [
  "Idea Details",
  "Thesis Summary",
  "Full Report",
  "Exhibits",
  "Preview Idea",
];

const NewIdeaDialog = ({ uploadIdea }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState({ all: false, step: false });
  const [activeStep, setActiveStep] = useState(0);
  const [ideaState, setIdeaState] = useState(initialIdeaState);
  const [thesisSummary, setThesisSummary] = useState(thesisSummaryInitialState);
  const [fullReport, setFullReport] = useState(fullReportInitialState);
  const [selectedExhibits, setSelectedExhibits] = useState([]);
  const [previewState, setPreviewState] = useState(initialPreviewState);
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
        return (
          <div style={{ margin: "10px 0" }}>
            <ThesisSummaryStep
              thesisSummary={thesisSummary}
              setThesisSummary={setThesisSummary}
            />
          </div>
        );
      case 2:
        return (
          <div style={{ margin: "10px 0" }}>
            <FullReportStep
              fullReport={fullReport}
              setFullReport={setFullReport}
            />
          </div>
        );
      case 3:
        return (
          <ExhibitUploadContainer
            selectedExhibits={selectedExhibits}
            setSelectedExhibits={setSelectedExhibits}
          />
        );
      case 4:
        return (
          <WithLoading loading={loading.step}>
            <PreviewStep
              previewState={previewState}
              handleSubmit={handleSubmit}
              handleCancel={() => setPreviewState(initialPreviewState)}
            />
          </WithLoading>
        );
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
    const errors = verifyIdeaData(ideaState);
    if (isEmpty(errors)) {
      setActiveStep(4);
      setLoading({ all: false, step: true });
      fetchStockInfo(ideaState.symbol, false).then((info) => {
        setLoading({ all: false, step: false });
        if (info.errors) {
          setActiveStep(0);
          setAlertState({
            open: true,
            message: info.errors[0].detail,
            color: "error",
          });
        } else if (
          calcImpliedReturn(
            ideaState.positionType,
            ideaState.priceTarget,
            info.latestPrice
          ) < 0
        ) {
          setActiveStep(0);
          setAlertState({
            open: true,
            message:
              "Implied return cannot be negative. Please change your price target or your position type.",
            color: "error",
          });
        } else {
          setPreviewState({
            ...ideaState,
            symbol: info.symbol,
            companyName: info.companyName,
            exchange: info.exchange,
            sector: info.sector,
            latestPrice: info.latestPrice,
            bullProbability: parseFloat(ideaState.bullProbability) / 100,
            baseProbability: parseFloat(ideaState.baseProbability) / 100,
            bearProbability: parseFloat(ideaState.bearProbability) / 100,
            thesisSummary: thesisSummary,
            fullReport: fullReport,
            selectedExhibits: selectedExhibits,
          });
        }
      });
    } else {
      setIdeaState((prevState) => ({
        ...prevState,
        errors: errors,
      }));
      setActiveStep(0);
    }
  };

  const handleSubmit = () => {
    setLoading({ all: true, step: false });
    setOpen(false);
    setLoading({ all: false, step: false });
  };

  return (
    <WithLoading loading={loading.all}>
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
