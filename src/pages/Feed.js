import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIdeaFeed } from "../api";

// Mui stuff
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";
import WithLoading from "../components/util/WithLoading";
import FeedContainer from "../components/IdeaFeed/FeedContainer";
import TabPanel from "../components/util/TabPanel";
import SearchContainer from "../components/Search/SearchContainer";
import FilterSelect from "../components/Search/FilterSelect";

const Feed = (props) => {
  const { following } = useParams();
  const [panelIndex, setPanelIndex] = useState(following ? 1 : 0);
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const [sortFilter, setSortFilter] = useState({
    key: "sort",
    index: 0,
    value: "sort=latest",
  });
  const [positionTypeFilter, setPositionTypeFilter] = useState({
    key: "positionType",
    index: 0,
  });

  const [timePeriodFilter, setTimePeriodFilter] = useState({
    key: "timePeriod",
    index: 0,
  });
  const [sectorFilter, setSectorFilter] = useState({
    key: "sector",
    index: 0,
  });
  const [marketCapFilter, setMarketCapFilter] = useState({
    key: "marketCap",
    index: 0,
  });

  useEffect(() => {
    let mounted = true;
    const filters = [
      sortFilter,
      positionTypeFilter,
      timePeriodFilter,
      sectorFilter,
      marketCapFilter,
    ].filter((filter) => (filter.value ? true : false));

    const queryString = filters.map((filter) => filter.value).join("&");
    if (panelIndex === 0) {
      getIdeaFeed("discover", queryString).then((ideas) => {
        if (mounted) {
          setFeed([...ideas]);
          setLoading(false);
        }
      });
    } else {
      getIdeaFeed("following", queryString).then((ideas) => {
        if (mounted) {
          setFeed([...ideas]);
          setLoading(false);
        }
      });
    }

    return () => (mounted = false);
  }, [
    sortFilter,
    positionTypeFilter,
    timePeriodFilter,
    sectorFilter,
    marketCapFilter,
    panelIndex,
  ]);

  return (
    <FullPageLayout containerType="feedContainer" paperBackground={false}>
      <AppBar variant="outlined" position="static" color="inherit">
        <Tabs
          value={panelIndex}
          onChange={(event, newPanelIndex) => setPanelIndex(newPanelIndex)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Discover" />
          <Tab label="Following" />
        </Tabs>
      </AppBar>
      <TabPanel value={panelIndex} index={0}>
        <SearchContainer {...props} searchbar={true}>
          <FilterSelect filter={sortFilter} setFilter={setSortFilter} />
          <FilterSelect
            filter={positionTypeFilter}
            setFilter={setPositionTypeFilter}
          />
          <FilterSelect
            filter={timePeriodFilter}
            setFilter={setTimePeriodFilter}
          />
          <FilterSelect filter={sectorFilter} setFilter={setSectorFilter} />
          <FilterSelect
            filter={marketCapFilter}
            setFilter={setMarketCapFilter}
          />
        </SearchContainer>
        <WithLoading loading={loading}>
          <FeedContainer ideaFeed={feed} history={props.history} />
        </WithLoading>
      </TabPanel>
      <TabPanel value={panelIndex} index={1}>
        <SearchContainer {...props} searchbar={false}>
          <FilterSelect filter={sortFilter} setFilter={setSortFilter} />
          <FilterSelect
            filter={positionTypeFilter}
            setFilter={setPositionTypeFilter}
          />
          <FilterSelect
            filter={timePeriodFilter}
            setFilter={setTimePeriodFilter}
          />
          <FilterSelect filter={sectorFilter} setFilter={setSectorFilter} />
          <FilterSelect
            filter={marketCapFilter}
            setFilter={setMarketCapFilter}
          />
        </SearchContainer>
        <WithLoading loading={loading}>
          <FeedContainer ideaFeed={feed} history={props.history} />
        </WithLoading>
      </TabPanel>
    </FullPageLayout>
  );
};

export default Feed;
