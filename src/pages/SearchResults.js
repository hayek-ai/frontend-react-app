import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getIdeaFeed } from "../api";

// Mui stuff
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";
import WithLoading from "../components/util/WithLoading";
import FeedContainer from "../components/IdeaFeed/FeedContainer";
import SearchContainer from "../components/Search/SearchContainer";
import FilterSelect from "../components/Search/FilterSelect";
import SearchResultsHeader from "../components/Search/SearchResultsHeader";

const SearchResults = (props) => {
  const { symbol } = useParams();
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const [sortFilter, setSortFilter] = useState({
    key: "sort",
    index: 0,
    value: "sort=top",
  });
  const [positionTypeFilter, setPositionTypeFilter] = useState({
    key: "positionType",
    index: 0,
  });
  const [timePeriodFilter, setTimePeriodFilter] = useState({
    key: "timePeriod",
    index: 0,
  });

  useEffect(() => {
    let mounted = true;
    const filters = [
      sortFilter,
      positionTypeFilter,
      timePeriodFilter,
    ].filter((filter) => (filter.value ? true : false));
    const queryString = filters
      .map((filter) => filter.value)
      .join("&")
      .concat(`&symbol=${symbol}`);
    getIdeaFeed("discover", queryString).then((ideas) => {
      if (mounted) {
        setFeed([...ideas]);
        setLoading(false);
      }
    });
    return () => (mounted = false);
  }, [sortFilter, positionTypeFilter, timePeriodFilter, symbol]);

  return (
    <FullPageLayout containerType="feedContainer" paperBackground={false}>
      <AppBar variant="outlined" position="static" color="inherit">
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab component={Link} label="Discover" to="/feed" />
          <Tab component={Link} label="Following" to="/feed/following" />
        </Tabs>
      </AppBar>
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
      </SearchContainer>
      <SearchResultsHeader symbol={symbol} />
      <WithLoading loading={loading}>
        <FeedContainer ideaFeed={feed} history={props.history} />
      </WithLoading>
    </FullPageLayout>
  );
};

export default SearchResults;
