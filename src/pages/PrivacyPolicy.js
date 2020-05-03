import React from "react";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "20px 0",
  },
  paragraph: {
    margin: "10px 0",
  },
  link: {
    color: theme.palette.primary.main,
  },
}));

const PrivacyPolicy = (props) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} style={{ borderRadius: 0 }}>
      <div
        style={{
          maxWidth: 800,
          margin: "auto",
          padding: 20,
        }}
      >
        <Typography variant="h4" className={classes.heading}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Thank you for visiting{" "}
          <a className={classes.link} href="https://hayek.ai">
            https://hayek.ai/
          </a>{" "}
          (together with all other websites and services operated by or on
          behalf of Hayek, Inc., the "Site"). Your privacy is important to us.
          To better protect your privacy, we provide this privacy policy
          ("Privacy Policy") explaining our online information practices and the
          choices you can make about the way your information is collected and
          used at the Site. This Privacy Policy forms part of the Terms of Use.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Capitalized terms not defined herein shall have the meanings ascribed
          to them in the Terms of Use.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Through your access and use of the Site, including your submission of
          any content, Hayek, Inc. may collect personal information about you,
          including your name, email address and other information that could be
          used to identify you (“Personal Information”) and information related
          to your use of the Site, your browser activity, search queries and
          submissions, your computing environment (including IP address,
          operating system, browser software, hardware and geographical
          location), referring websites (collectively, together with “Personal
          Information,” “Your Information”). Hayek, Inc. may collect Your
          Information directly through your submission through the Site, or by
          using automated data collection and tracking technologies included in
          the Site. Hayek, Inc. does not collect Personal Information through
          such automated technologies, but may connect Your Information
          collected through those automated technologies to your Personal
          Information that we collect from you or other sources. Hayek, Inc. may
          use Your Information (i) to provide you with the information, products
          and services that you request, (ii) to provide your with notices about
          your account, Hayek, Inc. and related information, (iii) to verify
          compliance with these Terms, (iv) to enforce Hayek, Inc.’s rights
          under these Terms, (v) to comply with applicable law, rules of
          regulatory bodies and Hayek, Inc.’s internal policies, (vi) to improve
          the Site, (vii) to fulfill any other purpose for which Your
          Information is submitted by you or that is described to you in
          connection with your submission, or (viii) otherwise with you consent.
          Hayek, Inc. may disclose aggregated data and information about the
          Site's users, and information that does not otherwise specifically
          identify any particular person, without restriction.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Hayek, Inc. may disclose Your Information (i) to any of its
          affiliates, (ii) to service providers and other third parties it uses
          to support Hayek, Inc, (iii) to a buyer or other successor of Hayek,
          Inc. in the event of a merger, divestiture, restructuring,
          reorganization, dissolution or other sale or transfer of some or all
          of Hayek, Inc. or Hayek Inc.'s assets, whether as a going concern or
          as part of bankruptcy, liquidation or similar proceeding, (iv) to
          persons with whom it has a strategic relationship in connection with
          the marketing and provision of Hayek, Inc. or its services, (v) to
          comply with any court order, law or legal process, including to
          respond to any government or regulatory request, or Hayek, Inc.’s
          internal policies, (vi) to enforce its rights under these Terms, (vii)
          to the extent Hayek, Inc. determines it is necessary to protect the
          rights, property or safety of Hayek, Inc. or any other person or (v)
          otherwise with your consent or as described to you in connection with
          your submission of Your Information.
        </Typography>
      </div>
    </Paper>
  );
};

export default PrivacyPolicy;
