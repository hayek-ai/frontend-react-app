import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { theme } from "./util/theme";
import jwtDecode from "jwt-decode";
import axios from "./util/axios";

// Redux stuff
import { connect } from "react-redux";
import store from "./store/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./store/types";
import { logoutUser, getUserData } from "./store/actions/userActions";

// Mui stuff
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";

// Components
import Layout from "./components/Layout/Layout";
import WithLoading from "./components/util/WithLoading";
import CustomRoute from "./components/util/CustomRoute";
import PrivateRoute from "./components/util/PrivateRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Confirmation from "./pages/Confirmation";
import Plan from "./pages/Plan";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import PasswordReset from "./pages/PasswordReset";
import Help from "./pages/Help";
import Feed from "./pages/Feed";
import Report from "./pages/Report";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import Leaderboard from "./pages/Leaderboard";
import Account from "./pages/Account";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe Publishable API Key
const stripePromise = loadStripe("testing");

function App(props) {
  const { prefersDarkmode, isAuthenticated, username, proTierStatus } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      setLoading(false);
    } else {
      const token = localStorage.accessToken;
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          store.dispatch(logoutUser());
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          store.dispatch({ type: SET_AUTHENTICATED });
          store.dispatch(getUserData()).then((res) => {
            setLoading(false);
          });
        }
      } else {
        store.dispatch({ type: SET_UNAUTHENTICATED });
        setLoading(false);
      }
    }
  }, [username]);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <ThemeProvider theme={theme(prefersDarkmode)}>
          <CssBaseline />
          <WithLoading loading={loading}>
            <Layout>
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/terms-of-use" component={TermsOfUse} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/help" component={Help} />
                <Route path="/about" component={AboutUs} />
                <Route path="/confirm" component={Confirmation} />
                <CustomRoute
                  path="/plan"
                  conditionToRenderComponent={proTierStatus !== "succeeded"}
                  component={Plan}
                  redirectPath={"/feed"}
                />
                <Route
                  path="/password-reset/:resetId"
                  component={PasswordReset}
                />
                <PrivateRoute path="/feed" component={Feed} />
                <PrivateRoute path="/leaderboard" component={Leaderboard} />
                <PrivateRoute
                  path="/profile/:username/:panel?"
                  exact
                  component={Profile}
                />
                <PrivateRoute path="/account" component={Account} />
                <PrivateRoute
                  path="/report/:ideaId/:commentParam?"
                  component={Report}
                />
                <PrivateRoute path="/ideas/:symbol" component={SearchResults} />
                <CustomRoute
                  path="/"
                  exact
                  conditionToRenderComponent={!isAuthenticated}
                  component={LandingPage}
                  redirectPath={"/feed"}
                />
              </Switch>
            </Layout>
          </WithLoading>
        </ThemeProvider>
      </Router>
    </Elements>
  );
}

const mapStateToProps = (state) => ({
  prefersDarkmode: state.user.prefersDarkmode,
  isAuthenticated: state.user.isAuthenticated,
  username: state.user.username,
  proTierStatus: state.user.proTierStatus,
});

export default connect(mapStateToProps)(App);
