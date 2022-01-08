import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import moment from "moment";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Pagination from "@material-ui/lab/Pagination";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Tooltip,
} from "@material-ui/core";
// import { collection, getDocs } from "firebase/firestore/lite";
import { withStyles } from "@material-ui/core/styles";
// import db from "../../config/fire";
// import { firebase } from "config/fire";
import database from "../../firebase";
import DefaultPic from "../../assets/images/home-decor-1.jpg";
import { eventTableStyle } from "./style";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Tables() {
  const classes = eventTableStyle();
  const [eventList, setEventList] = useState([]);
  const [page, setPage] = useState(1);
  // Method to fetch events from the db
  const fetchEvents = async () => {
    const eventRef = database.ref("events");
    eventRef.on("value", (snapshot) => {
      const newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        if (dataVal.published && dataVal.endDate >= moment().format("YYYY-MM-DD")) {
          newUsersState.push({
            id: data.key,
            title: dataVal.title,
            description: dataVal.description,
            location: dataVal.location,
            startDate: dataVal.startDate,
            endDate: dataVal.endDate,
            categories: dataVal.categories,
            published: dataVal.published,
            paid: dataVal.paid,
          });
        }
      });
      setEventList(newUsersState);
    });
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  // Get events
  const indexOfLastEvent = page * 5;
  const indexOfFirstEvent = indexOfLastEvent - 5;
  const currentPosts = eventList.slice(indexOfFirstEvent, indexOfLastEvent);
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
  });
  // Methode for date filter
  const apply = () => {
    const filteredData = [];
    eventList.forEach((data) => {
      if (data.startDate >= state.startDate && data.endDate <= state.endDate) {
        filteredData.push(data);
      }
    });
    setState({
      startDate: "",
      endDate: "",
    });
    setEventList(filteredData);
  };
  const handleDateRange = (evt) => {
    const { value } = evt.target;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar apply={apply} handleDateRange={handleDateRange} state={state} />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Events Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Categories</TableCell>
                        <TableCell>Published</TableCell>
                        <TableCell>Paid</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentPosts.length > 0
                        ? currentPosts.map((row) => (
                            <StyledTableRow key={row.id}>
                              <TableCell>
                                <div className={classes.avatarCell}>
                                  <Avatar
                                    src={row.image ? row.image : DefaultPic}
                                    alt="profile"
                                    className={classes.small}
                                  />
                                  <div>{row.title}</div>
                                </div>
                              </TableCell>
                              <Tooltip
                                title={row?.description?.length === 0 ? "None" : row.description}
                              >
                                <TableCell>
                                  {row?.description?.length > 50
                                    ? `${row.description.slice(0, 50)}  ...`
                                    : row.description}
                                </TableCell>
                              </Tooltip>
                              <TableCell>{row.location}</TableCell>
                              <TableCell>{moment(row.startDate).format("DD-MM-YYYY")}</TableCell>
                              <TableCell>{moment(row.endDate).format("DD-MM-YYYY")}</TableCell>
                              <TableCell>{row.categories.toString().replace(/,/g, ", ")}</TableCell>
                              <TableCell>{row.published ? "Yes" : "No"}</TableCell>
                              <TableCell>{row.paid ? "Yes" : "No"}</TableCell>
                            </StyledTableRow>
                          ))
                        : ""}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  className={classes.pagination}
                  color="primary"
                  count={eventList ? Math.ceil(eventList.length / 5) : 0}
                  shape="rounded"
                  page={page}
                  onChange={handlePageChange}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
