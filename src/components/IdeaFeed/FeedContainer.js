import React from "react";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import {
  upvoteIdea,
  removeUpvote,
  downvoteIdea,
  removeDownvote,
} from "../../store/actions/userActions";

// Components
import EmptyFeed from "../util/EmptyFeed";
import IdeaCard from "./IdeaCard/IdeaCard";
import IdeaCardHeader from "./IdeaCard/IdeaCardHeader/IdeaCardHeader";
import IdeaCardBody from "./IdeaCard/IdeaCardBody/IdeaCardBody";
import IdeaCardActions from "./IdeaCard/IdeaCardActions/IdeaCardActions";

class FeedContainer extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleVote = async (type, ideaId) => {
    let updatedIdea;
    switch (type) {
      case "upvote":
        updatedIdea = await this.props.upvoteIdea(ideaId);
        break;
      case "removeUpvote":
        updatedIdea = await this.props.removeUpvote(ideaId);
        break;
      case "downvote":
        updatedIdea = await this.props.downvoteIdea(ideaId);
        break;
      case "removeDownvote":
        updatedIdea = await this.props.removeDownvote(ideaId);
        break;
      default:
        console.log("Error: Incorrect Vote Type.");
    }
    // update feed state
    if (this._isMounted) {
      this.setState((prevState) => {
        let index = this.props.ideaFeed.findIndex(
          (idea) => idea.id === updatedIdea.id
        );
        this.props.ideaFeed[index] = updatedIdea;
        return {
          ...prevState,
        };
      });
    }
  };

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
            <IdeaCardActions idea={idea} handleVote={this.handleVote} />
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
  upvoteIdea: PropTypes.func.isRequired,
  removeUpvote: PropTypes.func.isRequired,
  downvoteIdea: PropTypes.func.isRequired,
  removeDownvote: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  upvoteIdea,
  removeUpvote,
  downvoteIdea,
  removeDownvote,
};

export default connect(null, mapActionsToProps)(FeedContainer);
