import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckIcon from "@material-ui/icons/Check";
import Rating from "@material-ui/lab/Rating";

// Components
import ConfirmActionDialog from "../util/ConfirmActionDialog";

const useStyles = makeStyles((theme) => ({
  showMore: {
    fontWeight: 600,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));


const ReviewCard = ({ review, userId, handleDeleteReview }) => {
    const classes = useStyles();
    let showAction = false,
    if (review.customer.id === userId) {showAction = true}
    
}