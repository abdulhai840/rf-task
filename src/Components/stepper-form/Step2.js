import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from "./stepper-form.module.css";
import { Grid } from "@material-ui/core";

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hourlyRate: "",
      startDate: "",
      careerLevel: "",
      gender: "",
      equiqSpecification: "",
    };
  }

  handleChange = (event, value) => {
    const eventArray = event.target.id.split("-");
    const [id] = eventArray;
    if (id)
      this.setState((prevState) => ({
        ...prevState,
        [id]: value || event.target.value,
      }));
  };

  componentDidMount() {
    const savedData = JSON.parse(localStorage.getItem("step2Data"));
    if (savedData) {
      const {
        hourlyRate: hr,
        startDate: sd,
        careerLevel: cl,
        gender: g,
        equiqSpecification: eq,
      } = savedData;
      this.setState({
        hourlyRate: hr,
        startDate: sd,
        careerLevel: cl,
        gender: g,
        equiqSpecification: eq,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hourlyRate !== this.state.hourlyRate) {
      localStorage.setItem("step2Data", JSON.stringify(this.state));
    }
  }

  render() {
    const { hourlyRate, startDate, careerLevel, gender, equiqSpecification } =
      this.state;

    return (
      <Grid container className="mt-4" spacing={2}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            onChange={(event, value) => this.handleChange(event, value)}
            value={hourlyRate}
            id="hourlyRate"
            options={hr}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                id="hourlyRate"
                label="Hourly rate"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(event, value) => this.handleChange(event, value)}
            id="startDate"
            type="date"
            value={startDate}
            className={styles.startDate}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            onChange={(event, value) => this.handleChange(event, value)}
            value={careerLevel}
            id="careerLevel"
            options={cl}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                id="careerLevel"
                label="Careel level"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            onChange={(event, value) => this.handleChange(event, value)}
            value={gender}
            id="gender"
            options={gen}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                id="gender"
                label="Gender"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event, value) => this.handleChange(event, value)}
            value={equiqSpecification}
            className={styles.descripition}
            required
            multiline
            rows={5}
            InputLabelProps={{
              shrink: true,
            }}
            id="equiqSpecification-outlined"
            label="Equipment specification"
            variant="outlined"
          />
        </Grid>
      </Grid>
    );
  }
}

const hr = ["10$", "15$", "20$", "25$"];
const cl = ["junior", "medium", "senior"];
const gen = ["Male", "Female"];

export default Step2;
