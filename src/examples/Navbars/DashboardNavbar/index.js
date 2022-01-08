/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import InputBase from "@material-ui/core/InputBase";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Popover from "@material-ui/core/Popover";
// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { Grid, TextField, Button } from "@material-ui/core";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import moment from "moment";
// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

function DashboardNavbar({ absolute, light, isMini, apply, handleDateRange, state }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [dateRange, setDateRange] = useState(false);
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });
  const dateSelection = () => {
    setDateRange(true);
  };
  const handleClose = () => {
    setDateRange(false);
  };
  return (
    <>
      <Popover
        open={dateRange}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 120, left: 856 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "0.5rem", width: "500px" }}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={4} style={{ fontSize: 15 }}>
                    Start Date
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      id="date"
                      onChange={handleDateRange}
                      type="date"
                      name="startDate"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4} style={{ fontSize: 15 }}>
                    End Date
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      id="date"
                      onChange={handleDateRange}
                      type="date"
                      name="endDate"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Button
            size="small"
            style={{
              fontWeight: 600,
              padding: "3px 11px",
              backgroundColor: "#F8DEE7",
              float: "right",
              color: "#A55B73",
              margin: "8px 0px",
            }}
            onClick={() => {
              apply();
              handleClose();
            }}
          >
            Filter
          </Button>
          <Button
            onClose={handleClose}
            size="small"
            style={{
              fontWeight: 600,
              padding: "2px 11px",
              float: "right",
              color: "#A55B73",
              border: "1px solid",
              margin: "8px 5px",
            }}
          >
            Cancel
          </Button>
        </div>
      </Popover>
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
      >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </MDBox>
          {isMini ? null : (
            <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
              {route[route.length - 1] === "dashboard" ? (
                <MDBox pr={1}>
                  <div>
                    <InputBase
                      value={
                        state.startDate && state.endDate
                          ? `${moment(state.startDate).format("DD-MM-YYYY")}-${moment(
                              state.endDate
                            ).format("DD-MM-YYYY")}`
                          : ""
                      }
                      placeholder="Select Date Range"
                      name="dateRange"
                      style={{ border: "1px solid rgb(177 172 172)", borderRadius: 5 }}
                      onClick={dateSelection}
                    />
                  </div>
                </MDBox>
              ) : (
                ""
              )}

              <MDBox color={light ? "white" : "inherit"}>
                <Link to="/authentication/sign-in/basic">
                  <IconButton sx={navbarIconButton} size="small" disableRipple>
                    <Icon sx={iconsStyle}>account_circle</Icon>
                  </IconButton>
                </Link>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon sx={iconsStyle} fontSize="medium">
                    {miniSidenav ? "menu_open" : "menu"}
                  </Icon>
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleConfiguratorOpen}
                >
                  <Icon sx={iconsStyle}>settings</Icon>
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <Icon sx={iconsStyle}>notifications</Icon>
                </IconButton>
                {renderMenu()}
              </MDBox>
            </MDBox>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  apply: PropTypes.func,
  handleDateRange: PropTypes.func,
  state: PropTypes.object,
};

export default DashboardNavbar;
