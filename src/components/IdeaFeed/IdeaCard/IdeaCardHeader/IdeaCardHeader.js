import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getNumberWithOrdinal } from "../../../../util/utils";
import dayjs from "dayjs";
// Components
import IdeaCardMenu from "./IdeaCardMenu";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const IdeaCardHeader = ({ idea }) => {
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.header}
      avatar={<Avatar alt="analyst avatar" src={idea.analyst.imageUrl} />}
      action={<IdeaCardMenu />}
      title={
        <Typography
          variant="h6"
          component={Link}
          className={classes.link}
          to={`/profile/${idea.analyst.username}`}
        >
          {idea.analyst.username}
        </Typography>
      }
      subheader={`${dayjs(new Date(idea.createdAt)).format(
        "MMM DD YYYY"
      )} | Analyst Rank: ${getNumberWithOrdinal(idea.analyst.analystRank)}`}
    />
  );
};

IdeaCardHeader.propTypes = {
  idea: PropTypes.object.isRequired,
};

export default IdeaCardHeader;
