import React from "react";
import Serialize from "../util/slateSerializer";

// Mui stuff
import Typography from "@material-ui/core/Typography";

// Components
import ZoomImg from "../util/ZoomImg";

const Report = ({ thesisSummary, fullReport, exhibits }) => {
  return (
    <React.Fragment>
      <div style={{ margin: "10px 0" }}>
        <Typography variant="h4" align="center">
          Thesis Summary
        </Typography>
        {thesisSummary.map((block, index) => (
          <Serialize key={index} node={block} />
        ))}
      </div>
      <div style={{ margin: "10px 0" }}>
        <Typography variant="h4" align="center">
          Report
        </Typography>
        {fullReport.map((block, index) => (
          <Serialize key={index} node={block} />
        ))}
        {exhibits.length > 0 && (
          <React.Fragment>
            <Typography variant="h5" style={{ margin: "24px 0 10px" }}>
              Exhibits
            </Typography>
            {exhibits.map((exhibit, index) => (
              <div key={index}>
                <Typography variant="subtitle1">{exhibit.title}</Typography>
                <ZoomImg
                  src={
                    exhibit.file
                      ? URL.createObjectURL(exhibit.file)
                      : exhibit.url
                  }
                  alt={exhibit.title}
                  style={{ maxWidth: "100%", margin: "10px auto" }}
                />
              </div>
            ))}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Report;
