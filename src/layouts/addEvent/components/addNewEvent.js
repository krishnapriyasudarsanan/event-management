/* eslint-disable import/extensions */
import React, { useState } from "react";
import {
  Grid,
  Card,
  InputLabel,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import MDBox from "components/MDBox";
import TagsInput from "react-tagsinput-special";
import "react-tagsinput-special/react-tagsinput.css";
import MDButton from "components/MDButton";
import database from "../../../firebase";

import { newEventStyle } from "./style";

const AddNewEvent = () => {
  const classes = newEventStyle();
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    image: "",
    published: false,
    paid: false,
  });
  const handleChange = async (evt) => {
    if (evt.target.name === "published" || evt.target.name === "paid") {
      setState({ ...state, [evt.target.name]: evt.target.checked });
    } else {
      const { value } = evt.target;
      setState({
        ...state,
        [evt.target.name]: value,
      });
    }
  };
  const keywordsChange = (e) => {
    setCategories(e);
  };
  const addNewEvent = async () => {
    const data = state;
    data.categories = categories;
    database.ref("events").push(data).catch(alert);
    setState({
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      image: "",
      published: false,
      paid: false,
    });
    setCategories([]);
  };
  const fileSelectorHandler = () => {
    // console.log(event);
  };

  return (
    <MDBox pt={6} pb={3}>
      <Card className={classes.card}>
        <Grid container spacing={6} className={classes.gridMargin}>
          <Grid item xs={6}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <TextField
              required
              variant="outlined"
              name="title"
              value={state.title}
              size="small"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="title">Location</InputLabel>
            <TextField
              required
              variant="outlined"
              name="location"
              value={state.location}
              size="small"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="title">StartDate</InputLabel>
            <TextField
              id="date"
              type="date"
              name="startDate"
              variant="outlined"
              size="small"
              fullWidth
              value={state.startDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="title">End Date</InputLabel>
            <TextField
              id="date"
              type="date"
              name="endDate"
              variant="outlined"
              size="small"
              fullWidth
              value={state.endDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="title">Select Image</InputLabel>
            <Button variant="outlined" fullWidth component="label">
              <input onChange={fileSelectorHandler} type="file" />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TagsInput
              onlyUnique
              value={categories}
              name="categories"
              inputProps={{
                placeholder: "Add Categories",
                style: { width: "100px" },
              }}
              onChange={(e) => keywordsChange(e)}
            />
            <em className={classes.tagInputTxt}>
              Click on &apos;Enter&apos; button after adding each keyword and then save.
            </em>
          </Grid>
          <Grid item xs={6} style={{ position: "relative" }}>
            <InputLabel htmlFor="title">Description</InputLabel>
            <TextField
              fullWidth
              name="description"
              required
              multiline
              rows={6}
              value={state.description}
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridPosition}>
            <FormControlLabel
              control={
                <Checkbox
                  value={state.published}
                  checked={state.published}
                  name="published"
                  onChange={handleChange}
                />
              }
              label="Published"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  value={state.paid}
                  checked={state.paid}
                  name="paid"
                  onChange={handleChange}
                />
              }
              label="Paid"
            />
            <br />
            <MDButton className={classes.addButton} onClick={addNewEvent}>
              ADD NEW EVENT
            </MDButton>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
};
export default AddNewEvent;
