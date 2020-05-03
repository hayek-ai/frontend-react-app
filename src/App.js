import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { theme } from "./util/theme";

// Mui stuff
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";

// Components
import Layout from "./components/Layout/Layout";

// Pages
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme(false)}>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/terms-of-use" component={TermsOfUse} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/about" component={AboutUs} />
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
