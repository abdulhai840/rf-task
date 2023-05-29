import React, { Component } from "react";
import styles from "./stepper-form.module.css";
import cn from "classnames";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Grid } from "@material-ui/core";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      totalSteps: 3,
    };
  }
  step1Class = () => {
    const { step } = this.state;
    if (step === 1)
      return cn(
        styles.stepperDesignActive,
        "d-flex align-items-center justify-content-center"
      );
    return cn(
      styles.stepperDesignCompleted,
      "d-flex align-items-center justify-content-center"
    );
  };

  step2Class = () => {
    const { step } = this.state;
    if (step === 2)
      return cn(
        styles.stepperDesignActive,
        "d-flex align-items-center justify-content-center"
      );
    if (step > 2)
      return cn(
        styles.stepperDesignCompleted,
        "d-flex align-items-center justify-content-center"
      );
    return cn(
      styles.stepperDesignInActive,
      "d-flex align-items-center justify-content-center"
    );
  };

  step3Class = () => {
    const { step } = this.state;
    if (step === 3)
      return cn(
        styles.stepperDesignCompleted,
        "d-flex align-items-center justify-content-center"
      );
    if (step < 3)
      return cn(
        styles.stepperDesignInActive,
        "d-flex align-items-center justify-content-center"
      );
  };

  renderStep = () => {
    const { step } = this.state;
    if (step === 1) return <Step1 />;
    if (step === 2) return <Step2 />;
    if (step === 3) return <Step3 />;
  };

  handleNext = () => {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
    if (this.state.step === 3) {
      alert("Form Submitted Sucessfully");
      window.location="/"
    }
  };

  handlePrevious = () => {
    const { step } = this.state;
    if (step === 1) return;
    this.setState((prevState) => ({
      step: prevState.step - 1,
    }));
  };

  render() {
    const { step, totalSteps } = this.state;
    return (
      <div className="col-10 mx-auto">
        <Grid className="py-4">
          <div>
            <Grid item xs={12}>
              <h1>CREATE A JOB POST</h1>
            </Grid>
            <Grid>
              <p className={styles.formInstruction}>
                Complete the following steps to create an effective job post
              </p>
            </Grid>
          </div>
        </Grid>
        <hr></hr>
        <Grid>
          <div className={styles.stepsNumber}>
            Step {step} of {totalSteps}
          </div>

          {/* stepper indicator and information */}
          <div className={cn(styles.stepperRow, "") + " row"}>
            <div className={this.step1Class() + " col-4"}>
              <p className={styles.noPM}>Job Information</p>
            </div>
            <div className={this.step2Class() + " col-4"}>
              <p className={styles.noPM}>Candidate Type</p>
            </div>
            <div className={this.step3Class() + " col-4"}>
              <p className={styles.noPM}>Shift Timings</p>
            </div>
          </div>
        </Grid>

        {this.renderStep()}

        <Grid className="px-0 my-5 pt-5">
          <div className="d-flex justify-content-between">
            {" "}
            <button onClick={this.handlePrevious} className={styles.previous}>
              Previous
            </button>{" "}
            <button onClick={this.handleNext} className={styles.next}>
              Next
            </button>{" "}
          </div>
        </Grid>
      </div>
    );
  }
}

export default Index;
