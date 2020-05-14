import React from "react";

// Mui stuff
import Card from "@material-ui/core/Card";

const styles = {
  root: {
    margin: "10px auto",
    padding: 0,
    borderRadius: 0,
    textAlign: "left",
  },
};

const IdeaCard = ({ children }) => {
  return (
    <Card variant="outlined" style={styles.root}>
      {children}
    </Card>
  );
};

export default IdeaCard;
