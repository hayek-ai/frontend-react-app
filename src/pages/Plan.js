import React, { useState } from "react";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";
import AlertModal from "../components/util/AlertModal";
import CardSection from "../components/Stripe/CardSection/CardSection";

const useStyles = makeStyles((theme) => ({
  panelContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  panel: {
    width: "150px",
  },
}));

const Plan = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <FullPageLayout containerType="narrowContainer" paperBackground={true}>
      <CardSection />
    </FullPageLayout>
  );
};

export default Plan;
