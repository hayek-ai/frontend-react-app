import React from "react";
import PropTypes from "prop-types";

// Components
import EmptyFeed from "../util/EmptyFeed";
import IdeaCard from "./IdeaCard/IdeaCard";
import IdeaCardHeader from "./IdeaCard/IdeaCardHeader/IdeaCardHeader";
import IdeaCardBody from "./IdeaCard/IdeaCardBody/IdeaCardBody";

class FeedContainer extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      idea: {},
      commentOpen: false,
      downloading: false,
      errors: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleViewReport = (ideaId) => {
    this.props.history.push(`/report/${ideaId}`);
  };

  render() {
    const feedMarkup =
      this.props.ideaFeed.length > 0 ? (
        this.props.ideaFeed.map((idea, index) => (
          <IdeaCard key={index}>
            <IdeaCardHeader idea={idea} />
            <IdeaCardBody idea={idea} />
          </IdeaCard>
        ))
      ) : (
        <EmptyFeed message="No ideas to show." />
      );

    return feedMarkup;
  }
}

FeedContainer.propTypes = {
  ideaFeed: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default FeedContainer;
