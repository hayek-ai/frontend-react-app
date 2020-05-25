import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import classes from "./CardSection.module.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  return (
    <CardElement
      className={classes.StripeElement}
      options={CARD_ELEMENT_OPTIONS}
    />
  );
}

export default CardSection;
