import React from "react";

// Mui Stuff
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class IdeaCardMenu extends React.Component {
  _isMounted = false;
  render() {
    return (
      <IconButton aria-label="more">
        <MoreVertIcon />
      </IconButton>
    );
  }
}

export default IdeaCardMenu;
