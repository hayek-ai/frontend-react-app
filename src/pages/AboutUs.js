import React from "react";
import { Link } from "react-router-dom";

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
    ...theme.typography.body1,
    margin: "10px 0",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const AboutUs = (props) => {
  const classes = useStyles();
  return (
    <FullPageLayout containerType="wideContainer" paperBackground={true}>
      <Typography variant="h4" className={classes.heading}>
        About Us
      </Typography>
      <Typography variant="h5" color="primary" className={classes.heading}>
        In Brief
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Founded in May 2020, hayek.ai is an online marketplace for investment
        research. By giving analysts a platform to establish a track record and
        sell their research, we can offer investors unparalleled access to
        high-quality investment ideas.
      </Typography>
      <Typography variant="h5" color="primary" className={classes.heading}>
        Join Us
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We are always looking for talented people to help us on our mission to
        democratize the field of investing and revolutionize the capital
        markets. If you want to join us, shoot us an email at team@hayek.ai.
      </Typography>
      <Typography variant="h5" color="primary" className={classes.heading}>
        How Hayek Works in 523 Words
      </Typography>
      <Typography
        variant="body1"
        style={{ fontStyle: "italic" }}
        className={classes.paragraph}
      >
        "Good investment ideas are rare and valuable things, which must be
        ferreted out assiduously." -{" "}
        <span style={{ fontWeight: 700 }}>Seth Klarman</span>
      </Typography>
      <Typography variant="h6" className={classes.heading}>
        Why do people use hayek.ai?
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Hayek crowdsources thousands of investment ideas from pre-screened
        analysts and uses an upvoting/downvoting system (like Reddit)—in
        addition to performance tracking—to deliver the best ideas to your
        newsfeed.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        These are not recommendations to follow blindly. They simply help you
        identify where the most attractive opportunities are likely to arise so
        that you can avoid the often fruitless survey of thousands of companies.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        The site is completely free for users who are ok with receiving reports
        on a 30-day time delay. For real-time access, users can subscribe to
        "Hayek Pro" for just $5 per month.
      </Typography>
      <Typography variant="h6" className={classes.heading}>
        Who submits these ideas?
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        To become an analyst, users must apply by sending a sample equity
        research report to team@hayek.ai. The report is reviewed by our research
        team, and only the best applicants are granted analyst privileges. After
        they are screened, analysts can post as many or as few reports as they
        like. Our team monitors ongoing reports for quality, and analyst
        privileges can be revoked if an analyst violates our{" "}
        <Link to="/terms-of-use" className={classes.link}>
          Terms of Use
        </Link>
        . This allows us to ensure a high level of quality that we believe will
        benefit both sides of the platform in the long run.
      </Typography>
      <Typography variant="h6" className={classes.heading}>
        Why do analysts submit ideas?
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We believe there are six main reasons analysts publish ideas on Hayek:
      </Typography>
      <ol className={classes.paragraph}>
        <li>
          <span style={{ fontWeight: 700 }}>Industry Reputation.</span> Anyone
          can establish a track record as one of the best analysts on the site
          regardless of their professional or educational background. There's
          also no downside given that accounts are pseudonymous—if your track
          record is terrible, no one has to know it was you.
        </li>
        <li>
          <span style={{ fontWeight: 700 }}>Financial Upside.</span> Great
          investment ideas are tremendously valuable, and it's shocking that no
          market really exists for them. If you're a retired healthcare
          executive and have strong views on who the winners and losers in the
          industry will be over the next 10 years, you can't really monetize
          that knowledge. It's also nearly impossible to distribute a report
          uncovering the next Valient-like fraud unless you have a platform like
          Citron Research. Hayek solves this distribution problem and pays out
          50% of our revenue to analysts by the percentage of downloads their
          reports receive each month. So if an analyst amasses a massive
          following or publishes a report that goes viral, they will be
          compensated.
        </li>
        <li>
          <span style={{ fontWeight: 700 }}>Marketing.</span> Hayek can give
          analysts a platform to promote other products and services (i.e. hedge
          funds, Twitter profiles, newsletters, YouTube channels, subscription
          services, etc.).
        </li>
        <li>
          <span style={{ fontWeight: 700 }}>Improve as an Analyst.</span> Humans
          learn by doing and analyzing feedback. Hayek's performance metrics
          give analysts clear, precise, and meaningful feedback. Well-written
          notes also help analysts critically examine their thinking both before
          and after they publish their ideas.
        </li>
        <li>
          <span style={{ fontWeight: 700 }}>Teams.</span> Hayek groups the top
          5% analysts in teams of three every quarter. The goal is to help them
          grow their networks, stress-test ideas, and learn from other talented
          analysts.
        </li>
        <li>
          <span style={{ fontWeight: 700 }}>It's Fun.</span> Perhaps most
          importantly, Hayek allows analysts to share their ideas with a
          community of like-minded individuals and see how they stack up against
          the best analysts on the site's leaderboard.
        </li>
      </ol>
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
