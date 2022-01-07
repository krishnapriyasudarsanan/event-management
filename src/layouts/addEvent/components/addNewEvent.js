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
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../../../config/fire";

const AddNewEvent = () => {
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
    console.log(data, "da");
    const citiesCol = collection(db, "events");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    console.log(cityList);
  };
  return (
    <MDBox pt={6} pb={3}>
      <Card style={{ padding: 40 }}>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <div>
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
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
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
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
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
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
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
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Button variant="outlined" component="label">
                Select Image
                <input hidden accept="image/*" type="file" />
              </Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <TagsInput
                onlyUnique
                value={categories}
                name="keywords"
                inputProps={{
                  placeholder: "Add Keyword",
                  style: { width: "100px" },
                }}
                onChange={(e) => keywordsChange(e)}
              />
              <em style={{ fontSize: 15 }}>
                Click on &apos;Enter&apos; button after adding each keyword and then save.
              </em>
            </div>
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  value={state.published}
                  checked={state.published}
                  name="published"
                  onChange={handleChange}
                  style={{ color: "#CED4DA" }}
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
                  name="published"
                  onChange={handleChange}
                  style={{ color: "#CED4DA" }}
                />
              }
              label="Paid"
            />
          </Grid>
          <Grid item xs={6}>
            <div>
              <InputLabel htmlFor="title">Description</InputLabel>
              <TextField
                fullWidth
                name="description"
                required
                multiline
                rows={6}
                variant="outlined"
              />
            </div>
          </Grid>
          <Grid item xs={6} style={{ position: "relative" }}>
            <div>
              <MDButton
                variant="outlined"
                style={{
                  position: "absolute",
                  bottom: 25,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                fullWidth
                onClick={addNewEvent}
              >
                ADD NEW EVENT
              </MDButton>
            </div>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
};
export default AddNewEvent;
