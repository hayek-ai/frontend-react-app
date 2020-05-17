import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "20px",
    textAlign: "left",
    borderRadius: 0,
  },
  heading: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  title: {
    ...theme.typography.h5,
    wordBreak: "break-all",
    padding: "10px 0",
  },
  profileEditButton: {
    fontSize: "12px",
    width: "40px",
    height: "30px",
    margin: 0,
    padding: "5px",
  },
  profileImageWrapper: {
    textAlign: "center",
    position: "relative",
  },
  profileImage: {
    width: "75px",
    height: "75px",
    objectFit: "cover",
    borderRadius: "50%",
  },
  uploadImageWrapper: {
    position: "relative",
    margin: "20px 0 50px",
    textAlign: "center",
  },
  uploadImage: {
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
  bioTextField: {
    padding: "20px",
  },
  dialogButton: {
    width: "100px",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
}));

export default useStyles;
