import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    paddingTop: 0,
  },
  iconBox: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 0,
  },
  iconText: {
    fontSize: "16px",
    color: theme.palette.text.secondary,
    marginLeft: "10px",
  },
  iconGroup: {
    padding: "8px 5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  smallButton: {
    padding: "5px",
  },
  regButton: {
    padding: "7px",
  },
  paper: {
    position: "absolute",
    width: "300px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
  },
}));

export default useStyles;
