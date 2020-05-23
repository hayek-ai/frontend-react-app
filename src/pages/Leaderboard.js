import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../api";

// Components
import LeaderboardTable from "../components/Leaderboard/LeaderboardTable";
import WithLoading from "../components/util/WithLoading";

const Leaderboard = () => {
  const [params, setParams] = useState([
    { key: "sortColumn", value: "analyst_rank" },
    { key: "orderType", value: "asc" },
  ]);

  const [analysts, setAnalysts] = useState([]);
  const [loading, setLoading] = useState(false);

  const setLeaderboard = () => {
    setLoading(true);
    const queryString = params.map((filter) => filter.value).join("&");
    getLeaderboard(queryString).then((leaderboardAnalysts) => {
      setAnalysts(leaderboardAnalysts);
      setLoading(false);
    });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLeaderboard(params);
    }
    return () => (mounted = false);
  }, [params]);

  return (
    <WithLoading loading={loading}>
      <LeaderboardTable analysts={analysts} />
    </WithLoading>
  );
};

export default Leaderboard;
