import React, { useMemo, useState } from "react";
import axios from "../../util/axios";
import useResponsiveFontSize from "../../util/useResponsiveFontSize";
import classes from "./CardForm.module.css";

// Stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Mui stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
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
    }),
    [fontSize]
  );
};

const CardForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    stripe
      .createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      })
      .then((result) => {
        if (result.error) {
          throw result;
        } else {
          setErrors({});
          console.log(result);
        }
      })
      .catch((error) => setErrors({ payment: error.error.message }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className={classes.StripeElement} options={options} />
      <div style={{ marginTop: "15px" }}>
        {errors.payment ? (
          <Typography variant="body1" color="error">
            {errors.payment}
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Your card will be charged $5.00
          </Typography>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "30px 0", width: "100%" }}
        disabled={!stripe}
        type="submit"
      >
        Subscribe
      </Button>
    </form>
  );
};

export default CardForm;
