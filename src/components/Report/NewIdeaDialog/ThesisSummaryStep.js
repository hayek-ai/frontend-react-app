import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import RichTextEditor from "../../util/RichTextEditor";

const ThesisSummaryStep = ({ thesisSummary, setThesisSummary }) => (
  <React.Fragment>
    <Typography variant="body1">
      This section should include a brief description of the company,
      significant recent developments, a valuation summary, and the recommended
      investment action. There should be a clear explanation as to why the
      security is deemed to be mis-priced. That is, what is the market currently
      not properly discounting in the stock’s price, and what will be the
      catalyst to prompt the market to reprice the security?
    </Typography>
    <Typography
      variant="h6"
      style={{ fontWeight: 400, marginTop: 20, paddingBottom: 5 }}
    >
      Thesis Summary
    </Typography>
    <RichTextEditor
      key="1"
      value={thesisSummary}
      setValue={setThesisSummary}
      placeholder="Why is the stock mispriced?"
    />
  </React.Fragment>
);

ThesisSummaryStep.propTypes = {
  thesisSummary: PropTypes.array.isRequired,
  setThesisSummary: PropTypes.func.isRequired,
};

export default ThesisSummaryStep;
