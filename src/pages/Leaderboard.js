import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../api";

// Components
import LeaderboardTable from "../components/Leaderboard/LeaderboardTable";
import WithLoading from "../components/util/WithLoading";

const Leaderboard = () => {
  const [analysts, setAnalysts] = useState([]);
  const [loading, setLoading] = useState(false);

  const setLeaderboard = () => {
    setLoading(true);
    getLeaderboard("sortColumn=analyst_rank&orderType=asc").then(
      (leaderboardAnalysts) => {
        setAnalysts(leaderboardAnalysts);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLeaderboard();
    }
    return () => (mounted = false);
  }, []);

  return (
    <WithLoading loading={loading}>
      <LeaderboardTable analysts={analysts} />
    </WithLoading>
  );
};

export default Leaderboard;
