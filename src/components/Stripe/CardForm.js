import React, { useMemo, useState } from "react";
import axios from "../../util/axios";
import useResponsiveFontSize from "../../util/useResponsiveFontSize";
import classes from "./CardForm.module.css";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../../store/actions/userActions";

// Stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Mui stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Components
import AlertModal from "../util/AlertModal";
import WithLoading from "../util/WithLoading";

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

const CardForm = ({ proTierStatus, getUserData, ...props }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(proTierStatus);
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

    const card = elements.getElement(CardElement);
    if (
      paymentStatus === "requires_payment_method" ||
      paymentStatus === "requires_action"
    ) {
      const isPaymentRetry = true;
      // create new payment method & retry payment on invoice with new payment method
      createPaymentMethod({
        card: card,
        isPaymentRetry,
      });
    } else {
      // create new payment method & create subscription
      createPaymentMethod({ card: card });
    }
  };

  function createPaymentMethod({ card, isPaymentRetry }) {
    setLoading(true);
    stripe
      .createPaymentMethod({
        type: "card",
        card: card,
      })
      .then((result) => {
        setLoading(false);
        if (result.error) {
          throw result;
        } else {
          if (isPaymentRetry) {
            // Update the payment method and retry invoice payment
            retryInvoiceWithNewPaymentMethod({
              paymentMethodId: result.paymentMethod.id,
            });
          } else {
            // create the subscription
            createSubscription(result.paymentMethod.id);
          }
        }
      })
      .catch(handleError);
  }

  function createSubscription(paymentMethodId) {
    setLoading(true);
    return (
      axios
        .post("/create-subscription", { paymentMethodId })
        .then((response) => {
          setLoading(false);
          return response;
        })
        .then((result) => {
          if (result.error) {
            throw result;
          }
          setPaymentStatus(result.data.latest_invoice.payment_intent.status);
          return {
            subscription: result.data,
            paymentMethodId: paymentMethodId,
          };
        })
        // some payment methods require a customer to be on session to complete the payment process.
        .then(handleCustomerActionRequired)
        // If attaching this card to a Customer object succeeds, but attempts
        // to charge the customer fail, you get a requires_payment_method error.
        .then(handlePaymentMethodRequired)
        // No more actions required.  Provision service to user
        .then(onSubscriptionComplete)
        .catch(handleError)
    );
  }

  function retryInvoiceWithNewPaymentMethod({ paymentMethodId }) {
    setLoading(true);
    return axios
      .post("/retry-invoice", { paymentMethodId })
      .then((response) => {
        setLoading(false);
        return response;
      })
      .then((result) => {
        if (result.error) {
          throw result;
        }
        return {
          invoice: result.data,
          paymentMethodId: paymentMethodId,
          isRetry: true,
        };
      })
      .then(handleCustomerActionRequired)
      .then(onSubscriptionComplete)
      .catch(handleError);
  }

  function handleCustomerActionRequired({
    subscription,
    paymentMethodId,
    invoice,
    isRetry,
  }) {
    if (subscription && subscription.status === "active") {
      // subscription is active, no customer actions required.
      return { subscription, paymentMethodId };
    }
    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    let paymentIntent = invoice
      ? invoice.payment_intent
      : subscription.latest_invoice.payment_intent;
    if (
      paymentIntent.status === "requires_action" ||
      (isRetry === true && paymentIntent.status === "requires_payment_method")
    ) {
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
                invoice: invoice,
              };
            }
          }
        });
    } else {
      // No customer action needed
      return { subscription, paymentMethodId };
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
    } else if (paymentStatus === "requires_payment_method") {
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
      getUserData();
      props.history.push("/");
    } else {
      setAlertState({ open: false, message: "", color: null });
    }
  }

  function handleError(error) {
    setLoading(false);
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
  }

  return (
    <React.Fragment>
      <div style={{ width: "100%", textAlign: "left" }}>
        <img
          src="https://hayek-image-assets.s3.amazonaws.com/misc./powered_by_stripe%403x.png"
          alt="powered by Stripe"
          width="125px"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement className={classes.StripeElement} options={options} />
        <WithLoading loading={loading}>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginTop: "15px" }}
          >
            Your card will be charged $5.00
          </Typography>
        </WithLoading>

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

const mapStateToProps = (state) => ({
  proTierStatus: state.user.proTierStatus,
});

export default connect(mapStateToProps, { getUserData })(CardForm);
