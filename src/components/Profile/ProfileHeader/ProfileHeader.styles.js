import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  profileImage: {
    width: 125,
    height: 125,
    objectFit: "cover",
    borderRadius: "50%",
  },
  imageEditButton: {
    position: "absolute",
    top: "80%",
    left: "70%",
    color: theme.palette.text.secondary,
  },
}));
