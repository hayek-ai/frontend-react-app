import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import RichTextEditor from "../../util/RichTextEditor";

const useStyles = makeStyles((theme) => ({
  list: { ...theme.typography.body1 },
}));

const FullReportStep = ({ fullReport, setFullReport }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="body1">
        We suggest the following template for an investment report:
      </Typography>
      <ol className={classes.list}>
        <li>
          <strong>Company Overview. </strong>This section should include a
          description of the company, its products and services, and the
          business economics. It should also include an overview of the industry
          dynamics. Much of this information can be sourced from the company
          itself and via its regulatory filings.
        </li>
        <li>
          <strong>Key Drivers & Risks. </strong>A summary of what will cause the
          share price to reach your target. You should also address potentially
          negative industry and company developments that could pose a risk to
          the investment thesis.
        </li>
        <li>
          <strong>Valuation. </strong>This section should include a thorough
          valuation analysis of the company using conventional valuation metrics
          and formulas. In other words, how did you arrive at your price target?
        </li>
      </ol>
      <Typography
        variant="h6"
        style={{ fontWeight: 400, marginTop: 20, paddingBottom: 5 }}
      >
        Full Report
      </Typography>
      <RichTextEditor key="1" value={fullReport} setValue={setFullReport} />
    </React.Fragment>
  );
};

FullReportStep.propTypes = {
  fullReport: PropTypes.array.isRequired,
  setFullReport: PropTypes.func.isRequired,
};

export default FullReportStep;
