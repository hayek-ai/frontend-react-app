import React, { useState } from "react";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";
import CardForm from "../components/Stripe/CardForm";

const useStyles = makeStyles((theme) => ({
  panelContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    margin: "50px 0",
  },
  panel: {
    width: "150px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "5px",
    height: "375px",
    cursor: "pointer",
  },
  selected: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "10px",
  },
}));

const Plan = (props) => {
  const classes = useStyles();
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const handleChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <FullPageLayout containerType="narrowContainer" paperBackground={true}>
      <Typography variant="body1" gutterBottom>
        Last step!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Choose a plan and get started!
      </Typography>
      <div className={classes.panelContainer}>
        <div
          className={`${classes.panel} ${
            selectedPlan === "free" ? classes.selected : null
          }`}
          onClick={() => setSelectedPlan("free")}
        >
          <div>
            <Typography variant="h5" color="primary" gutterBottom>
              Free
            </Typography>
            <Typography variant="h4" gutterBottom>
              $0
            </Typography>
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
              <li>
                <Typography variant="body1">Ad supported</Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Access to reports on a 30-day time delay
                </Typography>
              </li>
            </ul>
          </div>
          <Radio
            color="primary"
            checked={selectedPlan === "free"}
            onChange={handleChange}
            value="free"
          />
        </div>
        <div
          className={`${classes.panel} ${
            selectedPlan === "pro" ? classes.selected : null
          }`}
          onClick={() => setSelectedPlan("pro")}
        >
          <div>
            <Typography variant="h5" color="primary" gutterBottom>
              Pro
            </Typography>
            <Typography variant="h4" gutterBottom>
              $5 / mo
            </Typography>
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
              <li>
                <Typography variant="body1">No ads</Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Unlimited report downloads
                </Typography>
              </li>
              <li>
                <Typography variant="body1">Weekly newsletter</Typography>
              </li>
              <li>
                <Typography variant="body1">Cancel at anytime</Typography>
              </li>
            </ul>
          </div>
          <Radio
            color="primary"
            checked={selectedPlan === "pro"}
            onChange={handleChange}
            value="pro"
          />
        </div>
      </div>
      {selectedPlan === "pro" ? (
        <CardForm {...props} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "30px 0", width: "100%" }}
        >
          Get Started!
        </Button>
      )}
    </FullPageLayout>
  );
};

export default Plan;
