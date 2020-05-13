import React from "react";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "20px 0",
  },
  paragraph: {
    margin: "10px 0",
  },
}));

const AboutUs = (props) => {
  const classes = useStyles();
  return (
    <FullPageLayout containerType="wideContainer">
      <Typography variant="h4" className={classes.heading}>
        About Us
      </Typography>
      <Typography variant="h5" color="primary" className={classes.heading}>
        In Brief
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Founded in May 2020, hayek.ai is an online marketplace for investment
        research. By giving analyst a platform to establish a track record and
        sell their research, we can offer investors unparalleled access to
        high-quality investment ideas.
      </Typography>
      <Typography variant="h5" color="primary" className={classes.heading}>
        Careers
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We are always looking for talented people to help us on our mission to
        democratize the field of investing and revolutionize the capital
        markets. If you want to join us, shoot us an email at team@hayek.ai.
      </Typography>
      <Typography variant="h5" color="primary" className={classes.heading}>
        What We Believe
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We believe that the asset management industry needs to be approached in
        a new way. Most institutional investors are plagued with a short-term,
        relative-performance orientation. The incentive is to expand managed
        assets in order to generate more fees—acting with the crowd ensures an
        acceptable mediocrity; acting independently runs the risk of
        unacceptable underperformance. As a result, hundreds of billions of
        other people’s hard-earned dollars are routinely whipped from investment
        to investment on surface-level analysis.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We believe that if more institutional investors strove to achieve good
        absolute rather than relative returns, the stock market would be less
        prone to overvaluation, and market fads would less likely be carried to
        excess. Investments would only be made when they presented a compelling
        opportunity and not simply to keep up with the herd. Our aim is to
        restore the intellectual honesty of the institutional investment process
        by properly aligning incentives. We aim to shift the focus of
        professional investors from relative performance to absolute
        performance—from trying to outguess others to maximizing returns under
        reasonable risk constraints.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We believe that great investment ideas can come from anywhere. The name
        of our company reflects this belief. In his paper, “The Use of Knowledge
        in Society,” Friedrich Hayek argued that information is decentralized
        and that decisions are best made by those with local knowledge rather
        than by a central authority. We couldn’t agree more and aim to bring the
        power of decentralized knowledge to the field of investing. We are
        building tools that allow anyone to establish a track record and become
        a professional investor. It doesn’t matter where you went to school or
        whether you worked at Goldman Sachs for 20 years. If you can establish
        an elite track record, you can make it. Our hope is to build a vibrant
        community where scientists, lawyers, physicians, engineers,
        technologists, and professionals from all disciplines can each
        contribute their perspectives on all types of investments.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We believe that by creating the right tools and incentives, hayek.ai
        will democratize access to high-quality money management and investment
        research. Wall Street can be fundamentally unfair to smaller investors
        as they work to accomplish their goals. Hayek.ai will change that. Every
        person should have the tools, guidance, and confidence needed to grow
        their personal wealth and live a better life.
      </Typography>
    </FullPageLayout>
  );
};
export default AboutUs;
