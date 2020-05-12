import React from "react";

// Components
import WithLoading from "../components/util/WithLoading";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const Feed = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        maxWidth: 425,
        margin: "auto",
        textAlign: "center",
        marginTop: 10,
      }}
    >
      <AppBar variant="outlined" position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Following" />
          <Tab label="Discover" />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default Feed;
