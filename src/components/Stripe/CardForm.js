import React, { useMemo, useState } from "react";
import axios from "../../util/axios";
import useResponsiveFontSize from "../../util/useResponsiveFontSize";
import classes from "./CardForm.module.css";

// Stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Mui stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Components
import AlertModal from "../util/AlertModal";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
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
  return options;
};

const CardForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    color: null,
  });

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
          createSubscription(result.paymentMethod.id);
        }
      })
      .catch((error) =>
        setAlertState({
          open: true,
          message: error.error.message,
          color: "error",
        })
      );
  };

  function createSubscription(paymentMethodId) {
    return (
      axios
        .post("/create-subscription", { paymentMethodId })
        .then((response) => {
          return response;
        })
        // if card is declined, display an error to the user
        .then((result) => {
          if (result.error) {
            throw result;
          }
          return result.data;
        })
        // normalize the result to contain the object returned by Stripe
        .then((result) => {
          return {
            subscription: result,
            paymentMethodId: paymentMethodId,
          };
        })
        // some payment methods require a customer to be on session
        // to complete the payment process.  Check the status of the
        // payment intent to handle these actions.
        .then(handleCustomerActionRequired)
        // If attaching this card to a Customer object succeeds,
        // but attempts to charge the customer fail, you
        // get a requires_payment_method error.
        .then(handlePaymentMethodRequired)
        // No more actions required.  Provision service to user
        .then(onSubscriptionComplete)
        .catch((error) => {
          let message = "Oops, something went wrong";
          if (error.error) {
            message = error.error.message;
          } else if (error.response) {
            message = error.response.data.errors[0].detail;
          }
          setAlertState({
            open: true,
            message: message,
            color: "error",
          });
        })
    );
  }

  function handleCustomerActionRequired({ subscription, paymentMethodId }) {
    if (subscription && subscription.status === "active") {
      // subscription is active, no customer actions required.
      return { subscription, paymentMethodId };
    }
    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    let paymentIntent = subscription.latest_invoice.payment_intent;
    if (paymentIntent.status === "requires_action") {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            // start code flow to handle updating the payment details
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            throw result;
          } else {
            if (result.paymentIntent.status === "succeeded") {
              // There's a risk of the customer closing the window before callback
              // execution. To handle this case, set up a webhook endpoint and
              // listen to invoice.payment_succeeded. This webhook endpoint
              // returns an Invoice.
              return {
                subscription: subscription,
                paymentMethodId: paymentMethodId,
              };
            }
          }
        });
    }
  }

  function handlePaymentMethodRequired({
    subscription,
    paymentMethodId,
    priceId,
  }) {
    if (subscription.status === "active") {
      // subscription is active, no customer actions required.
      return { subscription, priceId, paymentMethodId };
    } else if (
      subscription.latest_invoice.payment_intent.status ===
      "requires_payment_method"
    ) {
      const error = { error: { message: "Your card was declined." } };
      throw error;
    } else {
      return { subscription, priceId, paymentMethodId };
    }
  }

  function onSubscriptionComplete(result) {
    setAlertState({
      open: true,
      message: "You have successfully subscribed to Hayek Pro!",
      color: "success",
    });
  }

  function handleAlertClose() {
    if (alertState.color === "success") {
      props.history.push("/");
    } else {
      setAlertState({ open: false, message: "", color: null });
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <CardElement className={classes.StripeElement} options={options} />
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginTop: "15px" }}
        >
          Your card will be charged $5.00
        </Typography>
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
      <AlertModal
        open={alertState.open}
        onClose={handleAlertClose}
        message={alertState.message}
        color={alertState.color}
      />
    </React.Fragment>
  );
};

export default CardForm;
