import React, { useState, useEffect } from "react";
import { getIdeaFeed } from "../api";

// Mui stuff
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";
import WithLoading from "../components/util/WithLoading";
import FeedContainer from "../components/IdeaFeed/FeedContainer";

const Feed = (props) => {
  const [panelIndex, setPanelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    let mounted = true;
    getIdeaFeed("following").then((ideas) => {
      if (mounted) {
        setFeed([...ideas]);
        setLoading(false);
      }
    });

    return () => (mounted = false);
  }, []);

  const handleChange = async (event, newPanelIndex) => {
    setPanelIndex(newPanelIndex);
    setLoading(true);
    if (newPanelIndex === 0) {
      const ideas = await getIdeaFeed("following");
      setFeed([...ideas]);
      setLoading(false);
    } else {
      const ideas = await getIdeaFeed("discover");
      setFeed([...ideas]);
      setLoading(false);
    }
  };

  return (
    <FullPageLayout containerType="feedContainer" paperBackground={false}>
      <AppBar variant="outlined" position="static" color="inherit">
        <Tabs
          value={panelIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Following" />
          <Tab label="Discover" />
        </Tabs>
      </AppBar>
      <WithLoading loading={loading}>
        <FeedContainer ideaFeed={feed} history={props.history} />
      </WithLoading>
    </FullPageLayout>
  );
};

export default Feed;
