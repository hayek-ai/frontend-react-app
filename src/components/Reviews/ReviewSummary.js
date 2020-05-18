import React from "react";
import PropTypes from "prop-types";
import { ComposedChart, Bar, XAxis, YAxis } from "recharts";
import { formatNumber } from "../../util/utils";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    ...theme.typography.h5,
    color: theme.palette.text.primary,
    margin: 10,
  },
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
}));

function getStarValue(reviews, reviewCount, number) {
  return parseFloat(
    reviews.reduce((total, review) => {
      if (review.stars === number) return total + 1;
      else return total;
    }, 0) / reviewCount
  );
}

const ReviewSummary = ({ reviews, children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount !== 0
      ? parseFloat(
          (
            reviews.reduce((total, review) => total + review.stars, 0) /
            reviewCount
          ).toFixed(1)
        )
      : 0;
  const data = [
    { name: "5 star", value: getStarValue(reviews, reviewCount, 5) },
    { name: "4 star", value: getStarValue(reviews, reviewCount, 4) },
    { name: "3 star", value: getStarValue(reviews, reviewCount, 3) },
    { name: "2 star", value: getStarValue(reviews, reviewCount, 2) },
    { name: "1 star", value: getStarValue(reviews, reviewCount, 1) },
  ];

  const labelColor = theme.palette.text.primary;
  const axisColor = theme.palette.text.secondary;
  const barColor = theme.palette.primary.main;

  const chart =
    reviewCount !== 0 ? (
      <div style={{ margin: "auto" }}>
        <ComposedChart
          layout="vertical"
          width={300}
          height={250}
          data={data}
          margin={{
            top: 20,
            right: 40,
            bottom: 20,
          }}
        >
          <XAxis
            type="number"
            tickFormatter={(x) => formatNumber(x, 0, "percentage")}
            stroke={axisColor}
          ></XAxis>
          <YAxis dataKey="name" type="category" stroke={axisColor} />
          <Bar
            dataKey="value"
            barSize={20}
            fill={barColor}
            label={{
              position: "right",
              formatter: (x) => formatNumber(x, 0, "percentage"),
              fill: labelColor,
              fontSize: 12,
            }}
          />
        </ComposedChart>
      </div>
    ) : null;

  return (
    <Paper className={classes.root} variant="outlined">
      <Typography className={classes.pageTitle}>Analyst Reviews</Typography>
      <Rating value={averageRating} readOnly precision={0.1} size="medium" />
      <Typography variant="subtitle2" style={{ marginTop: 10 }}>
        {reviewCount === 0
          ? "No reviews yet"
          : `${averageRating} out of 5 (${reviewCount} customer ratings)`}
      </Typography>
      {chart}
      <div style={{ margin: 10 }}>{children}</div>
    </Paper>
  );
};

ReviewSummary.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default ReviewSummary;
