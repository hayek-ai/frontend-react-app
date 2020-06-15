import React from "react";
import { Text } from "slate";

// Mui stuff
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  quote: {
    margin: "14px 0 14px 14px",
    ...theme.typography.body1,
    ...theme.blockQuote,
  },
  text: {
    ...theme.typography.body1,
    margin: "14px 0",
  },
}));

const Serialize = ({ node }) => {
  const classes = useStyles();
  if (Text.isText(node)) {
    let text = node.text;
    if (node.italic) text = <em>{text}</em>;
    if (node.bold) text = <strong>{text}</strong>;
    if (node.underline) text = <u>{text}</u>;
    return text;
  }

  const children = node.children.map((n, index) => (
    <Serialize key={index} node={n} />
  ));

  switch (node.type) {
    case "bulleted-list":
      return (
        <ul className={classes.text}>
          {children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </ul>
      );
    case "numbered-list":
      return (
        <ol className={classes.text}>
          {children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </ol>
      );
    case "list-item":
      return (
        <li>
          {children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </li>
      );
    case "title":
      return (
        <Typography variant="h5" style={{ margin: "24px 0 10px" }}>
          {children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </Typography>
      );
    case "paragraph":
      return (
        <Typography variant="body1" style={{ margin: "14px 0" }}>
          {children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </Typography>
      );
    case "block-quote":
      return (
        <blockquote className={classes.quote}>
          {children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </blockquote>
      );
    case "link":
      return (
        <a href={node.url} target="_blank" rel="noreferrer noopener">
          {children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </a>
      );
    default:
      return children;
  }
};

export default Serialize;
