import { makeStyles } from "@material-ui/core/styles";

// eslint-disable-next-line import/prefer-default-export
export const eventTableStyle = makeStyles((theme) => ({
  avatarCell: {
    display: "flex",
    alignItems: "center",
    minWidth: "7rem",
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: 10,
  },
  pagination: {
    padding: 13,
    float: "right",
    "& .MuiPaginationItem-textPrimary.Mui-selected": {
      background: "#26344D",
    },
  },
}));
