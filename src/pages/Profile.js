import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import { setProfile } from "../store/actions/profileActions";

// Components
import ProfileHeader from "../components/Profile/ProfileHeader/ProfileHeader";
import UserContent from "../components/Profile/ProfileContent/UserContent";
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
  const { setProfile, isAnalyst } = props;
  const { username, panel } = useParams();
  const [loading, setLoading] = useState(false);

  // set details of profile user is viewing
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setProfile(username).then(() => {
      if (mounted) {
        setLoading(false);
      }
    });
    return () => (mounted = false);
  }, [username, props.history, setProfile]);

  return (
    <FullPageLayout containerType="feedContainer" paperBackground={false}>
      <WithLoading loading={loading}>
        <ProfileHeader />
        {isAnalyst ? null : <UserContent panel={panel} {...props} />}
      </WithLoading>
    </FullPageLayout>
  );
};

Profile.propTypes = {
  setProfile: PropTypes.func.isRequired,
  isAnalyst: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAnalyst: state.profile.isAnalyst,
});

export default connect(mapStateToProps, { setProfile })(Profile);
