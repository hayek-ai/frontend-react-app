import React from "react";

// Mui stuff
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
      style={{ padding: 0 }}
    >
      {value === index && (
        <Box p={3} style={{ padding: 0 }}>
          {children}
        </Box>
      )}
    </Typography>
  );
};

export default TabPanel;
