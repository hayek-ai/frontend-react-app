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
  agreedToTerms: false,
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
  agreedToTerms: false,
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
  const [loading, setLoading] = useState(false);
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
          <WithLoading loading={loading}>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            size="small"
          >
            Next
          </Button>
        );
      case 3:
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreview}
            size="small"
          >
            Preview
          </Button>
        );
      case 4:
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            size="small"
          >
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
      setLoading(true);
      fetchStockInfo(ideaState.symbol, false).then((info) => {
        setLoading(false);
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
            lastPrice: parseFloat(info.latestPrice),
            entryPrice: parseFloat(info.latestPrice),
            bullProbability: parseFloat(ideaState.bullProbability) / 100,
            baseProbability: parseFloat(ideaState.baseProbability) / 100,
            bearProbability: parseFloat(ideaState.bearProbability) / 100,
            thesisSummary: thesisSummary,
            fullReport: fullReport,
            selectedExhibits: selectedExhibits,
          });
          setActiveStep(4);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("symbol", previewState.symbol);
    formData.append("entryPrice", previewState.entryPrice);
    formData.append("positionType", previewState.positionType);
    formData.append("bullTarget", previewState.bullTarget);
    formData.append("bullProbability", previewState.bullProbability);
    formData.append("baseTarget", previewState.baseTarget);
    formData.append("baseProbability", previewState.baseProbability);
    formData.append("bearTarget", previewState.bearTarget);
    formData.append("bearProbability", previewState.bearProbability);
    formData.append("agreedToTerms", previewState.agreedToTerms);
    formData.append(
      "thesisSummary",
      JSON.stringify(previewState.thesisSummary)
    );
    formData.append("fullReport", JSON.stringify(previewState.fullReport));
    const exhibits = previewState.selectedExhibits;
    const exhibitTitleMap = {};
    for (let i = 0; i < exhibits.length; i++) {
      formData.append("exhibits", exhibits[i].file);
      exhibitTitleMap[exhibits[i].file.name] = exhibits[i].title;
    }
    formData.append("exhibitTitleMap", JSON.stringify(exhibitTitleMap));
    setPreviewState(initialPreviewState);
    setLoading(true);
    uploadIdea(formData).then((res) => {
      setLoading(false);
      if (res.errors) {
        setAlertState({
          open: true,
          message: res.errors[0]["detail"],
          color: "error",
        });
        setActiveStep(0);
      } else {
        // position opened successfully
        // restore to initial state and show success message
        setOpen(false);
        setActiveStep(0);
        setIdeaState(initialIdeaState);
        setThesisSummary(thesisSummaryInitialState);
        setFullReport(fullReportInitialState);
        setSelectedExhibits([]);
        setPreviewState(initialPreviewState);
        setAlertState({
          open: true,
          message: "Position opened successfully!",
          color: null,
        });
      }
    });
  };

  return (
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
              size="small"
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              size="small"
            >
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
  );
};

NewIdeaDialog.propTypes = {
  uploadIdea: PropTypes.func.isRequired,
};

export default connect(null, { uploadIdea })(NewIdeaDialog);
