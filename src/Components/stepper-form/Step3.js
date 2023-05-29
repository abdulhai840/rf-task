import React, { Component } from "react";
import styles from "./stepper-form.module.css";
class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      },
      timeSlots: {
        Monday: { startTime: "", endTime: "" },
        Tuesday: { startTime: "", endTime: "" },
        Wednesday: { startTime: "", endTime: "" },
        Thursday: { startTime: "", endTime: "" },
        Friday: { startTime: "", endTime: "" },
        Saturday: { startTime: "", endTime: "" },
        Sunday: { startTime: "", endTime: "" },
      },
    };
  }

  funcDaychange = (day) => {
    this.setState((prevState) => ({
      days: {
        ...prevState.days,
        [day]: !prevState.days[day],
      },
    }));
    localStorage.setItem("selectedDays", JSON.stringify(this.state.days));
  };

  handleTimeChange = (day, timeType, value) => {
    console.log("value", day, timeType, value);
    const start =
      timeType === "startTime" &&
      new Date(`1970-01-01 ${value}:00`)?.getHours();
    const end =
      timeType === "endTime" && new Date(`1970-01-01 ${value}:00`)?.getHours();

    const diffMilliseconds = end - start;
    console.log("milli", diffMilliseconds);
    // return `${diffHours} hours ${diffMinutes} minutes`;
    // Update the state with the new time
    this.setState((prevState) => ({
      timeSlots: {
        ...prevState.timeSlots,
        [day]: {
          ...prevState.timeSlots[day],
          [timeType]: value,
        },
      },
    }));
    localStorage.setItem("step3Data", JSON.stringify(this.state.timeSlots));

  };

  render() {
    const { days, timeSlots } = this.state;
    const daysArray = Object.entries(days);
    console.log(
      "time",
      Object.values(days).filter((value) => value === true).length
    );

    return (
      <div className="col-10">
        <div className="mt-4">
          <h5>Schedule working days & timings</h5>
          <div className="d-flex justify-content-between mt-4 col-12 pl-0">
            {daysArray.map(([day, value]) => (
              <>
                <div
                  onClick={() => this.funcDaychange(day)}
                  style={{
                    background: value === true ? "#006AB3" : "#EFECEC",
                    color: value === true ? "white" : "black",
                    height: "2rem",
                    width: "2rem",
                    textAlign: "center",
                    borderRadius: "5px",
                    paddingTop: "0.2rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {day.slice(0, 1)}
                </div>
              </>
            ))}
          </div>
        </div>

        <div>
          <div className="row mx-0">
            {daysArray.map(([day, value]) => (
              <>
                <div className="col-sm-6 pl-0 col-12">
                  <div
                    className={styles.timeCon}
                    style={{
                      color: value === true ? "white" : "black",
                      textAlign: "center",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    <p
                      className={
                        value === true ? styles.timeDaySelect : styles.timeDay
                      }
                      onClick={() => this.funcDaychange(day)}
                      style={{ margin: "0", cursor: "pointer" }}
                    >
                      {day}
                    </p>
                    <div className={styles.time + " d-flex"}>
                      <input
                        type="time"
                        disabled={!value}
                        value={timeSlots[day].startTime}
                        onChange={(event) =>
                          this.handleTimeChange(
                            day,
                            "startTime",
                            event.target.value
                          )
                        }
                      />
                      <input
                        type="time"
                        disabled={!value}
                        value={timeSlots[day].endTime}
                        onChange={(event) =>
                          this.handleTimeChange(
                            day,
                            "endTime",
                            event.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Step3;
