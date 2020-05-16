import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import { getProfile } from "../store/actions/profileActions";

// Components
import UserHeader from "../components/Profile/ProfileHeader/UserHeader/UserHeader";
import WithLoading from "../components/util/WithLoading";
import FullPageLayout from "../components/Layout/FullPageLayout";

/*
 * There are four ways this Profile page can be rendered:
 *   1) Non-analyst user accessing their own profile
 *   2) Analyst user accessing their own profile
 *   3) User viewing a non-analyst user's profile
 *   4) User viewing an analyst's profile
 */
const Profile = (props) => {
  const { getProfile, isAnalyst } = props;
  const { username, panel } = useParams();
  const [loading, setLoading] = useState(false);

  // set details of profile user is viewing
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProfile(username).then(() => {
      if (mounted) {
        setLoading(false);
      }
    });
    return () => (mounted = false);
  }, [username, props.history, getProfile]);

  return (
    <FullPageLayout containerType="feedContainer" paperBackground={false}>
      <WithLoading loading={loading}>
        {isAnalyst ? null : <UserHeader />}
      </WithLoading>
    </FullPageLayout>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  isAnalyst: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAnalyst: state.profile.isAnalyst,
});

export default connect(mapStateToProps, { getProfile })(Profile);
