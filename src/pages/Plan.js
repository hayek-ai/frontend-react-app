import React, { useState } from "react";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";
import CardSection from "../components/Stripe/CardSection/CardSection";

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
    height: "350px",
    cursor: "pointer",
  },
  selected: {
    border: "1px solid black",
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
          <Typography variant="h5" color="primary" gutterBottom>
            Free
          </Typography>
          <Typography variant="h4" gutterBottom>
            $0
          </Typography>
          <ul style={{ textAlign: "left" }}>
            <li>
              <Typography variant="body1">Ad supported</Typography>
            </li>
            <li>
              <Typography variant="body1">
                3 report downloads per day
              </Typography>
            </li>
          </ul>
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
          <Typography variant="h5" color="primary" gutterBottom>
            Pro
          </Typography>
          <Typography variant="h4" gutterBottom>
            $5 / mo
          </Typography>
          <ul style={{ textAlign: "left" }}>
            <li>
              <Typography variant="body1">No ads</Typography>
            </li>
            <li>
              <Typography variant="body1">
                Unlimited report downloads
              </Typography>
            </li>
            <li>
              <Typography variant="body1">Cancel at anytime</Typography>
            </li>
          </ul>
          <Radio
            color="primary"
            checked={selectedPlan === "pro"}
            onChange={handleChange}
            value="pro"
          />
        </div>
      </div>
      {selectedPlan === "pro" && (
        <React.Fragment>
          <CardSection />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginTop: "15px" }}
          >
            Your card will be charged $5.00
          </Typography>
        </React.Fragment>
      )}
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "30px 0", width: "100%" }}
      >
        Get Started!
      </Button>
    </FullPageLayout>
  );
};

export default Plan;
