import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from "./stepper-form.module.css";
import { Button, Grid, Typography } from "@material-ui/core";
import { ReactComponent as UploadIcon } from "../../assets/upload.svg";

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step1Data: {
        lookingFor: "",
        experience: "",
        education: "",
        skills: "",
        description: "",
        imageFile: null,
      },
    };
  }
  validateStep1 = () => {
    const {
      lookingFor,
      experience,
      education,
      skills,
      description,
      imageFile,
    } = this.state.step1Data;
    if (
      !lookingFor ||
      !experience ||
      !education ||
      !skills ||
      !description ||
      !imageFile
    ) {
      // alert('Please fill in all required fields.');
      return false;
    }
    return true;
  };
  componentDidMount() {
    const savedData = JSON.parse(localStorage.getItem("step1Data"));
    if (savedData) {
      const { lookingFor, experience, education, skills, description } =
        savedData;
      this.setState((prevState) => ({
        step1Data: {
          ...prevState.step1Data,
          lookingFor,
          experience,
          education,
          skills,
          description,
        },
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { step1Data } = this.state;
    if (prevState.step1Data !== step1Data) {
      localStorage.setItem("step1Data", JSON.stringify(step1Data));
    }
  }

  handleChange = (event, value) => {
    const eventArray = event.target.id.split("-");
    const [id] = eventArray;
    if (id) {
      this.setState((prevState) => ({
        step1Data: {
          ...prevState.step1Data,
          [id]: value || event.target.value,
        },
      }));
    }
  };
  handleImageFileChange = (event) => {
    this.setState({ imageFile: event.target.files[0] });
  };
  render() {
    const { step1Data } = this.state;

    return (
      <Grid container className="mt-4" spacing={2}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            onChange={(event, value) => this.handleChange(event, value)}
            id="lookingFor"
            fullWidth
            options={jobs}
            value={step1Data.lookingFor}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                id="outlined-required"
                label="Looking For"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            value={step1Data.experience}
            onChange={(event, value) => this.handleChange(event, value)}
            id="experience"
            options={experience}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                id="outlined-required"
                label="Experience"
                variant="outlined"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            value={step1Data.education}
            onChange={(event, value) => this.handleChange(event, value)}
            id="education"
            options={education}
            fullWidth
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                id="outlined-required"
                label="Education"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={step1Data.skills}
            onChange={(event, value) => this.handleChange(event, value)}
            id="skills"
            options={skill}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                id="outlined-required"
                label="Skills"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event, value) => this.handleChange(event, value)}
            className={styles.descripition}
            required
            multiline
            rows={5}
            InputLabelProps={{
              shrink: true,
            }}
            id="description-outlined"
            label="Descripition"
            value={step1Data.description}
            variant="outlined"
          />
        </Grid>

        <div>
          <p className={styles.fileUploadLabel}>
            And if there is any inspiration
          </p>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={this.handleImageFileChange}
              style={{ display: "none" }}
              id="image-upload-input"
              required
            />
            <label
              htmlFor="image-upload-input"
              style={{ background: "#47CB5D", borderRadius: "5px", marginTop:"0.5rem" }}
            >
              <Button
                variant="contained"
                component="span"
                style={{
                  background: "#47CB5D",
                  color: "white",
                  borderRadius: "5px",
                  padding:"0.5rem 0.8rem"
                }}
              >
               <UploadIcon className="mr-2" /> Upload Image*
              </Button>
            </label>
            {this.state.imageFile && (
              <Typography>{this.state.imageFile.name}</Typography>
            )}
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default Step1;

const jobs = ["React Js", "Node js", "OS"];
const skill = ["React", "Node", "SRE"];
const experience = ["1", "2", "3", "4", "5"];
const education = ["BS", "MS", "PhD"];
