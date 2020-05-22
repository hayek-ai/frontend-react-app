import React from "react";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import {
  bookmarkIdea,
  removeBookmark,
} from "../../../../store/actions/userActions";

// Mui Stuff
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Components
import AlertModal from "../../../util/AlertModal";

class IdeaCardMenu extends React.Component {
  _isMounted = false;

  state = {
    anchorEl: null,
    isIdeaBookmarked: false,
    alertState: { open: false, message: "" },
  };

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      isIdeaBookmarked: Boolean(
        this.props.bookmarks.find(
          (bookmark) => bookmark.ideaId === this.props.idea.id
        )
      ),
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleBookmark = () => {
    if (this.state.isIdeaBookmarked) {
      this.props.removeBookmark(this.props.idea.id).then(() => {
        if (this._isMounted) {
          this.handleMenuClose();
          this.setState({
            isIdeaBookmarked: false,
            alertState: { open: true, message: "Bookmark removed!" },
          });
        }
      });
    } else {
      this.props.bookmarkIdea(this.props.idea.id).then(() => {
        if (this._isMounted) {
          this.handleMenuClose();
          this.setState({
            isIdeaBookmarked: true,
            alertState: { open: true, message: "Idea bookmarked!" },
          });
        }
      });
    }
  };

  handleMenuOpen = (event) => {
    if (this._isMounted) {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  handleMenuClose = () => {
    if (this._isMounted) {
      this.setState({ anchorEl: null });
    }
  };

  render() {
    const { idea, username } = this.props;

    return (
      <React.Fragment>
        <IconButton onClick={this.handleMenuOpen}>
          {this.props.isIdeaClosed ? this.props.closedIcon : <MoreVertIcon />}
        </IconButton>
        {username === idea.analyst.username ? (
          <Menu
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.props.confirmIdeaClose}>
              Close Idea
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.handleBookmark}>
              {this.state.isIdeaBookmarked
                ? "Remove bookmark"
                : "Bookmark idea"}
            </MenuItem>
          </Menu>
        )}
        <AlertModal
          open={this.state.alertState.open}
          onClose={() =>
            this.setState({ alertState: { open: false, message: "" } })
          }
          message={this.state.alertState.message}
        />
      </React.Fragment>
    );
  }
}

IdeaCardMenu.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  idea: PropTypes.object.isRequired,
  bookmarkIdea: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
  confirmIdeaClose: PropTypes.func.isRequired,
  isIdeaClosed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  bookmarks: state.user.bookmarks,
  username: state.user.username,
});

const mapActionsToProps = {
  bookmarkIdea,
  removeBookmark,
};

export default connect(mapStateToProps, mapActionsToProps)(IdeaCardMenu);
