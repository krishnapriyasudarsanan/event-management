import { makeStyles } from "@material-ui/core/styles";

// eslint-disable-next-line import/prefer-default-export
export const newEventStyle = makeStyles(() => ({
  card: {
    padding: "15px 40px",
  },
  tagInputTxt: {
    fontSize: 15,
  },
  gridMargin: {
    marginTop: 2,
  },
  gridPosition: {
    position: "relative",
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    color: "white",
    background: "#3c96ef",
    left: "50%",
    transform: "translateX(-50%)",
    width: "92%",
  },
}));
