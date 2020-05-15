import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReport } from "../api";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

// Components
import WithLoading from "../components/util/WithLoading";
import FullPageLayout from "../components/Layout/FullPageLayout";
import FinancialSnapshot from "../components/Report/FinancialSnapshot";
import Report from "../components/Report/Report";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
    margin: "10px",
  },
}));

const ReportPage = (props) => {
  const classes = useStyles();
  const { ideaId } = useParams();
  const [loading, setLoading] = useState(true);
  const [idea, setIdea] = useState({
    thesisSummary: [],
    fullReport: [],
    exhibits: [],
  });

  useEffect(() => {
    let isMounted = true;

    if (ideaId) {
      getReport(ideaId).then((idea) => {
        if (isMounted) {
          setLoading(false);
          setIdea({
            ...idea,
            thesisSummary: JSON.parse(idea.thesisSummary),
            fullReport: JSON.parse(idea.fullReport),
            exhibits: JSON.parse(idea.exhibits),
          });
        }
      });
    }
    return () => (isMounted = false);
  }, [ideaId]);

  return (
    <FullPageLayout containerType="reportContainer" paperBackground={false}>
      <WithLoading loading={loading}>
        <Paper variant="outlined" className={classes.container}>
          <FinancialSnapshot idea={idea} />
        </Paper>
        <Paper variant="outlined" className={classes.container}>
          <Report
            thesisSummary={idea.thesisSummary}
            fullReport={idea.fullReport}
            exhibits={idea.exhibits}
          />
        </Paper>
      </WithLoading>
    </FullPageLayout>
  );
};

export default ReportPage;
